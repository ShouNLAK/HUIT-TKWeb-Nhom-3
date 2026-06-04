// =============================================================
// VIET TRAVEL HUB - js/bus.js (Logic trang Xe Khách)
// Sơ đồ xe giường nằm 2 tầng, 34 giường
// =============================================================

// Biến trạng thái
var ngayDiXe = '';
var xeDangChon = null;
var giuongXeDangChon = null;

document.addEventListener("DOMContentLoaded", function() {
    var homNay = new Date().toISOString().split('T')[0];
    var inputNgay = document.getElementById('xeKhachNgay');
    if (inputNgay) {
        inputNgay.min = homNay;
        inputNgay.value = homNay;
        ngayDiXe = homNay;
    }
    hienThiDanhSachXe(mockBuses);
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
        document.getElementById('ketQuaXeKhach').innerHTML =
            '<div class="alert alert-warning fw-600"><i class="bi bi-exclamation-triangle-fill me-2"></i>Vui lòng chọn Ngày Đi!</div>';
        return;
    }
    if (tu !== '' && den !== '' && tu === den) {
        document.getElementById('ketQuaXeKhach').innerHTML =
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

    hienThiDanhSachXe(ketQua);
}

// ---------------------------------------------------------------
// HÀM: Render danh sách xe khách
// ---------------------------------------------------------------
function hienThiDanhSachXe(danhSach) {
    var container = document.getElementById('ketQuaXeKhach');
    if (!container) return;

    if (danhSach.length === 0) {
        container.innerHTML = '<div class="text-center py-5"><i class="bi bi-bus-front text-danger" style="font-size:3rem;opacity:0.3;"></i><p class="text-white-50 mt-3">Không có chuyến xe phù hợp.</p></div>';
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

        html += '<div class="ticket-card bus" style="animation:fadeInUp 0.4s ease both;animation-delay:' + (i * 0.08) + 's;">';

        // Logo xe
        html +=   '<div class="text-center">';
        html +=     '<div style="width:68px;height:68px;background:' + mau + ';border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:0.75rem;line-height:1.2;">';
        html +=       '<i class="bi bi-bus-front-fill fs-3"></i>';
        html +=     '</div>';
        html +=     '<div class="fw-700 text-white mt-1 small">' + b.company.split(' ')[0] + '</div>';
        html +=   '</div>';

        // Thông tin
        html +=   '<div style="flex:1;">';
        html +=     '<div class="fw-700 text-white mb-1">' + b.name + '</div>';
        html +=     '<div class="d-flex align-items-center gap-3 mb-2">';
        html +=       '<div class="text-center">';
        html +=         '<div class="fw-900 text-white fs-4">' + (gioParts[0] || '') + '</div>';
        html +=         '<div class="text-white-50 small">' + tenDiemXe(b.from) + '</div>';
        html +=       '</div>';
        html +=       '<div class="text-center flex-1">';
        html +=         '<div class="text-white-50 small">' + (b.duration || '---') + '</div>';
        html +=         '<div style="height:2px;background:linear-gradient(90deg,#e74c3c,#c0392b);border-radius:1px;margin:4px 0;position:relative;">';
        html +=           '<i class="bi bi-bus-front-fill text-danger position-absolute" style="right:-2px;top:-7px;font-size:0.65rem;"></i>';
        html +=         '</div>';
        html +=         '<div class="badge" style="background:rgba(231,76,60,0.15);color:#e74c3c;font-size:0.68rem;">Thẳng</div>';
        html +=       '</div>';
        html +=       '<div class="text-center">';
        html +=         '<div class="fw-900 text-white fs-4">' + (gioParts[1] || '') + '</div>';
        html +=         '<div class="text-white-50 small">' + tenDiemXe(b.to) + '</div>';
        html +=       '</div>';
        html +=     '</div>';
        // Tiện ích
        html +=     '<div class="d-flex flex-wrap gap-1">';
        var tienIch = (b.amenities || ['Giường nằm', 'WiFi', 'Điều hòa']);
        for (var ti = 0; ti < tienIch.length; ti++) {
            html += '<span class="badge" style="background:rgba(231,76,60,0.12);color:#e74c3c;font-size:0.68rem;">' + tienIch[ti] + '</span>';
        }
        html +=     '</div>';
        html +=   '</div>';

        // Số chỗ trống + giá + nút
        html +=   '<div class="text-end">';
        html +=     '<div class="text-white-50 small">Giường nằm</div>';
        html +=     '<div class="fw-900 text-warning" style="font-size:1.5rem;">' + (b.price/1000).toFixed(0) + 'K</div>';
        html +=     '<div class="text-white-50 small mb-1">' + b.price.toLocaleString('vi-VN') + ' ₫</div>';
        html +=     '<div class="badge bg-success mb-2" style="font-size:0.7rem;">' + (b.available || '20') + ' chỗ trống</div>';
        html +=     '<br>';
        html +=     '<button class="btn btn-sm fw-700" style="background:linear-gradient(135deg,#e74c3c,#c0392b);color:#fff;border-radius:50px;padding:6px 18px;border:none;" onclick="moModalChonGiuong(\'' + b.id + '\')">';
        html +=       'Chọn Giường <i class="bi bi-arrow-right"></i>';
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
    document.getElementById('thongTinGheXe').innerHTML =
        b.company + ' · ' + b.name + ' · ' + (gioParts[0]||'') + ' → ' + (gioParts[1]||'') + ' · ' + dinhDangNgay(ngayDiXe);

    var nutXN = document.getElementById('xacNhanXeKhach');
    if (nutXN) { nutXN.disabled = true; nutXN.innerText = 'Xác Nhận Đặt'; }
    document.getElementById('thongTinGheXeDaChon').innerText = 'Chưa chọn giường';

    // Vẽ sơ đồ tầng dưới và tầng trên
    veSoDoXe('lower', document.getElementById('xeKhachTangDuoi'));
    veSoDoXe('upper', document.getElementById('xeKhachTangTren'));

    var modal = new bootstrap.Modal(document.getElementById('modalGheXeKhach'));
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

    // Vẽ 9 hàng (mỗi hàng 2 giường: trái và phải)
    for (var hang = 1; hang <= 9; hang++) {
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
        html +=   '<div class="bus-aisle"><i class="bi bi-three-dots-vertical text-secondary"></i></div>';
        // Giường phải
        html +=   '<div class="bus-bed' + (daDatPhai ? ' booked' : '') + '" onclick="chonGiuongXe(this,\'' + maPhai + '\',\'' + tang + '\')">';
        html +=     '<span>' + maPhai + '</span>';
        html +=   '</div>';
        html += '</div>';
    }

    // Hàng cuối: 1 giường lẻ ở giữa
    var soGuoi = 19;
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

    document.getElementById('thongTinGheXeDaChon').innerHTML =
        'Giường <strong class="text-white">' + maGiuong + '</strong>' +
        ' <span class="badge bg-danger ms-1">' + tenTang + '</span>' +
        ' <span class="text-warning ms-2 fw-700">' + gia.toLocaleString('vi-VN') + ' ₫</span>';

    var nutXN = document.getElementById('xacNhanXeKhach');
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

    var modal = bootstrap.Modal.getInstance(document.getElementById('modalGheXeKhach'));
    if (modal) modal.hide();
}
