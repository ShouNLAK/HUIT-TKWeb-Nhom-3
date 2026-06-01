// =============================================================
// VIET TRAVEL HUB - js/cart.js (Giỏ Hàng & Thanh Toán)
// Dùng sessionStorage: vth_gio_hang (giỏ hiện tại)
// Dùng localStorage: viettravel_lichsu (lịch sử đã mua)
// =============================================================

// ---------------------------------------------------------------
// HÀM: Thêm vé vào giỏ hàng (dùng ở tất cả trang)
// Tham số mới: loai = 'flight'|'train'|'bus', logoUrl = ảnh hãng
// ---------------------------------------------------------------
function addToCart(loaiDichVu, tuyen, gia, chiTiet, loai, logoUrl) {
    var gioHang = JSON.parse(sessionStorage.getItem('vth_gio_hang')) || [];

    var veNhap = {
        id: 'v' + Date.now(),
        loaiDichVu: loaiDichVu,
        tuyen: tuyen,
        gia: gia,
        chiTiet: chiTiet,
        loai: loai || 'flight',
        logoUrl: logoUrl || '',
        thoiGianThem: new Date().toLocaleString('vi-VN')
    };

    gioHang.push(veNhap);
    sessionStorage.setItem('vth_gio_hang', JSON.stringify(gioHang));

    // Cập nhật counter trên navbar
    capNhatSoLuongGioHang();

    // Thông báo cho người dùng
    var ten = tuyen || loaiDichVu;
    hienToastGioHang('Đã thêm vé <strong>' + ten + '</strong> vào giỏ hàng!');
}

// ---------------------------------------------------------------
// HÀM: Hiện toast thông báo thêm vào giỏ
// ---------------------------------------------------------------
function hienToastGioHang(noiDung) {
    // Tạo toast container nếu chưa có
    var toastContainer = document.getElementById('toast-global-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-global-container';
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }

    // Tạo toast mới
    var toastId = 'toast-' + Date.now();
    var toastEl = document.createElement('div');
    toastEl.id = toastId;
    toastEl.className = 'toast align-items-center text-white border-0';
    toastEl.style.background = 'linear-gradient(135deg,#2ecc71,#27ae60)';
    toastEl.setAttribute('role', 'alert');
    toastEl.innerHTML =
        '<div class="d-flex">' +
        '  <div class="toast-body fw-600">' +
        '    <i class="bi bi-cart-check-fill me-2"></i>' + noiDung +
        '    <div class="mt-1"><a href="cart.html" class="text-white fw-700 text-decoration-underline small" onclick="chuyenTrang(event,\'cart.html\')">Xem Giỏ Hàng →</a></div>' +
        '  </div>' +
        '  <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>' +
        '</div>';

    toastContainer.appendChild(toastEl);
    var toast = new bootstrap.Toast(toastEl, { delay: 4000 });
    toast.show();

    // Xóa DOM sau khi ẩn
    toastEl.addEventListener('hidden.bs.toast', function() {
        toastEl.remove();
    });
}

// ---------------------------------------------------------------
// CÁC HÀM CHO TRANG cart.html
// ---------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    // Chỉ chạy code giỏ hàng nếu đang ở trang cart.html
    if (document.getElementById('gio-hang-container')) {
        hienThiGioHang();
    }
});

// ---------------------------------------------------------------
// HÀM: Hiển thị toàn bộ giỏ hàng
// ---------------------------------------------------------------
function hienThiGioHang() {
    var gioHang = JSON.parse(sessionStorage.getItem('vth_gio_hang')) || [];
    var container = document.getElementById('gio-hang-container');
    var elTong = document.getElementById('tong-tien-gioHang');
    var elRong = document.getElementById('empty-cart-msg');
    var elKhungDat = document.getElementById('khung-dat-hang');
    var elSoVe = document.getElementById('so-ve-text');

    if (!container) return;

    // Cập nhật số vé
    if (elSoVe) elSoVe.innerText = gioHang.length + ' vé';

    if (gioHang.length === 0) {
        container.innerHTML = '';
        if (elRong) elRong.style.display = 'block';
        if (elKhungDat) elKhungDat.style.display = 'none';
        if (elTong) elTong.innerText = '0 ₫';
        return;
    }

    if (elRong) elRong.style.display = 'none';
    if (elKhungDat) elKhungDat.style.display = 'block';

    var tongTien = 0;
    var html = '';

    for (var i = 0; i < gioHang.length; i++) {
        var ve = gioHang[i];
        tongTien += ve.gia || 0;

        // Biểu tượng loại vé
        var icon = 'bi-airplane-fill';
        var mauNen = 'linear-gradient(135deg,#0d6efd,#00c6ff)';
        var tenLoai = 'Máy Bay';
        if (ve.loai === 'train') { icon = 'bi-train-front-fill'; mauNen = 'linear-gradient(135deg,#2ecc71,#27ae60)'; tenLoai = 'Tàu Hỏa'; }
        if (ve.loai === 'bus')   { icon = 'bi-bus-front-fill'; mauNen = 'linear-gradient(135deg,#e74c3c,#c0392b)'; tenLoai = 'Xe Khách'; }

        html += '<div class="cart-item-card" id="ve-' + ve.id + '">';
        html +=   '<div class="d-flex align-items-start gap-3 flex-wrap">';
        // Icon loại vé
        html +=     '<div class="cart-ticket-type-icon" style="background:' + mauNen + ';">';
        html +=       '<i class="bi ' + icon + ' text-white"></i>';
        html +=     '</div>';
        // Nội dung
        html +=     '<div style="flex:1;min-width:0;">';
        html +=       '<div class="d-flex align-items-center gap-2 mb-1 flex-wrap">';
        html +=         '<span class="badge" style="background:' + mauNen + ';font-size:0.72rem;">' + tenLoai + '</span>';
        html +=         '<span class="fw-800 text-white">' + ve.loaiDichVu + '</span>';
        html +=       '</div>';
        html +=       '<div class="fw-700 text-warning fs-5 mb-1">' + ve.tuyen + '</div>';
        html +=       '<div class="text-white-50 small mb-1"><i class="bi bi-info-circle me-1"></i>' + ve.chiTiet + '</div>';
        html +=       '<div class="text-white-50 small"><i class="bi bi-clock me-1"></i>Thêm vào lúc: ' + ve.thoiGianThem + '</div>';
        html +=     '</div>';
        // Giá + xóa
        html +=     '<div class="text-end">';
        html +=       '<div class="fw-900 text-warning" style="font-size:1.4rem;">' + (ve.gia || 0).toLocaleString('vi-VN') + ' ₫</div>';
        html +=       '<button class="btn btn-sm btn-outline-danger mt-2 rounded-pill" onclick="xoaVeKhoiGio(\'' + ve.id + '\')">';
        html +=         '<i class="bi bi-trash3"></i> Xóa';
        html +=       '</button>';
        html +=     '</div>';
        html +=   '</div>';
        html += '</div>';
    }

    container.innerHTML = html;

    // Cập nhật tổng tiền
    if (elTong) elTong.innerText = tongTien.toLocaleString('vi-VN') + ' ₫';

    // Cập nhật bảng tóm tắt
    var elTomTat = document.getElementById('tom-tat-body');
    if (elTomTat) {
        var htmlTomTat = '';
        for (var j = 0; j < gioHang.length; j++) {
            var ve2 = gioHang[j];
            htmlTomTat += '<tr>';
            htmlTomTat += '  <td class="text-white-50 small pe-2">' + ve2.loaiDichVu + '<br><small>' + ve2.tuyen + '</small></td>';
            htmlTomTat += '  <td class="text-end text-warning fw-700" style="white-space:nowrap;">' + (ve2.gia || 0).toLocaleString('vi-VN') + ' ₫</td>';
            htmlTomTat += '</tr>';
        }
        elTomTat.innerHTML = htmlTomTat;
    }

    var elTongTomTat = document.getElementById('tong-thanh-toan');
    if (elTongTomTat) {
        elTongTomTat.innerText = tongTien.toLocaleString('vi-VN') + ' ₫';
    }
}

// ---------------------------------------------------------------
// HÀM: Xóa 1 vé khỏi giỏ hàng
// ---------------------------------------------------------------
function xoaVeKhoiGio(idVe) {
    var gioHang = JSON.parse(sessionStorage.getItem('vth_gio_hang')) || [];
    var gioMoi = [];

    for (var i = 0; i < gioHang.length; i++) {
        if (gioHang[i].id !== idVe) gioMoi.push(gioHang[i]);
    }

    sessionStorage.setItem('vth_gio_hang', JSON.stringify(gioMoi));
    capNhatSoLuongGioHang();
    hienThiGioHang();
}

// ---------------------------------------------------------------
// HÀM: Hiển thị lỗi inline dưới input (giỏ hàng)
// ---------------------------------------------------------------
function hienLoiCart(inputEl, noiDung) {
    if (!inputEl) return;
    inputEl.style.borderColor = '#e74c3c';
    inputEl.style.boxShadow = '0 0 0 3px rgba(231,76,60,0.25)';

    var msg = document.createElement('div');
    msg.className = 'cart-err-msg';
    msg.style.cssText = 'color:#e74c3c;font-size:0.78rem;margin-top:4px;';
    msg.innerText = '⚠ ' + noiDung;
    inputEl.parentElement.appendChild(msg);

    // Xóa lỗi khi người dùng bắt đầu gõ
    inputEl.addEventListener('input', function xoaBorder() {
        inputEl.style.borderColor = '';
        inputEl.style.boxShadow = '';
        if (msg.parentElement) msg.parentElement.removeChild(msg);
        inputEl.removeEventListener('input', xoaBorder);
    });
}

// ---------------------------------------------------------------
// HÀM: Xóa toàn bộ giỏ hàng
// ---------------------------------------------------------------
function xoaHetGio() {
    var xacNhan = confirm('Bạn có muốn xóa tất cả vé trong giỏ hàng?');
    if (!xacNhan) return;

    sessionStorage.removeItem('vth_gio_hang');
    capNhatSoLuongGioHang();
    hienThiGioHang();
}

// ---------------------------------------------------------------
// HÀM: Đặt hàng (thanh toán)
// ---------------------------------------------------------------
function datHang() {
    var gioHang = JSON.parse(sessionStorage.getItem('vth_gio_hang')) || [];
    if (gioHang.length === 0) {
        alert('Giỏ hàng trống! Vui lòng thêm vé trước.');
        return;
    }

    // Lấy giá trị từ form
    var inHoTen = document.getElementById('hk-hoten');
    var inSdt   = document.getElementById('hk-sdt');
    var inEmail = document.getElementById('hk-email');
    var inCmnd  = document.getElementById('hk-cmnd');

    var hoTen = inHoTen ? inHoTen.value.trim() : '';
    var sdt   = inSdt   ? inSdt.value.trim()   : '';
    var email = inEmail ? inEmail.value.trim()  : '';
    var cmnd  = inCmnd  ? inCmnd.value.trim()   : '';

    // Reset border lỗi cũ
    var allInputs = [inHoTen, inSdt, inEmail, inCmnd];
    for (var x = 0; x < allInputs.length; x++) {
        if (allInputs[x]) { allInputs[x].style.borderColor = ''; allInputs[x].style.boxShadow = ''; }
    }
    var allErrMsg = document.querySelectorAll('.cart-err-msg');
    for (var xe = 0; xe < allErrMsg.length; xe++) { allErrMsg[xe].remove(); }

    // Validate từng trường
    var coLoi = false;

    if (!hoTen || hoTen.length < 2) {
        hienLoiCart(inHoTen, 'Vui lòng nhập Họ và Tên (ít nhất 2 ký tự)!');
        coLoi = true;
    }

    // Kiểm tra SĐT Việt Nam: bắt đầu 0 hoặc +84, 9-11 số
    var sdtSo = sdt.replace(/[^0-9]/g, '');
    if (!sdt || sdtSo.length < 9 || sdtSo.length > 11) {
        hienLoiCart(inSdt, 'Số điện thoại không hợp lệ (9-11 chữ số)!');
        coLoi = true;
    }

    // Kiểm tra email
    if (!email || email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        hienLoiCart(inEmail, 'Email không hợp lệ! (phải có @ và domain)');
        coLoi = true;
    }

    // Kiểm tra CCCD: 9 hoặc 12 số
    var cmndSo = cmnd.replace(/[^0-9]/g, '');
    if (!cmnd || (cmndSo.length !== 9 && cmndSo.length !== 12)) {
        hienLoiCart(inCmnd, 'CCCD/CMND phải là 9 số (CMND cũ) hoặc 12 số (CCCD mới)!');
        coLoi = true;
    }

    if (coLoi) {
        // Scroll lên form
        var formEl = document.getElementById('hk-hoten');
        if (formEl) formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    // Tính tổng tiền
    var tongTien = 0;
    for (var i = 0; i < gioHang.length; i++) {
        tongTien += gioHang[i].gia || 0;
    }

    // Tạo mã đơn hàng
    var maDon = 'VTH' + Date.now().toString().slice(-8).toUpperCase();
    var ngayMua = new Date().toLocaleString('vi-VN');

    // Lưu lịch sử vào localStorage
    var lichSu = JSON.parse(localStorage.getItem('viettravel_lichsu')) || [];
    var donMoi = {
        maDon: maDon,
        ngayMua: ngayMua,
        danhSachVe: gioHang,
        tongTien: tongTien,
        hanhKhach: { hoTen: hoTen, sdt: sdt, email: email, cmnd: cmnd }
    };
    lichSu.push(donMoi);
    localStorage.setItem('viettravel_lichsu', JSON.stringify(lichSu));

    // Xóa giỏ hàng phiên
    sessionStorage.removeItem('vth_gio_hang');
    capNhatSoLuongGioHang();

    // Mở modal thành công
    moModalThanhCong(maDon, tongTien, gioHang, hoTen);
}

// ---------------------------------------------------------------
// HÀM: Hiển thị modal đặt hàng thành công
// ---------------------------------------------------------------
function moModalThanhCong(maDon, tongTien, danhSachVe, hoTen) {
    var modalEl = document.getElementById('modal-thanh-cong');
    if (!modalEl) return;

    var bodyEl = document.getElementById('modal-success-body');
    if (bodyEl) {
        var htmlVe = '';
        for (var i = 0; i < danhSachVe.length; i++) {
            var ve = danhSachVe[i];
            htmlVe += '<div class="d-flex justify-content-between py-2 border-bottom" style="border-color:rgba(255,255,255,0.1)!important;">';
            htmlVe += '  <span class="text-white-50 small">' + ve.loaiDichVu + ' – ' + ve.tuyen + '</span>';
            htmlVe += '  <span class="text-warning fw-700 small">' + (ve.gia||0).toLocaleString('vi-VN') + ' ₫</span>';
            htmlVe += '</div>';
        }

        bodyEl.innerHTML =
            '<div class="text-center mb-4">' +
            '  <div style="width:80px;height:80px;background:linear-gradient(135deg,#2ecc71,#27ae60);border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;">' +
            '    <i class="bi bi-check-lg text-white" style="font-size:2.5rem;"></i>' +
            '  </div>' +
            '  <h4 class="fw-800 text-white">Đặt Vé Thành Công!</h4>' +
            '  <p class="text-white-50">Xin chào <strong class="text-warning">' + hoTen + '</strong>!</p>' +
            '  <div class="p-3 rounded mb-3" style="background:rgba(46,204,113,0.1);border:1px solid rgba(46,204,113,0.3);">' +
            '    <div class="text-white-50 small">Mã Đơn Hàng</div>' +
            '    <div class="fw-900 text-success" style="font-size:1.5rem;letter-spacing:2px;">' + maDon + '</div>' +
            '  </div>' +
            '</div>' +
            '<div class="mb-3">' + htmlVe + '</div>' +
            '<div class="d-flex justify-content-between p-3 rounded" style="background:rgba(255,255,255,0.06);">' +
            '  <span class="fw-700 text-white">Tổng Thanh Toán:</span>' +
            '  <span class="fw-900 text-warning fs-5">' + tongTien.toLocaleString('vi-VN') + ' ₫</span>' +
            '</div>' +
            '<p class="text-white-50 small text-center mt-3 mb-0">Vé đã được lưu vào lịch sử. Vui lòng chụp màn hình hoặc lưu mã đơn hàng.</p>';
    }

    var modal = new bootstrap.Modal(modalEl);
    modal.show();

    // Refresh giỏ hàng UI
    hienThiGioHang();
}
