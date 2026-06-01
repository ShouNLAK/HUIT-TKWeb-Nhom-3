// =============================================================
// VIET TRAVEL HUB - js/auth.js
// Hệ thống xác thực & phân quyền người dùng
// Dùng localStorage lưu danh sách tài khoản
// Dùng sessionStorage lưu phiên đăng nhập hiện tại
// =============================================================

// ---------------------------------------------------------------
// CẤU TRÚC DỮ LIỆU USER (localStorage key: 'vth_users')
// [{ id, hoTen, email, matKhau, vaiTro: 'user'|'admin', ngayTao }]
// ---------------------------------------------------------------

// Khởi tạo tài khoản mặc định nếu chưa có
(function khoiTaoDuLieuMacDinh() {
    var danhSachUser = JSON.parse(localStorage.getItem('vth_users')) || [];

    // Nếu chưa có tài khoản nào, thêm tài khoản mặc định
    if (danhSachUser.length === 0) {
        var userMacDinh = [
            {
                id: 'u001',
                hoTen: 'Quản Trị Viên',
                email: 'admin@vietravelhub.vn',
                matKhau: 'admin123',
                vaiTro: 'admin',
                ngayTao: '01/01/2024'
            },
            {
                id: 'u002',
                hoTen: 'Nguyễn Văn An',
                email: 'user@vietravelhub.vn',
                matKhau: 'user123',
                vaiTro: 'user',
                ngayTao: '01/01/2024'
            }
        ];
        localStorage.setItem('vth_users', JSON.stringify(userMacDinh));
    }
})();

// ---------------------------------------------------------------
// HÀM: Lấy user đang đăng nhập từ sessionStorage
// ---------------------------------------------------------------
function layUserHienTai() {
    var data = sessionStorage.getItem('vth_current_user');
    if (!data) return null;
    return JSON.parse(data);
}

// ---------------------------------------------------------------
// HÀM: Kiểm tra đã đăng nhập chưa
// ---------------------------------------------------------------
function daoDangNhap() {
    return layUserHienTai() !== null;
}

// ---------------------------------------------------------------
// HÀM: Kiểm tra có phải admin không
// ---------------------------------------------------------------
function laAdmin() {
    var user = layUserHienTai();
    return user !== null && user.vaiTro === 'admin';
}

// ---------------------------------------------------------------
// HÀM: Đăng nhập
// Trả về: { thanhCong: true/false, thongBao: string }
// ---------------------------------------------------------------
function dangNhap(email, matKhau) {
    var danhSachUser = JSON.parse(localStorage.getItem('vth_users')) || [];

    // Tìm user theo email + mật khẩu
    var userTimThay = null;
    for (var i = 0; i < danhSachUser.length; i++) {
        if (danhSachUser[i].email === email && danhSachUser[i].matKhau === matKhau) {
            userTimThay = danhSachUser[i];
            break;
        }
    }

    if (!userTimThay) {
        return { thanhCong: false, thongBao: 'Email hoặc mật khẩu không đúng!' };
    }

    // Lưu phiên đăng nhập vào sessionStorage (không lưu mật khẩu)
    var phienDangNhap = {
        id: userTimThay.id,
        hoTen: userTimThay.hoTen,
        email: userTimThay.email,
        vaiTro: userTimThay.vaiTro,
        thoiGianDangNhap: new Date().toLocaleString('vi-VN')
    };
    sessionStorage.setItem('vth_current_user', JSON.stringify(phienDangNhap));

    return { thanhCong: true, thongBao: 'Đăng nhập thành công! Xin chào ' + userTimThay.hoTen };
}

// ---------------------------------------------------------------
// HÀM: Đăng ký tài khoản mới
// ---------------------------------------------------------------
function dangKy(hoTen, email, matKhau, xacNhanMatKhau) {
    // Validate
    if (!hoTen || hoTen.trim().length < 2) {
        return { thanhCong: false, thongBao: 'Họ tên phải có ít nhất 2 ký tự!' };
    }
    if (!email || email.indexOf('@') === -1) {
        return { thanhCong: false, thongBao: 'Email không hợp lệ!' };
    }
    if (!matKhau || matKhau.length < 6) {
        return { thanhCong: false, thongBao: 'Mật khẩu phải có ít nhất 6 ký tự!' };
    }
    if (matKhau !== xacNhanMatKhau) {
        return { thanhCong: false, thongBao: 'Mật khẩu xác nhận không khớp!' };
    }

    var danhSachUser = JSON.parse(localStorage.getItem('vth_users')) || [];

    // Kiểm tra email đã tồn tại chưa
    for (var i = 0; i < danhSachUser.length; i++) {
        if (danhSachUser[i].email === email) {
            return { thanhCong: false, thongBao: 'Email này đã được đăng ký!' };
        }
    }

    // Tạo user mới
    var idMoi = 'u' + Date.now();
    var userMoi = {
        id: idMoi,
        hoTen: hoTen.trim(),
        email: email.trim(),
        matKhau: matKhau,
        vaiTro: 'user',
        ngayTao: new Date().toLocaleDateString('vi-VN')
    };

    danhSachUser.push(userMoi);
    localStorage.setItem('vth_users', JSON.stringify(danhSachUser));

    return { thanhCong: true, thongBao: 'Đăng ký thành công! Hãy đăng nhập.' };
}

// ---------------------------------------------------------------
// HÀM: Đăng xuất
// ---------------------------------------------------------------
function dangXuat() {
    sessionStorage.removeItem('vth_current_user');
    sessionStorage.removeItem('admin_session');
    // Giỏ hàng giữ lại để tiện lần đăng nhập sau
    window.location.href = 'login.html';
}

// ---------------------------------------------------------------
// HÀM: Yêu cầu đăng nhập (redirect nếu chưa login)
// Gọi ở đầu trang cần bảo vệ
// ---------------------------------------------------------------
function yeuCauDangNhap() {
    if (!daoDangNhap()) {
        // Lưu trang hiện tại để redirect về sau khi login
        sessionStorage.setItem('redirect_after_login', window.location.href);
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// ---------------------------------------------------------------
// HÀM: Yêu cầu quyền Admin
// ---------------------------------------------------------------
function yeuCauAdmin() {
    if (!daoDangNhap()) {
        sessionStorage.setItem('redirect_after_login', window.location.href);
        window.location.href = 'login.html';
        return false;
    }
    if (!laAdmin()) {
        alert('Bạn không có quyền truy cập trang này!');
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// ---------------------------------------------------------------
// HÀM: Cập nhật UI Navbar theo trạng thái đăng nhập
// Gọi sau DOMContentLoaded ở mỗi trang
// ---------------------------------------------------------------
function capNhatNavbarAuth() {
    var user = layUserHienTai();

    // Tìm khu vực auth trên navbar
    var khungAuth = document.getElementById('navbar-auth-area');
    if (!khungAuth) return;

    if (!user) {
        // Chưa đăng nhập: Hiện nút Đăng Nhập / Đăng Ký
        khungAuth.innerHTML =
            '<a href="login.html" class="btn btn-outline-light btn-sm me-2" onclick="chuyenTrang(event,\'login.html\')">' +
            '  <i class="bi bi-person"></i> Đăng Nhập' +
            '</a>' +
            '<a href="register.html" class="btn btn-accent btn-sm" onclick="chuyenTrang(event,\'register.html\')">' +
            '  <i class="bi bi-person-plus"></i> Đăng Ký' +
            '</a>';
    } else {
        // Đã đăng nhập: Hiện avatar + tên + dropdown
        var mauAvatar = user.vaiTro === 'admin' ? '#8e44ad' : '#0d6efd';
        var kyTuDau = user.hoTen ? user.hoTen.charAt(0).toUpperCase() : 'U';

        khungAuth.innerHTML =
            '<div class="dropdown">' +
            '  <button class="btn btn-sm dropdown-toggle d-flex align-items-center gap-2 text-white border-0" type="button"' +
            '          id="user-dropdown" data-bs-toggle="dropdown" aria-expanded="false"' +
            '          style="background:transparent;">' +
            '    <div style="width:32px;height:32px;background:' + mauAvatar + ';border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.9rem;">' +
            '      ' + kyTuDau +
            '    </div>' +
            '    <span class="d-none d-lg-inline">' + user.hoTen.split(' ').pop() + '</span>' +
            '    ' + (user.vaiTro === 'admin' ? '<span class="badge bg-warning text-dark" style="font-size:0.6rem;">ADMIN</span>' : '') +
            '  </button>' +
            '  <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="user-dropdown">' +
            '    <li><h6 class="dropdown-header">' + user.hoTen + '</h6></li>' +
            '    <li><span class="dropdown-item-text small text-secondary">' + user.email + '</span></li>' +
            '    <li><hr class="dropdown-divider"></li>' +
            (user.vaiTro === 'admin'
                ? '<li><a class="dropdown-item" href="admin.html" onclick="chuyenTrang(event,\'admin.html\')"><i class="bi bi-speedometer2 me-2"></i>Quản Trị</a></li>'
                : '') +
            '    <li><a class="dropdown-item" href="#" onclick="xemThongTinCaNhan()"><i class="bi bi-person me-2"></i>Tài Khoản</a></li>' +
            '    <li><hr class="dropdown-divider"></li>' +
            '    <li><a class="dropdown-item text-danger" href="#" onclick="dangXuat()"><i class="bi bi-box-arrow-right me-2"></i>Đăng Xuất</a></li>' +
            '  </ul>' +
            '</div>';
    }
}

// ---------------------------------------------------------------
// HÀM: Xem/Sửa thông tin cá nhân (modal đơn giản)
// ---------------------------------------------------------------
function xemThongTinCaNhan() {
    var user = layUserHienTai();
    if (!user) return;

    // Tạo modal nếu chưa có
    var modalEl = document.getElementById('modal-ca-nhan');
    if (!modalEl) {
        modalEl = document.createElement('div');
        modalEl.id = 'modal-ca-nhan';
        modalEl.className = 'modal fade';
        modalEl.setAttribute('tabindex', '-1');
        modalEl.innerHTML =
            '<div class="modal-dialog modal-dialog-centered">' +
            '  <div class="modal-content bg-dark text-white border-secondary">' +
            '    <div class="modal-header border-secondary">' +
            '      <h5 class="modal-title"><i class="bi bi-person-circle text-primary"></i> Thông Tin Tài Khoản</h5>' +
            '      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>' +
            '    </div>' +
            '    <div class="modal-body">' +
            '      <div class="mb-3"><label class="form-label text-light">Họ và Tên</label>' +
            '        <input type="text" class="form-control" id="ca-nhan-hoten" value="' + user.hoTen + '"></div>' +
            '      <div class="mb-3"><label class="form-label text-light">Email</label>' +
            '        <input type="email" class="form-control" value="' + user.email + '" disabled></div>' +
            '      <div class="mb-3"><label class="form-label text-light">Vai Trò</label>' +
            '        <input type="text" class="form-control" value="' + (user.vaiTro === 'admin' ? 'Quản Trị Viên' : 'Khách Hàng') + '" disabled></div>' +
            '      <div class="mb-3"><label class="form-label text-light">Mật Khẩu Mới (để trống nếu không đổi)</label>' +
            '        <input type="password" class="form-control" id="ca-nhan-mk" placeholder="Tối thiểu 6 ký tự"></div>' +
            '    </div>' +
            '    <div class="modal-footer border-secondary">' +
            '      <button class="btn btn-outline-light" data-bs-dismiss="modal">Đóng</button>' +
            '      <button class="btn btn-primary" onclick="luuThongTinCaNhan()"><i class="bi bi-save"></i> Lưu</button>' +
            '    </div>' +
            '  </div>' +
            '</div>';
        document.body.appendChild(modalEl);
    }

    var modal = new bootstrap.Modal(modalEl);
    modal.show();
}

// ---------------------------------------------------------------
// HÀM: Lưu thông tin cá nhân
// ---------------------------------------------------------------
function luuThongTinCaNhan() {
    var user = layUserHienTai();
    if (!user) return;

    var hoTenMoi = document.getElementById('ca-nhan-hoten').value.trim();
    var mkMoi = document.getElementById('ca-nhan-mk').value;

    if (!hoTenMoi || hoTenMoi.length < 2) {
        alert('Họ tên phải có ít nhất 2 ký tự!');
        return;
    }
    if (mkMoi && mkMoi.length < 6) {
        alert('Mật khẩu phải có ít nhất 6 ký tự!');
        return;
    }

    // Cập nhật trong localStorage
    var danhSachUser = JSON.parse(localStorage.getItem('vth_users')) || [];
    for (var i = 0; i < danhSachUser.length; i++) {
        if (danhSachUser[i].id === user.id) {
            danhSachUser[i].hoTen = hoTenMoi;
            if (mkMoi) danhSachUser[i].matKhau = mkMoi;
            break;
        }
    }
    localStorage.setItem('vth_users', JSON.stringify(danhSachUser));

    // Cập nhật session
    user.hoTen = hoTenMoi;
    sessionStorage.setItem('vth_current_user', JSON.stringify(user));

    // Đóng modal + refresh navbar
    var modalEl = document.getElementById('modal-ca-nhan');
    var modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();

    capNhatNavbarAuth();
    alert('Đã cập nhật thông tin thành công!');
}
