// =============================================================
// VIET TRAVEL HUB - js/flight.js (Logic trang Máy Bay)
// Áp dụng: form validation, DOM manipulation, sơ đồ ghế 2D
// =============================================================

// Biến trạng thái trang máy bay
var ngayBay = '';
var chuyenBayDangChon = null;
var gheDangChon = null;
var hangLocHien = '';
var danhSachHienThi = [];

// ---------------------------------------------------------------
// KHỞI TẠO
// ---------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    // Thiết lập ngày tối thiểu hôm nay
    var homNay = new Date().toISOString().split('T')[0];
    var inputNgay = document.getElementById('chuyenBayNgay');
    if (inputNgay) {
        inputNgay.min = homNay;
        inputNgay.value = homNay;
        ngayBay = homNay;
    }

    // Load danh sách mặc định
    danhSachHienThi = mockFlights;
    hienThiKetQua(danhSachHienThi);
});

// ---------------------------------------------------------------
// HÀM: Xử lý submit form tìm kiếm
// ---------------------------------------------------------------
function timChuyenBay(event) {
    if (event) event.preventDefault();

    var tu = document.getElementById('chuyenBayTu').value;
    var den = document.getElementById('chuyenBayDen').value;
    var inputNgay = document.getElementById('chuyenBayNgay');
    ngayBay = inputNgay ? inputNgay.value : '';

    // Validation
    if (!ngayBay) {
        hienCanhBao('Vui lòng chọn Ngày Bay!');
        return;
    }
    if (tu !== '' && den !== '' && tu === den) {
        hienCanhBao('Điểm Đi và Điểm Đến không được trùng nhau!');
        return;
    }

    // Lọc kết quả
    var ketQua = mockFlights;

    if (tu !== '') {
        var ketQuaTam = [];
        for (var i = 0; i < ketQua.length; i++) {
            if (ketQua[i].from === tu) ketQuaTam.push(ketQua[i]);
        }
        ketQua = ketQuaTam;
    }

    if (den !== '') {
        var ketQuaTam2 = [];
        for (var j = 0; j < ketQua.length; j++) {
            if (ketQua[j].to === den) ketQuaTam2.push(ketQua[j]);
        }
        ketQua = ketQuaTam2;
    }

    danhSachHienThi = ketQua;
    hangLocHien = '';

    // Reset filter chips
    var chips = document.querySelectorAll('.filter-chip');
    for (var k = 0; k < chips.length; k++) {
        chips[k].classList.remove('active');
        if (chips[k].onclick.toString().indexOf("''") > -1) chips[k].classList.add('active');
    }

    hienThiKetQua(danhSachHienThi);
}

// ---------------------------------------------------------------
// HÀM: Lọc theo hãng bay
// ---------------------------------------------------------------
function locHang(phanTu, tenHang) {
    // Active chip
    var chips = document.querySelectorAll('.filter-chip');
    for (var i = 0; i < chips.length; i++) chips[i].classList.remove('active');
    phanTu.classList.add('active');

    hangLocHien = tenHang;

    var ketQua = [];
    for (var j = 0; j < danhSachHienThi.length; j++) {
        if (tenHang === '' || danhSachHienThi[j].airline === tenHang) {
            ketQua.push(danhSachHienThi[j]);
        }
    }

    hienThiKetQua(ketQua);
}

// ---------------------------------------------------------------
// HÀM: Hiển thị cảnh báo
// ---------------------------------------------------------------
function hienCanhBao(noiDung) {
    var container = document.getElementById('ketQuaChuyenBay');
    container.innerHTML = '<div class="alert alert-warning fw-600"><i class="bi bi-exclamation-triangle-fill me-2"></i>' + noiDung + '</div>';
}

// ---------------------------------------------------------------
// HÀM: Render danh sách chuyến bay
// ---------------------------------------------------------------
function hienThiKetQua(danhSach) {
    var container = document.getElementById('ketQuaChuyenBay');
    var elSoKQ = document.getElementById('so-ket-qua');

    if (elSoKQ) elSoKQ.innerText = 'Tìm thấy ' + danhSach.length + ' chuyến bay';

    if (!container) return;

    if (danhSach.length === 0) {
        container.innerHTML =
            '<div class="text-center py-5">' +
            '  <i class="bi bi-airplane text-white-50" style="font-size:3rem;opacity:0.3;"></i>' +
            '  <p class="text-white-50 mt-3">Không tìm thấy chuyến bay phù hợp.<br>Thử chọn tuyến khác hoặc bỏ bộ lọc.</p>' +
            '</div>';
        return;
    }

    var html = '';
    
    var isInRoot = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
    var prefix = isInRoot ? '' : '../';

    for (var i = 0; i < danhSach.length; i++) {
        var f = danhSach[i];
        var gioParts = f.time.split(' - ');
        var gioDi = gioParts[0] || '';
        var gioDen = gioParts[1] || '';

        // Tính thời gian bay
        var thoiGianBay = tinhThoiGianBay(gioDi, gioDen);

        // Huy hiệu hãng bay
        var mauHang = f.color || '#0d6efd';
        var tenVietTat = f.airline.replace('Vietnam Airlines','VNA').replace('Vietjet Air','VJ').replace('Bamboo Airways','QH');

        html += '<div class="ticket-card" style="animation: fadeInUp 0.4s ease both; animation-delay: ' + (i * 0.08) + 's;">';

        // Logo hãng - compact box
        html += '<div class="airline-logo-box" style="flex-shrink:0;">';
        if (f.logoUrl) {
            html += '<img src="' + prefix + f.logoUrl + '" alt="' + f.airline + '" onerror="this.style.display=\'none\';this.nextSibling.style.display=\'flex\';">';
            html += '<div style="display:none;width:100%;height:100%;background:' + mauHang + ';border-radius:8px;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:0.85rem;">' + tenVietTat + '</div>';
        } else {
            html += '<div style="width:100%;height:100%;background:' + mauHang + ';border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;">' + tenVietTat + '</div>';
        }
        html += '</div>';

        // Tên hãng – compact, không co giãn
        html += '<div style="flex-shrink:0; min-width:130px; max-width:150px;">';
        html +=   '<div class="fw-800 text-white" style="font-size:0.95rem;line-height:1.2;">' + f.airline + '</div>';
        html +=   '<span class="badge" style="background:' + mauHang + ';font-size:0.65rem;">' + f.code + '</span>';
        html +=   '<div class="text-white-50" style="font-size:0.72rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:140px;">' + (f.aircraft || '') + '</div>';
        html +=   '<span class="badge bg-success" style="font-size:0.62rem;">' + f.type + '</span>';
        html += '</div>';

        // Route – giãn ra lấp đầy
        html += '<div class="flight-route" style="flex:1; justify-content:center; gap:8px;">';
        html +=   '<div class="text-center">';
        html +=     '<div class="flight-city-code text-white">' + gioDi + '</div>';
        html +=     '<div class="text-white-50 small" style="white-space:nowrap;">' + (tenDiemDen(f.from) || f.from) + '</div>';
        html +=   '</div>';
        html +=   '<div class="flight-arrow mx-2 text-center">';
        html +=     '<div class="text-white-50" style="font-size:0.68rem;white-space:nowrap;">' + thoiGianBay + '</div>';
        html +=     '<div class="flight-arrow-line my-1"></div>';
        html +=     '<div class="badge" style="background:rgba(255,255,255,0.1);font-size:0.62rem;color:#ccc;white-space:nowrap;">' + (f.stops === 0 ? 'Bay thẳng' : f.stops + ' điểm dừng') + '</div>';
        html +=   '</div>';
        html +=   '<div class="text-center">';
        html +=     '<div class="flight-city-code text-white">' + gioDen + '</div>';
        html +=     '<div class="text-white-50 small" style="white-space:nowrap;">' + (tenDiemDen(f.to) || f.to) + '</div>';
        html +=   '</div>';
        html += '</div>';

        // Ngày bay
        html += '<div class="text-center d-none d-lg-block" style="flex-shrink:0;">';
        html +=   '<div class="text-white-50" style="font-size:0.7rem;">Ngày bay</div>';
        html +=   '<div class="text-white fw-700" style="font-size:0.82rem;white-space:nowrap;">' + dinhDangNgay(ngayBay) + '</div>';
        html += '</div>';

        // Giá + nút – cố định bên phải
        html += '<div class="text-end" style="flex-shrink:0; min-width:100px;">';
        html +=   '<div class="text-white-50" style="font-size:0.68rem;">Giá/người từ</div>';
        html +=   '<div class="fw-900 text-warning" style="font-size:1.5rem;line-height:1.1;">' + (f.price/1000000).toFixed(1) + 'M</div>';
        html +=   '<div class="text-white-50" style="font-size:0.72rem; margin-bottom:6px;">' + f.price.toLocaleString('vi-VN') + ' ₫</div>';
        html +=   '<button class="btn btn-sm btn-custom fw-700 px-3" onclick="moChiTietChuyenBay(\'' + f.id + '\')" style="white-space:nowrap;">';
        html +=     'Chọn Vé <i class="bi bi-arrow-right"></i>';
        html +=   '</button>';
        html += '</div>';

        html += '</div>';
    }

    // Thêm keyframes animation
    if (!document.getElementById('flight-keyframes')) {
        var style = document.createElement('style');
        style.id = 'flight-keyframes';
        style.innerText = '@keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }';
        document.head.appendChild(style);
    }

    container.innerHTML = html;
}

// ---------------------------------------------------------------
// HÀM: Lấy tên điểm đến từ mã IATA
// ---------------------------------------------------------------
function tenDiemDen(ma) {
    var banDo = {
        'SGN': 'Hồ Chí Minh', 'HAN': 'Hà Nội', 'DAD': 'Đà Nẵng',
        'PQC': 'Phú Quốc', 'CXR': 'Nha Trang', 'DLI': 'Đà Lạt'
    };
    return banDo[ma] || ma;
}

// ---------------------------------------------------------------
// HÀM: Tính thời gian bay
// ---------------------------------------------------------------
function tinhThoiGianBay(gioDi, gioDen) {
    try {
        var partDi = gioDi.split(':');
        var partDen = gioDen.split(':');
        var phutDi  = parseInt(partDi[0]) * 60 + parseInt(partDi[1]);
        var phutDen = parseInt(partDen[0]) * 60 + parseInt(partDen[1]);
        if (phutDen < phutDi) phutDen += 24 * 60;
        var chenh = phutDen - phutDi;
        var gio = Math.floor(chenh / 60);
        var phut = chenh % 60;
        return gio + 'h' + (phut > 0 ? phut + 'p' : '');
    } catch (e) {
        return '---';
    }
}

// ---------------------------------------------------------------
// HÀM: Mở modal chi tiết chuyến bay
// ---------------------------------------------------------------
function moChiTietChuyenBay(idChuyen) {
    chuyenBayDangChon = null;
    gheDangChon = null;

    for (var i = 0; i < mockFlights.length; i++) {
        if (mockFlights[i].id === idChuyen) {
            chuyenBayDangChon = mockFlights[i];
            break;
        }
    }
    if (!chuyenBayDangChon) return;

    var f = chuyenBayDangChon;
    var diemDenInfo = (typeof destinations !== 'undefined' && destinations[f.to]) || {
        name: tenDiemDen(f.to),
        img: 'img/Da-Nang.jpg',
        desc: 'Điểm đến tuyệt vời tại Việt Nam.'
    };

    var gioParts = f.time.split(' - ');
    
    var isInRoot = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
    var prefix = isInRoot ? '' : '../';

    document.getElementById('chiTietChuyenBayBody').innerHTML =
        '<div class="row g-4">' +
        '  <div class="col-md-5">' +
        '    <div class="position-relative h-100" style="min-height:280px;">' +
        '      <img src="' + prefix + diemDenInfo.img + '" class="img-fluid rounded-3 w-100" style="height:100%; position:absolute; object-fit:cover;">' +
        '      <div style="position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,0.8),transparent);border-radius:12px;"></div>' +
        '      <div style="position:absolute;bottom:20px;left:20px;right:20px;">' +
        '        <h4 class="fw-900 text-white mb-2">' + diemDenInfo.name + '</h4>' +
        '        <p class="text-white-50 small mb-0" style="display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;">' + diemDenInfo.desc + '</p>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '  <div class="col-md-7">' +
        '    <div class="p-4 rounded-3 h-100" style="background:rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);">' +
        '      <div class="d-flex align-items-center justify-content-between mb-4 border-bottom border-secondary pb-3">' +
        '        <img src="' + prefix + 'img/' + f.airline.replace(/\s+/g, '-') + '.jpg" style="height:45px; border-radius:6px; background:#fff; padding:5px; object-fit:contain;" alt="' + f.airline + '" onerror="this.style.display=\'none\'">' +
        '        <div class="text-end">' +
        '           <div class="fw-800 text-warning fs-5">' + (f.price).toLocaleString('vi-VN') + ' ₫</div>' +
        '           <div class="text-white-50 small">Phổ thông / khách</div>' +
        '        </div>' +
        '      </div>' +
        '      <div class="row text-center mb-4 position-relative">' +
        '        <div class="col-4">' +
        '           <div class="fw-800 text-white fs-3">' + (gioParts[0]||'--:--') + '</div>' +
        '           <div class="text-white-50 small">' + f.from + '</div>' +
        '        </div>' +
        '        <div class="col-4 d-flex flex-column justify-content-center align-items-center">' +
        '           <div class="text-info small mb-1"><i class="bi bi-airplane-fill fs-5"></i></div>' +
        '           <div style="height:2px; width:100%; background:rgba(255,255,255,0.1); border-radius:2px;"></div>' +
        '           <div class="text-white-50 mt-2" style="font-size:0.75rem;">Bay thẳng</div>' +
        '        </div>' +
        '        <div class="col-4">' +
        '           <div class="fw-800 text-white fs-3">' + (gioParts[1]||'--:--') + '</div>' +
        '           <div class="text-white-50 small">' + f.to + '</div>' +
        '        </div>' +
        '      </div>' +
        '      <div class="row g-2">' +
        '    <div class="mt-3 p-3 rounded" style="background:rgba(243,156,18,0.1);border:1px solid rgba(243,156,18,0.3);">' +
        '      <div class="text-white-50 small">Giá mỗi người từ</div>' +
        '      <div class="fw-900 text-warning" style="font-size:1.8rem;">' + f.price.toLocaleString('vi-VN') + ' ₫</div>' +
        '    </div>' +
        '  </div>' +
        '</div>';

    var modal = new bootstrap.Modal(document.getElementById('modalChiTietChuyenBay'));
    modal.show();
}

// ---------------------------------------------------------------
// HÀM: Tiếp tục sang bước chọn ghế
// ---------------------------------------------------------------
function tiepTucChonGhe() {
    var modalDT = bootstrap.Modal.getInstance(document.getElementById('modalChiTietChuyenBay'));
    if (modalDT) modalDT.hide();

    setTimeout(function() {
        moModalChonGhe(chuyenBayDangChon.id);
    }, 400);
}

// ---------------------------------------------------------------
// HÀM: Mở modal chọn ghế
// ---------------------------------------------------------------
function moModalChonGhe(idChuyen) {
    if (!chuyenBayDangChon) {
        for (var i = 0; i < mockFlights.length; i++) {
            if (mockFlights[i].id === idChuyen) {
                chuyenBayDangChon = mockFlights[i];
                break;
            }
        }
    }
    if (!chuyenBayDangChon) return;

    gheDangChon = null;

    // Cập nhật thông tin modal
    var f = chuyenBayDangChon;
    var gioParts = f.time.split(' - ');
    document.getElementById('thongTinMayBayModal').innerHTML =
        f.airline + ' · ' + f.code + ' · ' + (gioParts[0]||'') + ' → ' + (gioParts[1]||'') +
        ' · ' + f.from + ' → ' + f.to + ' · ' + dinhDangNgay(ngayBay);

    // Reset nút xác nhận
    var nutXN = document.getElementById('xacNhanMayBay');
    if (nutXN) {
        nutXN.disabled = true;
        nutXN.innerText = 'Xác Nhận Mua';
    }
    document.getElementById('thongTinGheMayBayDaChon').innerText = 'Chưa chọn ghế';

    // Vẽ sơ đồ máy bay
    veDoHoaMayBay();

    var modal = new bootstrap.Modal(document.getElementById('modalGheMayBay'));
    modal.show();
}

// ---------------------------------------------------------------
// HÀM: Vẽ sơ đồ ghế máy bay 2D (cấu hình A320: 3-3, 30 hàng)
// ---------------------------------------------------------------
function veDoHoaMayBay() {
    var container = document.getElementById('soDoGheMayBay');
    if (!container) return;

    // Ghế đã đặt ngẫu nhiên (cố định để demo)
    var gheDaDat = ['1A','1B','3C','5E','7A','9B','12C','14F','18D','22A','25C'];

    var html = '';

    // Mũi máy bay
    html += '<div style="text-align:center;padding:10px;background:linear-gradient(180deg,#3498db,#1a5276);border-radius:50% 50% 0 0/30% 30% 0 0;color:#fff;font-size:1.5rem;margin-bottom:6px;">';
    html += '<i class="bi bi-airplane-fill"></i></div>';

    // HẠNG THƯƠNG GIA (hàng 1-4, cấu hình 2-2)
    html += '<div class="plane-class-label" style="color:#e67e22;border-color:#e67e22;">✨ Hạng Thương Gia – Business Class</div>';
    var chuCot = ['A','B','','C','D'];
    for (var hang = 1; hang <= 4; hang++) {
        html += '<div class="seat-row">';
        html += '<span class="row-num">' + hang + '</span>';
        html += '<div class="seat-grp">';
        for (var ci = 0; ci < chuCot.length; ci++) {
            var cotKy = chuCot[ci];
            if (cotKy === '') {
                html += '<div class="seat-aisle"></div>';
                continue;
            }
            var maGhe = hang + cotKy;
            var laDaDat = gheDaDat.indexOf(maGhe) > -1;
            var cls = 'plane-seat business' + (laDaDat ? ' booked' : '');
            html += '<div class="' + cls + '" onclick="chonGheMayBay(this,\'' + maGhe + '\',\'business\')">' + maGhe + '</div>';
        }
        html += '</div>';
        html += '</div>';
    }

    // Cánh máy bay
    html += '<div class="aircraft-wing"></div>';

    // HẠNG PHỔ THÔNG (hàng 5-30, cấu hình 3-3)
    html += '<div class="plane-class-label" style="margin-top:10px;">🪑 Hạng Phổ Thông – Economy Class</div>';
    var chuCotEco = ['A','B','C','','D','E','F'];
    for (var hang2 = 5; hang2 <= 30; hang2++) {
        html += '<div class="seat-row">';
        html += '<span class="row-num">' + hang2 + '</span>';
        html += '<div class="seat-grp">';
        for (var ci2 = 0; ci2 < chuCotEco.length; ci2++) {
            var cotKy2 = chuCotEco[ci2];
            if (cotKy2 === '') {
                html += '<div class="seat-aisle"></div>';
                continue;
            }
            var maGhe2 = hang2 + cotKy2;
            var laDaDat2 = gheDaDat.indexOf(maGhe2) > -1;
            var cls2 = 'plane-seat economy' + (laDaDat2 ? ' booked' : '');
            html += '<div class="' + cls2 + '" onclick="chonGheMayBay(this,\'' + maGhe2 + '\',\'economy\')">' + maGhe2 + '</div>';
        }
        html += '</div>';
        html += '</div>';
    }

    // Đuôi máy bay
    html += '<div style="height:20px;background:linear-gradient(135deg,#3498db,#1a5276);border-radius:0 0 8px 8px;margin-top:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.65rem;font-weight:700;">Đuôi Tàu Bay</div>';

    container.innerHTML = html;
}

// ---------------------------------------------------------------
// HÀM: Chọn ghế máy bay
// ---------------------------------------------------------------
function chonGheMayBay(phanTu, maGhe, hangGhe) {
    if (phanTu.classList.contains('booked')) {
        alert('Ghế ' + maGhe + ' đã được đặt! Vui lòng chọn ghế khác.');
        return;
    }

    // Bỏ chọn tất cả ghế đã chọn trước
    var tatCaGhe = document.querySelectorAll('.plane-seat.selected');
    for (var i = 0; i < tatCaGhe.length; i++) {
        tatCaGhe[i].classList.remove('selected');
    }

    phanTu.classList.add('selected');

    // Tính giá
    var giaBuoc = chuyenBayDangChon.price;
    var giaPhuThem = 0;
    var tenHang = '';

    if (hangGhe === 'business') {
        giaPhuThem = 800000;
        tenHang = 'Thương Gia';
    } else {
        tenHang = 'Phổ Thông';
    }

    var giaFinal = giaBuoc + giaPhuThem;
    gheDangChon = { maGhe: maGhe, hangGhe: tenHang, gia: giaFinal };

    // Cập nhật thông tin
    var elInfo = document.getElementById('thongTinGheMayBayDaChon');
    if (elInfo) {
        elInfo.innerHTML = '<span class="text-white fw-700">Ghế ' + maGhe + '</span>' +
            ' <span class="badge bg-secondary ms-1">' + tenHang + '</span>' +
            ' <span class="text-warning ms-2 fw-700">' + giaFinal.toLocaleString('vi-VN') + ' ₫</span>';
    }

    var nutXN = document.getElementById('xacNhanMayBay');
    if (nutXN) {
        nutXN.disabled = false;
        nutXN.innerHTML = '<i class="bi bi-check2-circle me-1"></i>Xác Nhận – Ghế ' + maGhe;
    }
}

// ---------------------------------------------------------------
// HÀM: Xác nhận chọn ghế và thêm vào giỏ hàng
// ---------------------------------------------------------------
function xacNhanChonGhe() {
    if (!gheDangChon || !chuyenBayDangChon) return;

    var f = chuyenBayDangChon;
    var chiTiet = 'Ghế ' + gheDangChon.maGhe + ' · ' + gheDangChon.hangGhe +
                  ' · Chuyến ' + f.code + ' · ' + dinhDangNgay(ngayBay);

    if (typeof addToCart === 'function') {
        addToCart(
            'Vé Máy Bay – ' + f.airline,
            f.from + ' → ' + f.to,
            gheDangChon.gia,
            chiTiet,
            'flight',
            f.logoUrl || ''
        );
    }

    var modal = bootstrap.Modal.getInstance(document.getElementById('modalGheMayBay'));
    if (modal) modal.hide();
}
