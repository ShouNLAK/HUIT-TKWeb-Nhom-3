// =============================================================
// VIET TRAVEL HUB - js/bus.js (Logic trang Xe Khách)
// Sơ đồ xe giường nằm 2 tầng, 34 giường
// =============================================================

// Biến trạng thái
var ngayDiXe = '';
var xeDangChon = null;
var giuongXeDangChon = null;
var locHangXeHienTai = '';
var danhSachXeHienThi = [];

document.addEventListener("DOMContentLoaded", function() {
    var homNay = new Date().toISOString().split('T')[0];
    var inputNgay = document.getElementById('xeKhachNgay');
    if (inputNgay) {
        inputNgay.min = homNay;
        inputNgay.value = homNay;
        ngayDiXe = homNay;
    }
    
    // Khởi tạo danh sách mặc định
    danhSachXeHienThi = mockBuses;
    hienThiDanhSachXe(danhSachXeHienThi);
});

// ---------------------------------------------------------------
// HÀM: Tìm chuyến xe
// ---------------------------------------------------------------
function timXe(event) {
    if (event) event.preventDefault();

    var tu = document.getElementById('xeKhachTu').value;
    var den = document.getElementById('xeKhachDen').value;
    var inputNgay = document.getElementById('xeKhachNgay');
    ngayDiXe = inputNgay ? inputNgay.value : '';

    if (!ngayDiXe) {
        document.getElementById('bus-results').innerHTML =
            '<div class="alert alert-warning fw-600"><i class="bi bi-exclamation-triangle-fill me-2"></i>Vui lòng chọn Ngày Đi!</div>';
        return;
    }
    if (tu !== '' && den !== '' && tu === den) {
        document.getElementById('bus-results').innerHTML =
            '<div class="alert alert-warning fw-600"><i class="bi bi-exclamation-triangle-fill me-2"></i>Điểm Đi và Điểm Đến không được trùng nhau!</div>';
        return;
    }

    var ketQua = mockBuses;

    if (tu !== '') {
        var loc1 = [];
        for (var i = 0; i < ketQua.length; i++) {
            if (ketQua[i].from === tu) loc1.push(ketQua[i]);
        }
        ketQua = loc1;
    }
    if (den !== '') {
        var loc2 = [];
        for (var j = 0; j < ketQua.length; j++) {
            if (ketQua[j].to === den) loc2.push(ketQua[j]);
        }
        ketQua = loc2;
    }

    danhSachXeHienThi = ketQua;
    locHangXeHienTai = '';

    // Reset active cho các filter chips bằng cách quét hàm click
    var chips = document.querySelectorAll('.filter-chip');
    for (var k = 0; k < chips.length; k++) {
        chips[k].classList.remove('active');
        var oc = chips[k].getAttribute('onclick') || '';
        if (oc.indexOf("''") > -1 || oc.indexOf('""') > -1) {
            chips[k].classList.add('active');
        }
    }

    hienThiDanhSachXe(danhSachXeHienThi);
}

// ---------------------------------------------------------------
// HÀM: Chuyển chuỗi tiếng Việt sang không dấu, viết thường để so sánh an toàn
// ---------------------------------------------------------------
function xoaDauTiengViet(str) {
    if (!str) return '';
    return str.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd')
              .replace(/Đ/g, 'd')
              .toLowerCase()
              .trim();
}

// ---------------------------------------------------------------
// HÀM: Lọc theo nhà xe
// ---------------------------------------------------------------
function locHang(phanTu, tenHang) {
    var chips = document.querySelectorAll('.filter-chip');
    for (var i = 0; i < chips.length; i++) {
        chips[i].classList.remove('active');
    }
    phanTu.classList.add('active');

    locHangXeHienTai = tenHang;

    var ketQua = [];
    var tenHangKhongDau = xoaDauTiengViet(tenHang);

    for (var j = 0; j < danhSachXeHienThi.length; j++) {
        var companyKhongDau = xoaDauTiengViet(danhSachXeHienThi[j].company);
        if (tenHang === '' || companyKhongDau === tenHangKhongDau) {
            ketQua.push(danhSachXeHienThi[j]);
        }
    }

    hienThiDanhSachXe(ketQua);
}

// ---------------------------------------------------------------
// HÀM: Render danh sách xe khách
// ---------------------------------------------------------------
function hienThiDanhSachXe(danhSach) {
    var container = document.getElementById('bus-results');
    var elSoKQ = document.getElementById('so-ket-qua');

    if (elSoKQ) elSoKQ.innerText = 'Tìm thấy ' + danhSach.length + ' chuyến xe';
    if (!container) return;

    if (danhSach.length === 0) {
        container.innerHTML = 
            '<div class="text-center py-5">' +
            '  <i class="bi bi-bus-front text-white-50" style="font-size:3rem;opacity:0.3;"></i>' +
            '  <p class="text-white-50 mt-3">Không có chuyến xe phù hợp.<br>Thử chọn tuyến khác hoặc bỏ bộ lọc.</p>' +
            '</div>';
        return;
    }

    // Màu hãng xe
    var mauHang = {
        'Phương Trang': '#ff5722',
        'Thành Bưởi': '#009688',
        'Hạnh Cafe': '#3f51b5',
        'Hoàng Long': '#e91e63'
    };

    var html = '';
    for (var i = 0; i < danhSach.length; i++) {
        var b = danhSach[i];
        var gioParts = b.time.split(' - ');
        var mau = mauHang[b.company] || '#e74c3c';
        var tenVietTat = b.company === 'Phương Trang' ? 'FUTA' : (b.company === 'Thành Bưởi' ? 'TB' : (b.company === 'Hạnh Cafe' ? 'HC' : 'HL'));

        html += '<div class="ticket-card bus" style="animation:fadeInUp 0.4s ease both;animation-delay:' + (i * 0.08) + 's;">';

        // Logo xe - compact box
        html +=   '<div class="airline-logo-box" style="flex-shrink:0; background:' + mau + '; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:0.9rem; width:64px; height:64px; border-radius:12px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">';
        html +=     tenVietTat;
        html +=   '</div>';

        // Tên hãng & thông tin
        html +=   '<div style="flex-shrink:0; min-width:130px; max-width:150px;">';
        html +=     '<div class="fw-800 text-white" style="font-size:0.95rem;line-height:1.2;">' + b.company + '</div>';
        html +=     '<span class="badge bg-danger" style="font-size:0.65rem; background:#e74c3c!important;">' + b.name.split(' ')[0] + '</span>';
        html +=     '<div class="text-white-50" style="font-size:0.72rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:140px; margin-top:2px;">' + b.type + '</div>';
        html +=     '<span class="badge bg-success" style="font-size:0.62rem; margin-top:2px;">Tuyến thẳng</span>';
        html +=   '</div>';

        // Route lộ trình
        html +=   '<div class="flight-route" style="flex:1; justify-content:center; gap:8px;">';
        html +=     '<div class="text-center">';
        html +=       '<div class="flight-city-code text-white" style="font-size: 1.8rem; font-weight: 900; line-height: 1;">' + (gioParts[0] || '') + '</div>';
        html +=       '<div class="text-white-50 small" style="white-space:nowrap;">' + tenDiemXe(b.from) + '</div>';
        html +=     '</div>';
        html +=     '<div class="flight-arrow mx-2 text-center" style="flex:1; display:flex; flex-direction:column; align-items:center; gap:4px;">';
        html +=       '<div class="text-white-50" style="font-size:0.68rem;white-space:nowrap;">' + (b.duration || '---') + '</div>';
        html +=       '<div class="flight-arrow-line my-1" style="width: 100%; height: 1px; background: linear-gradient(90deg, rgba(255,255,255,0.1), rgba(231,76,60,0.5), rgba(255,255,255,0.1)); position: relative;">';
        html +=         '<i class="bi bi-bus-front-fill text-danger position-absolute" style="left:50%; transform:translateX(-50%); top:-8px; font-size:0.85rem;"></i>';
        html +=       '</div>';
        html +=       '<div class="badge" style="background:rgba(231,76,60,0.12);color:#e74c3c;font-size:0.62rem;white-space:nowrap;">Giường nằm</div>';
        html +=     '</div>';
        html +=     '<div class="text-center">';
        html +=       '<div class="flight-city-code text-white" style="font-size: 1.8rem; font-weight: 900; line-height: 1;">' + (gioParts[1] || '') + '</div>';
        html +=       '<div class="text-white-50 small" style="white-space:nowrap;">' + tenDiemXe(b.to) + '</div>';
        html +=     '</div>';
        html +=   '</div>';

        // Tiện ích cột ẩn trên mobile
        html +=   '<div class="d-none d-xl-flex flex-column justify-content-center gap-1 mx-2" style="flex-shrink:0; min-width:110px;">';
        var tienIch = (b.amenities || ['Giường nằm', 'WiFi', 'Điều hòa']);
        for (var ti = 0; ti < tienIch.length; ti++) {
            var icon = 'bi-check-circle-fill';
            if (tienIch[ti].indexOf('WiFi') > -1) icon = 'bi-wifi';
            else if (tienIch[ti].indexOf('Điều hòa') > -1) icon = 'bi-snow';
            else if (tienIch[ti].indexOf('Sạc') > -1 || tienIch[ti].indexOf('cổng') > -1) icon = 'bi-plug';
            else if (tienIch[ti].indexOf('Cabin') > -1) icon = 'bi-person-workspace';
            else if (tienIch[ti].indexOf('nằm') > -1) icon = 'bi-moon-stars';
            else if (tienIch[ti].indexOf('Nước') > -1) icon = 'bi-water';
            html += '<span class="text-white-50" style="font-size:0.75rem;"><i class="bi ' + icon + ' text-danger me-1"></i>' + tienIch[ti] + '</span>';
        }
        html +=   '</div>';

        // Giá vé và nút đặt
        html +=   '<div class="text-end" style="flex-shrink:0; min-width:110px;">';
        html +=     '<div class="text-white-50" style="font-size:0.68rem;">Giá từ</div>';
        html +=     '<div class="fw-900 text-warning" style="font-size:1.5rem;line-height:1.1;">' + (b.price/1000).toFixed(0) + 'K</div>';
        html +=     '<div class="text-white-50" style="font-size:0.72rem; margin-bottom:4px;">' + b.price.toLocaleString('vi-VN') + ' ₫</div>';
        html +=     '<span class="badge bg-success mb-2" style="font-size:0.62rem;">' + (b.available || '20') + ' giường trống</span><br>';
        html +=     '<button class="btn btn-sm btn-custom fw-700 px-3" onclick="moModalChonGiuong(\'' + b.id + '\')" style="background:linear-gradient(135deg,#e74c3c,#c0392b); border-color:#e74c3c; box-shadow:0 4px 15px rgba(231,76,60,0.4); white-space:nowrap;">';
        html +=       'Chọn Vé <i class="bi bi-arrow-right"></i>';
        html +=     '</button>';
        html +=   '</div>';

        html += '</div>';
    }

    // Keyframe
    if (!document.getElementById('bus-keyframes')) {
        var s = document.createElement('style');
        s.id = 'bus-keyframes';
        s.innerText = '@keyframes fadeInUp { from { opacity:0;transform:translateY(20px); } to { opacity:1;transform:translateY(0); } }';
        document.head.appendChild(s);
    }

    container.innerHTML = html;
}

function tenDiemXe(ma) {
    var map = { 'SGN': 'TP.HCM', 'DLI': 'Đà Lạt', 'CXR': 'Nha Trang', 'HAN': 'Hà Nội' };
    return map[ma] || ma;
}

// ---------------------------------------------------------------
// HÀM: Mở modal chọn giường xe
// ---------------------------------------------------------------
function moModalChonGiuong(idXe) {
    xeDangChon = null;
    giuongXeDangChon = null;

    for (var i = 0; i < mockBuses.length; i++) {
        if (mockBuses[i].id === idXe) {
            xeDangChon = mockBuses[i];
            break;
        }
    }
    if (!xeDangChon) return;

    var b = xeDangChon;
    var gioParts = b.time.split(' - ');
    document.getElementById('bus-modal-info').innerHTML =
        b.company + ' · ' + b.name + ' · ' + (gioParts[0]||'') + ' → ' + (gioParts[1]||'') + ' · ' + dinhDangNgay(ngayDiXe);

    var nutXN = document.getElementById('btn-confirm-bus');
    if (nutXN) { nutXN.disabled = true; nutXN.innerText = 'Xác Nhận Đặt'; }
    document.getElementById('bus-seat-info-selected').innerText = 'Chưa chọn giường';

    // Vẽ sơ đồ tầng dưới và tầng trên
    veSoDoXe('lower', document.getElementById('bus-map-lower'));
    veSoDoXe('upper', document.getElementById('bus-map-upper'));

    var modal = new bootstrap.Modal(document.getElementById('busSeatModal'));
    modal.show();
}

// ---------------------------------------------------------------
// HÀM: Vẽ sơ đồ xe khách 1 tầng (17 giường mỗi tầng: 9 hàng × 2 + 1 cuối)
// tang = 'lower' | 'upper'
// ---------------------------------------------------------------
function veSoDoXe(tang, container) {
    if (!container) return;

    // Giường đã đặt cho mỗi tầng
    var giuongDaDat = {
        lower: ['D1', 'D4', 'D7', 'D12'],
        upper: ['U2', 'U6', 'U9']
    };
    var prefix = tang === 'lower' ? 'D' : 'U';
    var daDatList = giuongDaDat[tang];

    var html = '';

    // Vẽ 8 hàng (mỗi hàng 2 giường: trái và phải)
    for (var hang = 1; hang <= 8; hang++) {
        var soTrai = (hang - 1) * 2 + 1;
        var soPhai = soTrai + 1;
        var maTrai = prefix + soTrai;
        var maPhai = prefix + soPhai;
        var daDatTrai = daDatList.indexOf(maTrai) > -1;
        var daDatPhai = daDatList.indexOf(maPhai) > -1;

        html += '<div class="bus-row">';
        // Giường trái
        html +=   '<div class="bus-bed' + (daDatTrai ? ' booked' : '') + '" onclick="chonGiuongXe(this,\'' + maTrai + '\',\'' + tang + '\')">';
        html +=     '<span>' + maTrai + '</span>';
        html +=   '</div>';
        // Lối đi giữa
        html +=   '<div class="bus-aisle"><i class="bi bi-three-dots-vertical text-secondary" style="opacity:0.25;"></i></div>';
        // Giường phải
        html +=   '<div class="bus-bed' + (daDatPhai ? ' booked' : '') + '" onclick="chonGiuongXe(this,\'' + maPhai + '\',\'' + tang + '\')">';
        html +=     '<span>' + maPhai + '</span>';
        html +=   '</div>';
        html += '</div>';
    }

    // Hàng cuối: 1 giường lẻ ở giữa
    var soGuoi = 17;
    var maGuoi = prefix + soGuoi;
    var daDatGuoi = daDatList.indexOf(maGuoi) > -1;
    html += '<div class="bus-row justify-content-center">';
    html +=   '<div class="bus-bed' + (daDatGuoi ? ' booked' : '') + '" onclick="chonGiuongXe(this,\'' + maGuoi + '\',\'' + tang + '\')" style="width:180px;">';
    html +=     '<span>' + maGuoi + ' (Cuối)</span>';
    html +=   '</div>';
    html += '</div>';

    container.innerHTML = html;
}

// ---------------------------------------------------------------
// HÀM: Chọn giường xe khách
// ---------------------------------------------------------------
function chonGiuongXe(phanTu, maGiuong, tang) {
    if (phanTu.classList.contains('booked')) {
        alert('Giường ' + maGiuong + ' đã được đặt! Vui lòng chọn giường khác.');
        return;
    }

    // Bỏ chọn tất cả các giường đang chọn
    var tatCa = document.querySelectorAll('.bus-bed.selected');
    for (var i = 0; i < tatCa.length; i++) tatCa[i].classList.remove('selected');

    phanTu.classList.add('selected');

    var tenTang = tang === 'lower' ? 'Tầng Dưới' : 'Tầng Trên';
    var gia = xeDangChon.price;
    // Tầng dưới đắt hơn tầng trên 50K
    if (tang === 'lower') gia += 50000;

    giuongXeDangChon = { maGiuong: maGiuong, tang: tenTang, gia: gia };

    document.getElementById('bus-seat-info-selected').innerHTML =
        'Giường <strong class="text-white">' + maGiuong + '</strong>' +
        ' <span class="badge bg-danger ms-1">' + tenTang + '</span>' +
        ' <span class="text-warning ms-2 fw-700">' + gia.toLocaleString('vi-VN') + ' ₫</span>';

    var nutXN = document.getElementById('btn-confirm-bus');
    if (nutXN) { nutXN.disabled = false; nutXN.innerHTML = '<i class="bi bi-check2-circle me-1"></i>Xác Nhận – ' + maGiuong; }
}

// ---------------------------------------------------------------
// HÀM: Xác nhận đặt xe và thêm vào giỏ hàng
// ---------------------------------------------------------------
function xacNhanDatXe() {
    if (!giuongXeDangChon || !xeDangChon) return;

    var b = xeDangChon;
    var chiTiet = giuongXeDangChon.maGiuong + ' · ' + giuongXeDangChon.tang +
                  ' · ' + b.company + ' · ' + dinhDangNgay(ngayDiXe);

    if (typeof addToCart === 'function') {
        addToCart(
            'Vé Xe Khách – ' + b.company,
            b.from + ' → ' + b.to,
            giuongXeDangChon.gia,
            chiTiet,
            'bus',
            ''
        );
    }

    var modal = bootstrap.Modal.getInstance(document.getElementById('busSeatModal'));
    if (modal) modal.hide();
}
