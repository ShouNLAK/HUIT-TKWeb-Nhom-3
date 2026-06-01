// =============================================================
// VIET TRAVEL HUB - js/train.js (Logic trang Tàu Hỏa)
// Sơ đồ toa ghế mềm + toa giường cabin
// =============================================================

// Biến trạng thái
var ngayDiTau = '';
var tauDangChon = null;
var choTauDangChon = null;
var kieuToa = 'ghe'; // 'ghe' hoặc 'giuong'

document.addEventListener("DOMContentLoaded", function() {
    var homNay = new Date().toISOString().split('T')[0];
    var inputNgay = document.getElementById('train-date-out');
    var inputNgayVe = document.getElementById('train-date-return');
    
    if (inputNgay) {
        inputNgay.min = homNay;
        inputNgay.value = homNay;
        ngayDiTau = homNay;
    }
    if (inputNgayVe) {
        inputNgayVe.min = homNay;
    }

    // Prefill từ trang chủ
    var paramsStr = sessionStorage.getItem('vth_search_params');
    var daTimKiem = false;
    if (paramsStr) {
        var params = JSON.parse(paramsStr);
        if (params.loai === 'train') {
            if (document.getElementById('train-from')) document.getElementById('train-from').value = params.tuSearch || '';
            if (document.getElementById('train-to')) document.getElementById('train-to').value = params.denSearch || '';
            if (document.getElementById('train-date-out') && params.ngaySearch) {
                document.getElementById('train-date-out').value = params.ngaySearch;
                ngayDiTau = params.ngaySearch;
            }
            if (document.getElementById('train-roundtrip') && params.khuHoi) {
                document.getElementById('train-roundtrip').checked = true;
                if (document.getElementById('train-date-return')) {
                    document.getElementById('train-date-return').disabled = false;
                    document.getElementById('train-date-return').value = params.ngayVeSearch || '';
                }
            }
            if (document.getElementById('train-adults') && params.slNguoiLon) document.getElementById('train-adults').value = params.slNguoiLon;
            if (document.getElementById('train-children') && params.slTreEm) document.getElementById('train-children').value = params.slTreEm;
            
            // Tự động tìm kiếm
            timTau();
            daTimKiem = true;
        }
        sessionStorage.removeItem('vth_search_params');
    }

    if (!daTimKiem) {
        hienThiDanhSachTau(mockTrains);
    }
});

// ---------------------------------------------------------------
// HÀM: Toggle trường Ngày Về
// ---------------------------------------------------------------
function toggleReturnDateTrain() {
    var rdOneway = document.getElementById('train-oneway');
    var inputNgayVe = document.getElementById('train-date-return');
    if (!rdOneway || !inputNgayVe) return;
    
    if (rdOneway.checked) {
        inputNgayVe.disabled = true;
        inputNgayVe.value = '';
    } else {
        inputNgayVe.disabled = false;
        var inputNgayDi = document.getElementById('train-date-out');
        if (inputNgayDi && inputNgayDi.value) {
            inputNgayVe.min = inputNgayDi.value;
            inputNgayVe.value = inputNgayDi.value;
        }
    }
}

// ---------------------------------------------------------------
// HÀM: Tìm chuyến tàu
// ---------------------------------------------------------------
function timTau(event) {
    if (event) event.preventDefault();

    var tu = document.getElementById('train-from').value;
    var den = document.getElementById('train-to').value;
    var inputNgay = document.getElementById('train-date-out');
    var inputNgayVe = document.getElementById('train-date-return');
    var rdRoundtrip = document.getElementById('train-roundtrip');
    ngayDiTau = inputNgay ? inputNgay.value : '';

    if (!ngayDiTau) {
        hienCanhBaoTau('Vui lòng chọn Ngày Đi!');
        return;
    }
    if (rdRoundtrip && rdRoundtrip.checked && inputNgayVe && !inputNgayVe.value) {
        hienCanhBaoTau('Vui lòng chọn Ngày Về!');
        return;
    }
    if (rdRoundtrip && rdRoundtrip.checked && inputNgayVe && inputNgayVe.value < ngayDiTau) {
        hienCanhBaoTau('Ngày về không được nhỏ hơn ngày đi!');
        return;
    }
    if (tu !== '' && den !== '' && tu === den) {
        hienCanhBaoTau('Ga Đi và Ga Đến không được trùng nhau!');
        return;
    }

    // Lưu vào LocalStorage
    var lichSuTK = JSON.parse(localStorage.getItem('lichSuTimKiemTau') || '[]');
    lichSuTK.unshift({
        tu: tu,
        den: den,
        ngayDi: ngayDiTau,
        ngayVe: inputNgayVe ? inputNgayVe.value : '',
        khuHoi: rdRoundtrip ? rdRoundtrip.checked : false,
        thoiGian: new Date().toLocaleString('vi-VN')
    });
    if(lichSuTK.length > 5) lichSuTK.pop();
    localStorage.setItem('lichSuTimKiemTau', JSON.stringify(lichSuTK));

    var slNguoiLon = parseInt(document.getElementById('train-adults').value) || 1;
    var slTreEm = parseInt(document.getElementById('train-children').value) || 0;
    sessionStorage.setItem('trainAdults', slNguoiLon);
    sessionStorage.setItem('trainChildren', slTreEm);
    sessionStorage.setItem('trainIsRoundTrip', rdRoundtrip ? rdRoundtrip.checked : false);

    var ketQua = mockTrains;

    function getCityCode(cityName) {
        if (!cityName) return '';
        var lowerName = cityName.toLowerCase().trim();
        if (lowerName.includes('sgn') || lowerName.includes('sài gòn') || lowerName.includes('hồ chí minh')) return 'SGN';
        if (lowerName.includes('han') || lowerName.includes('hà nội')) return 'HAN';
        if (lowerName.includes('dad') || lowerName.includes('đà nẵng')) return 'DAD';
        if (lowerName.includes('nha') || lowerName.includes('nha trang') || lowerName.includes('cxr')) return 'NHA';

        for (var code in destinations) {
            if (destinations[code].name.toLowerCase().includes(lowerName)) {
                if (code === 'CXR') return 'NHA'; // Map CXR flight code to NHA train code
                return code;
            }
        }
        return cityName;
    }

    var tuCode = getCityCode(tu);
    var denCode = getCityCode(den);

    if (tuCode !== '') {
        var loc1 = [];
        for (var i = 0; i < ketQua.length; i++) {
            if (ketQua[i].from === tuCode || ketQua[i].from.toLowerCase() === tuCode.toLowerCase()) loc1.push(ketQua[i]);
        }
        ketQua = loc1;
    }
    if (denCode !== '') {
        var loc2 = [];
        for (var j = 0; j < ketQua.length; j++) {
            if (ketQua[j].to === denCode || ketQua[j].to.toLowerCase() === denCode.toLowerCase()) loc2.push(ketQua[j]);
        }
        ketQua = loc2;
    }

    hienThiDanhSachTau(ketQua);
}

function hienCanhBaoTau(msg) {
    document.getElementById('train-results').innerHTML =
        '<div class="alert alert-warning fw-600"><i class="bi bi-exclamation-triangle-fill me-2"></i>' + msg + '</div>';
}

// ---------------------------------------------------------------
// HÀM: Render danh sách tàu
// ---------------------------------------------------------------
function hienThiDanhSachTau(danhSach) {
    var container = document.getElementById('train-results');
    if (!container) return;

    if (danhSach.length === 0) {
        container.innerHTML = '<div class="text-center py-5"><i class="bi bi-train-front text-white-50" style="font-size:3rem;opacity:0.3;"></i><p class="text-white-50 mt-3">Không có chuyến tàu phù hợp.</p></div>';
        return;
    }

    var html = '';
    
    // BẢNG GIÁ THEO NGÀY (So sánh giá các ngày lân cận)
    html += '<div class="glass-panel p-3 mb-4" style="animation:fadeInUp 0.4s ease both;">';
    html +=   '<h6 class="text-white fw-700 mb-3"><i class="bi bi-calendar-check text-success"></i> So sánh giá các ngày lân cận</h6>';
    html +=   '<div class="d-flex text-center overflow-auto gap-2" style="white-space:nowrap; padding-bottom:8px;">';
    
    var d = new Date(ngayDiTau || new Date());
    for(var x = -2; x <= 3; x++) {
        var tempD = new Date(d);
        tempD.setDate(d.getDate() + x);
        var isThu7CN = (tempD.getDay() === 0 || tempD.getDay() === 6);
        var thuStr = tempD.getDay() === 0 ? 'CN' : 'T' + (tempD.getDay()+1);
        var giaMock = isThu7CN ? 690000 : 549000;
        var activeStyle = (x === 0) ? 'background:rgba(46,204,113,0.25); border:1px solid #2ecc71;' : 'background:rgba(255,255,255,0.05); border:1px solid transparent;';
        
        html += '<div class="p-2 rounded-3" style="min-width:110px; cursor:pointer; transition:0.3s;' + activeStyle + '" onmouseover="this.style.filter=\'brightness(1.2)\'" onmouseout="this.style.filter=\'none\'">';
        html +=   '<div class="text-white-50 small">' + thuStr + ', ' + tempD.getDate()+'/'+(tempD.getMonth()+1) + '</div>';
        html +=   '<div class="text-warning fw-700 mt-1">' + (giaMock/1000) + 'K</div>';
        html += '</div>';
    }
    html +=   '</div>';
    html += '</div>';

    // DANH SÁCH CHUYẾN TÀU
    for (var i = 0; i < danhSach.length; i++) {
        var t = danhSach[i];
        var gioParts = t.time.split(' - ');

        html += '<div class="ticket-card train" style="animation:fadeInUp 0.4s ease both;animation-delay:' + (i * 0.08) + 's;">';

        // Huy hiệu tàu
        html +=   '<div class="text-center">';
        html +=     '<div style="width:60px;height:60px;background:linear-gradient(135deg,#2ecc71,#27ae60);border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0 auto;">';
        html +=       '<i class="bi bi-train-front-fill text-white fs-2"></i>';
        html +=     '</div>';
        html +=     '<div class="fw-900 text-white mt-1" style="font-size:1.1rem;">' + t.code + '</div>';
        html +=     '<div class="badge bg-success mt-1" style="font-size:0.68rem;">' + (t.type || 'SE') + '</div>';
        html +=   '</div>';

        // Thông tin tuyến
        html +=   '<div style="flex:1;">';
        html +=     '<div class="fw-700 text-white mb-1">' + t.name + '</div>';
        html +=     '<div class="d-flex align-items-center gap-3 mb-2">';
        html +=       '<div class="text-center">';
        html +=         '<div class="fw-900 text-white fs-4">' + (gioParts[0] || '') + '</div>';
        html +=         '<div class="text-white-50 small">' + tenGaTau(t.from) + '</div>';
        html +=       '</div>';
        html +=       '<div class="text-center flex-1">';
        html +=         '<div class="text-white-50 small">' + (t.duration || '---') + '</div>';
        html +=         '<div style="height:2px;background:linear-gradient(90deg,#2ecc71,#27ae60);border-radius:1px;margin:4px 0;position:relative;">';
        html +=           '<i class="bi bi-train-front-fill text-success position-absolute" style="right:-2px;top:-7px;font-size:0.7rem;"></i>';
        html +=         '</div>';
        html +=         '<div class="badge" style="background:rgba(46,204,113,0.15);color:#2ecc71;font-size:0.68rem;">Thẳng</div>';
        html +=       '</div>';
        html +=       '<div class="text-center">';
        html +=         '<div class="fw-900 text-white fs-4">' + (gioParts[1] || '') + '</div>';
        html +=         '<div class="text-white-50 small">' + tenGaTau(t.to) + '</div>';
        html +=       '</div>';
        html +=     '</div>';

        // Loại ghế & Tiện ích thêm
        html +=     '<div class="d-flex flex-wrap gap-2 mt-2 align-items-center">';
        html +=       '<span class="badge" style="background:rgba(46,204,113,0.2);color:#2ecc71;font-size:0.72rem;"><i class="bi bi-chair-fill"></i> Ghế mềm từ ' + (t.price/1000).toFixed(0) + 'K</span>';
        html +=       '<span class="badge" style="background:rgba(243,156,18,0.2);color:#f39c12;font-size:0.72rem;"><i class="bi bi-door-closed-fill"></i> Giường cabin từ ' + ((t.price + 150000)/1000).toFixed(0) + 'K</span>';
        html +=       '<span class="badge" style="background:rgba(52,152,219,0.2);color:#3498db;font-size:0.72rem;"><i class="bi bi-ticket-perforated-fill"></i> Còn ' + Math.floor(Math.random()*40 + 10) + ' vé</span>';
        html +=       '<button class="btn btn-sm btn-outline-info rounded-pill py-0 px-2" style="font-size:0.72rem;" onclick="xemChiTietHanhTrinh(\'' + t.id + '\')"><i class="bi bi-map"></i> Chi tiết hành trình</button>';
        html +=     '</div>';
        html +=   '</div>';

        // Giá + nút
        html +=   '<div class="text-end">';
        html +=     '<div class="text-white-50 small">Từ</div>';
        html +=     '<div class="fw-900 text-warning" style="font-size:1.6rem;">' + (t.price/1000).toFixed(0) + 'K</div>';
        html +=     '<div class="text-white-50 small mb-2">' + t.price.toLocaleString('vi-VN') + ' ₫</div>';
        html +=     '<button class="btn btn-sm fw-700" style="background:linear-gradient(135deg,#2ecc71,#27ae60);color:#fff;border-radius:50px;padding:6px 18px;" onclick="moModalChonChoTau(\'' + t.id + '\')">';
        html +=       'Chọn Chỗ <i class="bi bi-arrow-right"></i>';
        html +=     '</button>';
        html +=   '</div>';

        html += '</div>';
    }

    // Thêm keyframe nếu chưa có
    if (!document.getElementById('train-keyframes')) {
        var s = document.createElement('style');
        s.id = 'train-keyframes';
        s.innerText = '@keyframes fadeInUp { from { opacity:0;transform:translateY(20px); } to { opacity:1;transform:translateY(0); } }';
        document.head.appendChild(s);
    }

    container.innerHTML = html;
}

function tenGaTau(ma) {
    var map = { 'SGN': 'Sài Gòn', 'HAN': 'Hà Nội', 'DAD': 'Đà Nẵng', 'NHA': 'Nha Trang' };
    return map[ma] || ma;
}

// ---------------------------------------------------------------
// HÀM: Xem chi tiết hành trình
// ---------------------------------------------------------------
function xemChiTietHanhTrinh(idTau) {
    var tau;
    for (var i = 0; i < mockTrains.length; i++) {
        if (mockTrains[i].id === idTau) { tau = mockTrains[i]; break; }
    }
    if (!tau) return;

    var html = '<div class="timeline-container py-3 px-2">';
    html += '<h6 class="text-success fw-700 mb-3"><i class="bi bi-train-front"></i> Lộ trình dự kiến tàu ' + tau.code + ' (' + tau.name + ')</h6>';
    html += '<div class="position-relative" style="border-left: 2px dashed #2ecc71; margin-left: 12px; padding-left: 20px;">';
    
    // Mock dữ liệu lộ trình
    var stops = [
        { time: tau.time.split(' - ')[0], station: tenGaTau(tau.from), status: 'Xuất phát' },
        { time: '...', station: 'Các ga dọc đường', status: 'Dừng 5-10 phút' },
        { time: tau.time.split(' - ')[1], station: tenGaTau(tau.to), status: 'Đích đến' }
    ];

    for(var j=0; j<stops.length; j++) {
        var s = stops[j];
        var iconColor = j === 0 ? 'text-primary' : (j === stops.length-1 ? 'text-danger' : 'text-warning');
        html += '<div class="mb-4 position-relative">';
        html += '<i class="bi bi-circle-fill ' + iconColor + ' position-absolute" style="left: -27px; top: 0; font-size: 0.8rem; background:#1a1a2e; border-radius:50%;"></i>';
        html += '<div class="fw-700 text-white">' + s.time + ' - ' + s.station + '</div>';
        html += '<div class="text-white-50 small">' + s.status + '</div>';
        html += '</div>';
    }

    html += '</div></div>';
    
    document.getElementById('train-itinerary-body').innerHTML = html;
    var myModal = new bootstrap.Modal(document.getElementById('trainItineraryModal'));
    myModal.show();
}

var gheTauDangChonList = [];

// ---------------------------------------------------------------
// HÀM: Mở modal chọn chỗ tàu
// ---------------------------------------------------------------
function moModalChonChoTau(idTau) {
    tauDangChon = null;
    gheTauDangChonList = [];
    kieuToa = 'ghe';

    for (var i = 0; i < mockTrains.length; i++) {
        if (mockTrains[i].id === idTau) {
            tauDangChon = mockTrains[i];
            break;
        }
    }
    if (!tauDangChon) return;

    var t = tauDangChon;
    var gioParts = t.time.split(' - ');
    document.getElementById('train-modal-info').innerHTML =
        t.code + ' · ' + t.name + ' · ' + (gioParts[0]||'') + ' → ' + (gioParts[1]||'') + ' · ' + dinhDangNgay(ngayDiTau);

    // Reset
    var nutXN = document.getElementById('btn-confirm-train');
    if (nutXN) { nutXN.disabled = true; nutXN.innerText = 'Xác Nhận Mua'; }
    document.getElementById('train-seat-info-selected').innerText = 'Chưa chọn chỗ';

    var myModal = new bootstrap.Modal(document.getElementById('trainSeatModal'));
    myModal.show();
    setTimeout(function() { doiToaTau('1', 'ghe'); }, 200);
}

// ---------------------------------------------------------------
// HÀM: Đổi toa tàu
// ---------------------------------------------------------------
function doiToaTau(soToa, kieu) {
    kieuToa = kieu;
    choTauDangChon = null;

    // Reset tất cả các nút toa
    var buttons = document.querySelectorAll('.btn-toa');
    buttons.forEach(function(btn) {
        btn.className = 'btn btn-outline-secondary rounded-pill px-3 fw-700 btn-toa';
    });

    var activeBtn = document.getElementById('btn-toa-' + soToa);
    var nutXN = document.getElementById('btn-confirm-train');

    if (kieu === 'ghe') {
        if(activeBtn) activeBtn.className = 'btn btn-success rounded-pill px-3 fw-700 btn-toa';
        document.getElementById('train-legend-ghe').style.display = 'flex';
        document.getElementById('train-legend-giuong').style.display = 'none';
        veToaGheMem();
    } else {
        if(activeBtn) activeBtn.className = (soToa === 'vip') ? 'btn btn-warning rounded-pill px-3 fw-700 btn-toa text-dark' : 'btn btn-success rounded-pill px-3 fw-700 btn-toa';
        document.getElementById('train-legend-ghe').style.display = 'none';
        document.getElementById('train-legend-giuong').style.display = 'flex';
        veCabinGiuong();
    }

    if (nutXN) { nutXN.disabled = true; nutXN.innerText = 'Xác Nhận Mua'; }
    document.getElementById('train-seat-info-selected').innerText = 'Chưa chọn chỗ';
}

// ---------------------------------------------------------------
// HÀM: Vẽ toa ghế mềm (4 ghế/hàng: 2-2, 20 hàng)
// ---------------------------------------------------------------
function veToaGheMem() {
    var container = document.getElementById('train-seat-map-container');
    if (!container) return;

    var gheDaDat = ['3A','3B','7C','7D','11A','14C','16D'];
    var html = '';

    html += '<div class="train-coach-container">';
    html +=   '<div class="text-center fw-700 mb-3" style="color:#2c3e50;font-size:0.8rem;letter-spacing:1px;">🚃 TOA GHẾ MỀM – NGỒI</div>';

    // Header cột
    html +=   '<div class="d-flex justify-content-between mb-2 px-1">';
    html +=     '<div class="train-seat-grp"><span class="train-aisle-label">A</span><span class="train-aisle-label">B</span></div>';
    html +=     '<div class="train-aisle-label" style="width:36px;"></div>';
    html +=     '<div class="train-seat-grp"><span class="train-aisle-label">C</span><span class="train-aisle-label">D</span></div>';
    html +=   '</div>';

    for (var hang = 1; hang <= 20; hang++) {
        var gheTrong = [hang + 'A', hang + 'B', hang + 'C', hang + 'D'];

        html += '<div class="train-row">';
        html +=   '<div class="train-seat-grp">';

        // A, B
        for (var ci = 0; ci < 2; ci++) {
            var ky = ['A','B'][ci];
            var ma = hang + ky;
            var laDaDat = gheDaDat.indexOf(ma) > -1;
            var cls = 'train-seat ' + (ci === 0 ? 'window' : 'middle') + (laDaDat ? ' booked' : '');
            html += '<div class="' + cls + '" onclick="chonChoTau(this,\'' + ma + '\')">' + ma + '</div>';
        }

        html +=   '</div>';
        html +=   '<div class="train-divider">Lối đi</div>';
        html +=   '<div class="train-seat-grp">';

        // C, D
        for (var ci2 = 0; ci2 < 2; ci2++) {
            var ky2 = ['C','D'][ci2];
            var ma2 = hang + ky2;
            var laDaDat2 = gheDaDat.indexOf(ma2) > -1;
            var cls2 = 'train-seat ' + (ci2 === 1 ? 'window' : 'middle') + (laDaDat2 ? ' booked' : '');
            html += '<div class="' + cls2 + '" onclick="chonChoTau(this,\'' + ma2 + '\')">' + ma2 + '</div>';
        }
        html +=   '</div>';
        html += '</div>';

        if (hang % 5 === 0 && hang < 20) {
            html += '<div class="train-divider">— Khoang ' + Math.floor(hang/5) + ' —</div>';
        }
    }

    html += '</div>';
    container.innerHTML = html;
}

// ---------------------------------------------------------------
// HÀM: Vẽ cabin giường nằm (5 cabin, mỗi cabin 6 giường: 3 trên + 3 dưới)
// ---------------------------------------------------------------
function veCabinGiuong() {
    var container = document.getElementById('train-seat-map-container');
    if (!container) return;

    var giuongDaDat = ['1-A1U', '2-B2L', '3-A3U', '4-B1U'];
    var html = '';
    var isVip = (kieuToa === 'vip');

    html += '<div class="cabin-container">';
    html +=   '<div class="text-center fw-700 mb-2" style="color:#2c3e50;font-size:0.8rem;letter-spacing:1px;">🛏 TOA GIƯỜNG NẰM ' + (isVip ? 'VIP (CABIN 2 GIƯỜNG)' : 'CABIN 6 CHỖ') + '</div>';

    var soCabin = isVip ? 7 : 5;
    var soTang = isVip ? 1 : 3;

    for (var cabin = 1; cabin <= soCabin; cabin++) {
        html += '<div class="cabin-box" ' + (isVip ? 'style="border: 2px solid #f39c12; background: rgba(243,156,18,0.05);"' : '') + '>';
        html +=   '<div class="cabin-header" ' + (isVip ? 'style="background: #f39c12; color: #fff;"' : '') + '>Cabin ' + cabin + ' <span style="opacity:0.8;font-size:0.72rem;font-weight:400;">(' + (soTang*2) + ' giường)</span></div>';
        html +=   '<div class="cabin-beds">';

        // Cột A (trái)
        html +=     '<div class="cabin-col">';
        for (var tang = 1; tang <= soTang; tang++) {
            var maG = cabin + '-A' + tang + (tang % 2 === 0 ? 'U' : 'L');
            var daDat = giuongDaDat.indexOf(maG) > -1;
            var maCheck = cabin + '-A' + (tang === 1 ? '1L' : (tang === 2 ? '2U' : '3U'));
            var isSelected = gheTauDangChonList.some(function(g){ return g.ma === maCheck; });
            var clsG = 'train-bed ' + (tang % 2 !== 0 ? 'lower' : 'upper') + (daDat ? ' booked' : '') + (isSelected ? ' selected' : '');
            var tenTang = tang === 1 ? 'Dưới' : (tang === 2 ? 'Giữa' : 'Trên');
            html +=   '<div class="' + clsG + '" onclick="chonGiuongTau(this,\'' + cabin + '\',\'A\',\'' + tenTang + '\')">';
            html +=     '<span>A' + cabin + ' - ' + tenTang + '</span>';
            html +=   '</div>';
        }
        html +=     '</div>';

        // Lối đi giữa 2 giường
        html +=     '<div style="width:30px;"></div>';

        // Cột B (phải)
        html +=     '<div class="cabin-col">';
        for (var tang2 = 1; tang2 <= soTang; tang2++) {
            var maG2 = cabin + '-B' + tang2 + (tang2 % 2 !== 0 ? 'U' : 'L');
            var daDat2 = giuongDaDat.indexOf(maG2) > -1;
            var maCheck2 = cabin + '-B' + (tang2 === 1 ? '1L' : (tang2 === 2 ? '2U' : '3U'));
            var isSelected2 = gheTauDangChonList.some(function(g){ return g.ma === maCheck2; });
            var clsG2 = 'train-bed ' + (tang2 % 2 !== 0 ? 'lower' : 'upper') + (daDat2 ? ' booked' : '') + (isSelected2 ? ' selected' : '');
            var tenTang2 = tang2 === 1 ? 'Dưới' : (tang2 === 2 ? 'Giữa' : 'Trên');
            html +=   '<div class="' + clsG2 + '" onclick="chonGiuongTau(this,\'' + cabin + '\',\'B\',\'' + tenTang2 + '\')">';
            html +=     '<span>B' + cabin + ' - ' + tenTang2 + '</span>';
            html +=   '</div>';
        }
        html +=     '</div>';

        html +=   '</div>';
        html += '</div>';
    }

    html += '</div>';
    container.innerHTML = html;
}

function chonChoTau(phanTu, maGhe) {
    if (phanTu.classList.contains('booked')) {
        alert('Chỗ ' + maGhe + ' đã được đặt!');
        return;
    }

    var slNguoiLon = parseInt(sessionStorage.getItem('trainAdults')) || 1;
    var slTreEm = parseInt(sessionStorage.getItem('trainChildren')) || 0;
    var tongHanhKhach = slNguoiLon + slTreEm;

    var index = gheTauDangChonList.findIndex(function(g) { return g.ma === maGhe; });
    var gia = tauDangChon.price;

    if (index > -1) {
        gheTauDangChonList.splice(index, 1);
        phanTu.classList.remove('selected');
    } else {
        if (gheTauDangChonList.length >= tongHanhKhach) {
            alert('Bạn chỉ được chọn tối đa ' + tongHanhKhach + ' chỗ (Tương ứng với số lượng hành khách đã nhập)!');
            return;
        }
        gheTauDangChonList.push({ loai: 'ghe', ma: maGhe, gia: gia });
        phanTu.classList.add('selected');
    }

    capNhatThongTinChonCho();
}

function chonGiuongTau(phanTu, cabin, cot, tang) {
    if (phanTu.classList.contains('booked')) {
        alert('Giường này đã được đặt!');
        return;
    }

    var slNguoiLon = parseInt(sessionStorage.getItem('trainAdults')) || 1;
    var slTreEm = parseInt(sessionStorage.getItem('trainChildren')) || 0;
    var tongHanhKhach = slNguoiLon + slTreEm;

    var maGiuong = cabin + '-' + cot + (tang === 'Dưới' ? '1L' : (tang === 'Giữa' ? '2U' : '3U'));
    var index = gheTauDangChonList.findIndex(function(g) { return g.ma === maGiuong; });
    var giaGiuong = tauDangChon.price + 150000;
    if (tang === 'Trên') giaGiuong -= 50000;

    if (index > -1) {
        gheTauDangChonList.splice(index, 1);
        phanTu.classList.remove('selected');
    } else {
        if (gheTauDangChonList.length >= tongHanhKhach) {
            alert('Bạn chỉ được chọn tối đa ' + tongHanhKhach + ' giường (Tương ứng với số lượng hành khách đã nhập)!');
            return;
        }
        gheTauDangChonList.push({ loai: 'giuong', ma: maGiuong, gia: giaGiuong });
        phanTu.classList.add('selected');
    }

    capNhatThongTinChonCho();
}

function capNhatThongTinChonCho() {
    var nutXN = document.getElementById('btn-confirm-train');
    var slNguoiLon = parseInt(sessionStorage.getItem('trainAdults')) || 1;
    var slTreEm = parseInt(sessionStorage.getItem('trainChildren')) || 0;
    var tongHanhKhach = slNguoiLon + slTreEm;

    if (gheTauDangChonList.length === 0) {
        document.getElementById('train-seat-info-selected').innerText = 'Chưa chọn chỗ';
        if (nutXN) { nutXN.disabled = true; nutXN.innerHTML = 'Xác Nhận Mua'; }
        return;
    }

    var tongTien = 0;
    var gheText = '';
    for (var i = 0; i < gheTauDangChonList.length; i++) {
        var ghe = gheTauDangChonList[i];
        tongTien += ghe.gia;
        gheText += '<span class="badge bg-secondary me-1">' + ghe.ma + '</span>';
    }

    document.getElementById('train-seat-info-selected').innerHTML =
        'Đã chọn: ' + gheText +
        ' <span class="text-warning ms-2 fw-700">Tổng: ' + tongTien.toLocaleString('vi-VN') + ' ₫</span>';

    if (nutXN) { 
        nutXN.disabled = (gheTauDangChonList.length < tongHanhKhach);
        nutXN.innerHTML = '<i class="bi bi-check2-circle"></i> Xác Nhận Mua (' + gheTauDangChonList.length + '/' + tongHanhKhach + ')'; 
    }
}

// ---------------------------------------------------------------
// HÀM: Xác nhận đặt tàu và thêm vào giỏ hàng
// ---------------------------------------------------------------
function xacNhanDatTau() {
    if (gheTauDangChonList.length === 0 || !tauDangChon) return;

    var t = tauDangChon;
    var isKhuHoi = sessionStorage.getItem('trainIsRoundTrip') === 'true';
    var textChieu = isKhuHoi ? ' (Khứ Hồi)' : ' (Một Chiều)';
    
    for (var i = 0; i < gheTauDangChonList.length; i++) {
        var choTau = gheTauDangChonList[i];
        var loaiChoText = choTau.loai === 'ghe' ? 'Ghế Mềm' : 'Giường Nằm Cabin';
        var chiTiet = choTau.ma + ' · ' + loaiChoText + textChieu +
                      ' · Tàu ' + t.code + ' · ' + dinhDangNgay(ngayDiTau);

        if (typeof addToCart === 'function') {
            addToCart(
                'Vé Tàu Hỏa – ' + t.code,
                t.from + ' → ' + t.to,
                choTau.gia,
                chiTiet,
                'train',
                ''
            );
        }
    }

    var modal = bootstrap.Modal.getInstance(document.getElementById('trainSeatModal'));
    if (modal) modal.hide();
}
