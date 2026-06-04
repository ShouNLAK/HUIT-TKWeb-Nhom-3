// =============================================================
// VIET TRAVEL HUB - js/data.js
// DỮ LIỆU CỨNG (Hard-coded) cho toàn bộ website
// Bao gồm: Địa điểm, Máy Bay, Tàu Hỏa, Xe Khách, Đơn Hàng
// =============================================================

// ---------------------------------------------------------------
// 1. ĐỊA ĐIỂM & HÌNH ẢNH LOCAL (dùng cho flight modal + carousel)
// ---------------------------------------------------------------
var destinations = {
    'SGN': {
        name: 'TP. Hồ Chí Minh',
        img: 'img/HCM.jpg',
        desc: 'Thành phố mang tên Bác sôi động bậc nhất Việt Nam với Landmark 81, Nhà thờ Đức Bà cổ kính, chợ Bến Thành nhộn nhịp và ẩm thực đường phố phong phú.'
    },
    'HAN': {
        name: 'Hà Nội',
        img: 'img/Ha-Noi.jpg',
        desc: 'Thủ đô nghìn năm văn hiến với Hồ Hoàn Kiếm, đền Ngọc Sơn, 36 phố phường cổ kính và hương vị Phở truyền thống trứ danh.'
    },
    'DAD': {
        name: 'Đà Nẵng',
        img: 'img/Da-Nang.jpg',
        desc: 'Thành phố đáng sống nhất Việt Nam, sở hữu Cầu Rồng phun lửa, Bà Nà Hills hùng vĩ và bãi biển Mỹ Khê trong xanh trải dài.'
    },
    'PQC': {
        name: 'Phú Quốc',
        img: 'img/Phu-Quoc.jpg',
        desc: 'Đảo Ngọc thiên đường với các bãi biển cát trắng mịn màng như Bãi Sao, hoàng hôn tuyệt mỹ tại Dinh Cậu và khu nghỉ dưỡng đẳng cấp.'
    },
    'DLI': {
        name: 'Đà Lạt',
        img: 'img/Da-Lat.jpg',
        desc: 'Thành phố sương mù thơ mộng trên cao nguyên Lâm Viên với khí hậu ôn đới mát mẻ quanh năm, những đồi thông reo và ngàn hoa khoe sắc.'
    },
    'CXR': {
        name: 'Nha Trang',
        img: 'img/Nha-Trang.jpg',
        desc: 'Vịnh biển đẹp nhất Việt Nam với làn nước ấm áp, rạn san hô rực rỡ tại Hòn Mun và khu vui chơi VinWonders đẳng cấp.'
    }
};

// ---------------------------------------------------------------
// 2. DỮ LIỆU MÁY BAY
// Cấu trúc: id, airline, code, aircraft, type, from, to,
//           time (HH:MM - HH:MM), price, stops, logoUrl, color
// ---------------------------------------------------------------
var mockFlights = [
    // --- SGN → HAN ---
    {
        id: 'f1',
        airline: 'Vietnam Airlines',
        code: 'VN-241',
        aircraft: 'Airbus A321 Neo',
        type: 'Bay thẳng',
        from: 'SGN', to: 'HAN',
        time: '06:00 - 08:15',
        price: 2500000,
        stops: 0,
        logoUrl: 'img/Vietnam-Airlines.jpg',
        color: '#0a3d62'
    },
    {
        id: 'f2',
        airline: 'Vietjet Air',
        code: 'VJ-122',
        aircraft: 'Airbus A320',
        type: 'Bay thẳng',
        from: 'SGN', to: 'HAN',
        time: '08:30 - 10:45',
        price: 1150000,
        stops: 0,
        logoUrl: 'img/Vietjet-Air.jpg',
        color: '#ed1c24'
    },
    {
        id: 'f3',
        airline: 'Bamboo Airways',
        code: 'QH-301',
        aircraft: 'Airbus A320 Neo',
        type: 'Bay thẳng',
        from: 'SGN', to: 'HAN',
        time: '11:00 - 13:15',
        price: 1380000,
        stops: 0,
        logoUrl: 'img/Bamboo-Airways.jpg',
        color: '#10ac84'
    },
    {
        id: 'f4',
        airline: 'Vietnam Airlines',
        code: 'VN-243',
        aircraft: 'Boeing 787-9 Dreamliner',
        type: 'Bay thẳng',
        from: 'SGN', to: 'HAN',
        time: '14:30 - 16:45',
        price: 2950000,
        stops: 0,
        logoUrl: 'img/Vietnam-Airlines.jpg',
        color: '#0a3d62'
    },
    // --- HAN → SGN ---
    {
        id: 'f5',
        airline: 'Vietnam Airlines',
        code: 'VN-200',
        aircraft: 'Boeing 787-10 Dreamliner',
        type: 'Bay thẳng',
        from: 'HAN', to: 'SGN',
        time: '07:00 - 09:15',
        price: 2700000,
        stops: 0,
        logoUrl: 'img/Vietnam-Airlines.jpg',
        color: '#0a3d62'
    },
    {
        id: 'f6',
        airline: 'Vietjet Air',
        code: 'VJ-101',
        aircraft: 'Airbus A321',
        type: 'Bay thẳng',
        from: 'HAN', to: 'SGN',
        time: '12:00 - 14:10',
        price: 990000,
        stops: 0,
        logoUrl: 'img/Vietjet-Air.jpg',
        color: '#ed1c24'
    },
    {
        id: 'f7',
        airline: 'Bamboo Airways',
        code: 'QH-502',
        aircraft: 'Airbus A320 Neo',
        type: 'Bay thẳng',
        from: 'HAN', to: 'SGN',
        time: '18:00 - 20:10',
        price: 1350000,
        stops: 0,
        logoUrl: 'img/Bamboo-Airways.jpg',
        color: '#10ac84'
    },
    // --- SGN → DAD ---
    {
        id: 'f8',
        airline: 'Vietnam Airlines',
        code: 'VN-563',
        aircraft: 'Airbus A321',
        type: 'Bay thẳng',
        from: 'SGN', to: 'DAD',
        time: '07:30 - 08:40',
        price: 1750000,
        stops: 0,
        logoUrl: 'img/Vietnam-Airlines.jpg',
        color: '#0a3d62'
    },
    {
        id: 'f9',
        airline: 'Bamboo Airways',
        code: 'QH-201',
        aircraft: 'Boeing 787-9 Dreamliner',
        type: 'Bay thẳng',
        from: 'SGN', to: 'DAD',
        time: '09:00 - 10:10',
        price: 1500000,
        stops: 0,
        logoUrl: 'img/Bamboo-Airways.jpg',
        color: '#10ac84'
    },
    {
        id: 'f10',
        airline: 'Vietjet Air',
        code: 'VJ-355',
        aircraft: 'Airbus A321',
        type: 'Bay thẳng',
        from: 'SGN', to: 'DAD',
        time: '06:00 - 07:10',
        price: 1100000,
        stops: 0,
        logoUrl: 'img/Vietjet-Air.jpg',
        color: '#ed1c24'
    },
    // --- DAD → SGN ---
    {
        id: 'f11',
        airline: 'Vietnam Airlines',
        code: 'VN-564',
        aircraft: 'Airbus A350',
        type: 'Bay thẳng',
        from: 'DAD', to: 'SGN',
        time: '10:30 - 11:45',
        price: 1800000,
        stops: 0,
        logoUrl: 'img/Vietnam-Airlines.jpg',
        color: '#0a3d62'
    },
    {
        id: 'f12',
        airline: 'Vietjet Air',
        code: 'VJ-356',
        aircraft: 'Airbus A320',
        type: 'Bay thẳng',
        from: 'DAD', to: 'SGN',
        time: '16:00 - 17:10',
        price: 1050000,
        stops: 0,
        logoUrl: 'img/Vietjet-Air.jpg',
        color: '#ed1c24'
    },
    // --- HAN → PQC ---
    {
        id: 'f13',
        airline: 'Vietnam Airlines',
        code: 'VN-111',
        aircraft: 'Boeing 787-10 Dreamliner',
        type: 'Bay thẳng',
        from: 'HAN', to: 'PQC',
        time: '06:30 - 08:40',
        price: 3200000,
        stops: 0,
        logoUrl: 'img/Vietnam-Airlines.jpg',
        color: '#0a3d62'
    },
    {
        id: 'f14',
        airline: 'Bamboo Airways',
        code: 'QH-401',
        aircraft: 'Airbus A320 Neo',
        type: 'Bay thẳng',
        from: 'HAN', to: 'PQC',
        time: '10:00 - 12:10',
        price: 2600000,
        stops: 0,
        logoUrl: 'img/Bamboo-Airways.jpg',
        color: '#10ac84'
    },
    // --- SGN → PQC ---
    {
        id: 'f15',
        airline: 'Vietnam Airlines',
        code: 'VN-805',
        aircraft: 'Airbus A321',
        type: 'Bay thẳng',
        from: 'SGN', to: 'PQC',
        time: '09:20 - 10:30',
        price: 2100000,
        stops: 0,
        logoUrl: 'img/Vietnam-Airlines.jpg',
        color: '#0a3d62'
    },
    {
        id: 'f16',
        airline: 'Vietjet Air',
        code: 'VJ-701',
        aircraft: 'Airbus A320',
        type: 'Bay thẳng',
        from: 'SGN', to: 'PQC',
        time: '14:00 - 15:05',
        price: 1450000,
        stops: 0,
        logoUrl: 'img/Vietjet-Air.jpg',
        color: '#ed1c24'
    },
    // --- SGN → CXR ---
    {
        id: 'f17',
        airline: 'Vietnam Airlines',
        code: 'VN-565',
        aircraft: 'Airbus A350',
        type: 'Bay thẳng',
        from: 'SGN', to: 'CXR',
        time: '07:30 - 08:30',
        price: 1800000,
        stops: 0,
        logoUrl: 'img/Vietnam-Airlines.jpg',
        color: '#0a3d62'
    },
    {
        id: 'f18',
        airline: 'Bamboo Airways',
        code: 'QH-601',
        aircraft: 'Airbus A320',
        type: 'Bay thẳng',
        from: 'SGN', to: 'CXR',
        time: '13:00 - 14:05',
        price: 1550000,
        stops: 0,
        logoUrl: 'img/Bamboo-Airways.jpg',
        color: '#10ac84'
    },
    // --- SGN → DLI ---
    {
        id: 'f19',
        airline: 'Vietnam Airlines',
        code: 'VN-1363',
        aircraft: 'Airbus A321',
        type: 'Bay thẳng',
        from: 'SGN', to: 'DLI',
        time: '09:00 - 09:55',
        price: 1650000,
        stops: 0,
        logoUrl: 'img/Vietnam-Airlines.jpg',
        color: '#0a3d62'
    },
    // --- HAN → DAD ---
    {
        id: 'f20',
        airline: 'Vietnam Airlines',
        code: 'VN-539',
        aircraft: 'Airbus A321 Neo',
        type: 'Bay thẳng',
        from: 'HAN', to: 'DAD',
        time: '07:45 - 08:55',
        price: 1900000,
        stops: 0,
        logoUrl: 'img/Vietnam-Airlines.jpg',
        color: '#0a3d62'
    },
    {
        id: 'f21',
        airline: 'Vietjet Air',
        code: 'VJ-531',
        aircraft: 'Airbus A320',
        type: 'Bay thẳng',
        from: 'HAN', to: 'DAD',
        time: '15:00 - 16:10',
        price: 1200000,
        stops: 0,
        logoUrl: 'img/Vietjet-Air.jpg',
        color: '#ed1c24'
    }
];

// ---------------------------------------------------------------
// 3. DỮ LIỆU TÀU HỎA ĐƯỜNG SẮT VIỆT NAM
// Cấu trúc: id, code, name, type, from, to,
//           time (HH:MM - HH:MM), duration, price, amenities[]
// from/to dùng mã: SGN=Sài Gòn, HAN=Hà Nội, DAD=Đà Nẵng, NHA=Nha Trang
// ---------------------------------------------------------------
var mockTrains = [
    // --- SGN → HAN ---
    {
        id: 't1',
        code: 'SE1',
        name: 'Tàu Thống Nhất SE1',
        type: 'Tàu Nhanh Bắc Nam',
        from: 'SGN', to: 'HAN',
        time: '19:00 - 14:00',
        duration: '31h 00p',
        price: 850000,
        amenities: ['Điều hòa', 'WiFi miễn phí', 'Cổng sạc USB', 'Nước uống']
    },
    {
        id: 't2',
        code: 'SE3',
        name: 'Tàu Thống Nhất SE3',
        type: 'Tàu Nhanh Bắc Nam',
        from: 'SGN', to: 'HAN',
        time: '22:00 - 17:00',
        duration: '31h 00p',
        price: 780000,
        amenities: ['Điều hòa', 'Cổng sạc USB', 'Nước uống']
    },
    // --- HAN → SGN ---
    {
        id: 't3',
        code: 'SE2',
        name: 'Tàu Thống Nhất SE2',
        type: 'Tàu Nhanh Bắc Nam',
        from: 'HAN', to: 'SGN',
        time: '18:00 - 14:00',
        duration: '32h 00p',
        price: 820000,
        amenities: ['Điều hòa', 'WiFi', 'Khăn lạnh', 'Cổng sạc USB']
    },
    {
        id: 't4',
        code: 'SE4',
        name: 'Tàu Thống Nhất SE4',
        type: 'Tàu Nhanh Bắc Nam',
        from: 'HAN', to: 'SGN',
        time: '21:00 - 17:00',
        duration: '32h 00p',
        price: 750000,
        amenities: ['Điều hòa', 'Cổng sạc', 'Nước uống']
    },
    // --- SGN → DAD ---
    {
        id: 't5',
        code: 'SE7',
        name: 'Tàu Thống Nhất SE7',
        type: 'Tàu Nhanh Bắc Nam',
        from: 'SGN', to: 'DAD',
        time: '19:30 - 12:45',
        duration: '17h 15p',
        price: 690000,
        amenities: ['Điều hòa', 'WiFi miễn phí', 'Cổng sạc USB', 'Nước uống']
    },
    {
        id: 't6',
        code: 'SE5',
        name: 'Tàu Thống Nhất SE5',
        type: 'Tàu Du Lịch Cao Cấp',
        from: 'SGN', to: 'DAD',
        time: '21:00 - 14:00',
        duration: '17h 00p',
        price: 850000,
        amenities: ['Điều hòa', 'Cổng sạc USB', 'Nước uống']
    },
    // --- DAD → HAN ---
    {
        id: 't7',
        code: 'SE8',
        name: 'Tàu Thống Nhất SE8',
        type: 'Tàu Nhanh Bắc Nam',
        from: 'DAD', to: 'HAN',
        time: '10:00 - 05:30',
        duration: '19h 30p',
        price: 920000,
        amenities: ['Điều hòa', 'Cổng sạc USB', 'Nước uống']
    },
    // --- HAN → DAD ---
    {
        id: 't8',
        code: 'SE6',
        name: 'Tàu Thống Nhất SE6',
        type: 'Tàu Nhanh Bắc Nam',
        from: 'HAN', to: 'DAD',
        time: '22:30 - 17:30',
        duration: '19h 00p',
        price: 880000,
        amenities: ['Điều hòa', 'WiFi', 'Khăn lạnh']
    },
    // --- SGN → NHA (Nha Trang) ---
    {
        id: 't9',
        code: 'SE22',
        name: 'Tàu SE22 Nha Trang',
        type: 'Tàu Đặc Biệt',
        from: 'SGN', to: 'NHA',
        time: '06:00 - 14:00',
        duration: '8h 00p',
        price: 450000,
        amenities: ['Điều hòa', 'Cổng sạc', 'Wifi']
    },
    {
        id: 't10',
        code: 'SE21',
        name: 'Tàu SE21 Nha Trang',
        type: 'Tàu Đặc Biệt',
        from: 'SGN', to: 'NHA',
        time: '22:30 - 06:30',
        duration: '8h 00p',
        price: 420000,
        amenities: ['Điều hòa', 'Cổng sạc', 'Nước uống']
    },
    // --- NHA → SGN ---
    {
        id: 't11',
        code: 'SNT1',
        name: 'Tàu SNT1 Nha Trang - Sài Gòn',
        type: 'Tàu Nhanh',
        from: 'NHA', to: 'SGN',
        time: '07:30 - 15:30',
        duration: '8h 00p',
        price: 430000,
        amenities: ['Điều hòa', 'Cổng sạc USB']
    },
    // --- HAN → NHA ---
    {
        id: 't12',
        code: 'SE19',
        name: 'Tàu SE19 Hà Nội - Nha Trang',
        type: 'Tàu Nhanh',
        from: 'HAN', to: 'NHA',
        time: '06:00 - 22:30',
        duration: '24h 30p',
        price: 760000,
        amenities: ['Điều hòa', 'WiFi', 'Cổng sạc USB', 'Nước uống']
    }
];

// ---------------------------------------------------------------
// 4. DỮ LIỆU XE KHÁCH GIƯỜNG NẰM
// Cấu trúc: id, company, name, type, from, to,
//           time (HH:MM - HH:MM), duration, price, available, amenities[]
// from/to dùng mã: SGN, HAN, DAD, PQC, DLI, CXR
// ---------------------------------------------------------------
var mockBuses = [
    // --- SGN → DLI (Đà Lạt) ---
    {
        id: 'b1',
        company: 'Phương Trang',
        name: 'Limousine VIP 34 Giường',
        type: 'Giường nằm VIP Limo',
        from: 'SGN', to: 'DLI',
        time: '22:00 - 05:00',
        duration: '7h 00p',
        price: 300000,
        available: 18,
        amenities: ['Giường VIP 180°', 'WiFi', 'Điều hòa riêng', 'Sạc USB']
    },
    {
        id: 'b2',
        company: 'Thành Bưởi',
        name: 'Cabin Đơn Royal',
        type: 'Phòng nằm Cabin Royal',
        from: 'SGN', to: 'DLI',
        time: '23:30 - 06:30',
        duration: '7h 00p',
        price: 420000,
        available: 12,
        amenities: ['Cabin riêng tư', 'TV màn hình', 'Điều hòa', 'Sạc USB']
    },
    {
        id: 'b3',
        company: 'Phương Trang',
        name: 'Giường Nằm 40 Chỗ',
        type: 'Giường nằm Standard',
        from: 'SGN', to: 'DLI',
        time: '21:00 - 04:00',
        duration: '7h 00p',
        price: 230000,
        available: 30,
        amenities: ['Giường nằm', 'Điều hòa', 'WiFi']
    },
    // --- SGN → CXR (Nha Trang) ---
    {
        id: 'b4',
        company: 'Hạnh Cafe',
        name: 'Giường Nằm 40 Chỗ',
        type: 'Giường nằm Standard',
        from: 'SGN', to: 'CXR',
        time: '20:00 - 05:00',
        duration: '9h 00p',
        price: 250000,
        available: 24,
        amenities: ['Giường nằm', 'Điều hòa', 'WiFi', 'Nước uống']
    },
    {
        id: 'b5',
        company: 'Phương Trang',
        name: 'Limousine Nha Trang VIP',
        type: 'Giường nằm VIP',
        from: 'SGN', to: 'CXR',
        time: '19:30 - 04:30',
        duration: '9h 00p',
        price: 350000,
        available: 10,
        amenities: ['Giường VIP 180°', 'WiFi', 'Điều hòa', 'Khăn lạnh']
    },
    {
        id: 'b6',
        company: 'Hoàng Long',
        name: 'Cabin VIP 2 Tầng',
        type: 'Phòng nằm VIP 2 tầng',
        from: 'SGN', to: 'CXR',
        time: '21:00 - 06:00',
        duration: '9h 00p',
        price: 390000,
        available: 8,
        amenities: ['Cabin VIP', 'WiFi', 'Điều hòa riêng', 'Chăn gối']
    },
    // --- HAN → DAD ---
    {
        id: 'b7',
        company: 'Hoàng Long',
        name: 'Giường Nằm Hà Nội - Đà Nẵng',
        type: 'Giường nằm Standard',
        from: 'HAN', to: 'DAD',
        time: '18:00 - 06:00',
        duration: '12h 00p',
        price: 380000,
        available: 20,
        amenities: ['Giường nằm', 'Điều hòa', 'WiFi', 'Nước uống']
    },
    {
        id: 'b8',
        company: 'Phương Trang',
        name: 'VIP Limousine Hà Nội - Đà Nẵng',
        type: 'Giường VIP Limo',
        from: 'HAN', to: 'DAD',
        time: '19:00 - 07:00',
        duration: '12h 00p',
        price: 550000,
        available: 14,
        amenities: ['Giường VIP 180°', 'WiFi tốc độ cao', 'Điều hòa riêng', 'Bữa sáng']
    },
    // --- DAD → SGN ---
    {
        id: 'b9',
        company: 'Hạnh Cafe',
        name: 'Giường Nằm Đà Nẵng - Sài Gòn',
        type: 'Giường nằm Standard',
        from: 'DAD', to: 'SGN',
        time: '17:00 - 07:00',
        duration: '14h 00p',
        price: 320000,
        available: 22,
        amenities: ['Giường nằm', 'Điều hòa', 'WiFi']
    },
    // --- SGN → DAD ---
    {
        id: 'b10',
        company: 'Thành Bưởi',
        name: 'Premium Cabin Sài Gòn - Đà Nẵng',
        type: 'Phòng nằm Cabin Premium',
        from: 'SGN', to: 'DAD',
        time: '16:00 - 06:00',
        duration: '14h 00p',
        price: 480000,
        available: 10,
        amenities: ['Cabin riêng tư', 'TV màn hình', 'Điều hòa', 'Bữa sáng']
    },
    // --- HAN → SGN ---
    {
        id: 'b11',
        company: 'Hoàng Long',
        name: 'Liên Vận Bắc Nam Hà Nội - Sài Gòn',
        type: 'Giường nằm cao cấp',
        from: 'HAN', to: 'SGN',
        time: '08:00 - 08:00',
        duration: '24h 00p',
        price: 700000,
        available: 16,
        amenities: ['Giường nằm VIP', 'WiFi', 'Điều hòa', '2 bữa ăn']
    }
];

// ---------------------------------------------------------------
// 5. DỮ LIỆU ĐƠN HÀNG (Lịch Sử Đặt Vé)
// Cấu trúc khớp với cart.js (datHang()):
//   maDon, ngayMua, danhSachVe[], tongTien, hanhKhach{hoTen,sdt,email,cmnd}
// Mỗi vé trong danhSachVe:
//   id, loaiDichVu, tuyen, gia, chiTiet, loai('flight'|'train'|'bus'),
//   logoUrl, thoiGianThem
// ---------------------------------------------------------------
var mockOrders = [
    {
        maDon: 'VTH-9001',
        ngayMua: '2/12/2025, 08:30:00',
        danhSachVe: [
            {
                id: 'v001',
                loaiDichVu: 'Vietnam Airlines VN-241',
                tuyen: 'SGN → HAN',
                gia: 2500000,
                chiTiet: 'Ghế 12A · Hạng Phổ Thông · Airbus A321 Neo · 06:00 - 08:15',
                loai: 'flight',
                logoUrl: 'img/Vietnam-Airlines.jpg',
                thoiGianThem: '2/12/2025, 08:25:00'
            }
        ],
        tongTien: 2500000,
        hanhKhach: { hoTen: 'Nguyễn Văn An', sdt: '0901234567', email: 'nguyenvanan@gmail.com', cmnd: '001099012345' }
    },
    {
        maDon: 'VTH-9002',
        ngayMua: '10/12/2025, 14:10:00',
        danhSachVe: [
            {
                id: 'v002',
                loaiDichVu: 'Vietjet Air VJ-122',
                tuyen: 'SGN → HAN',
                gia: 1150000,
                chiTiet: 'Ghế 5C · Hạng Phổ Thông · Airbus A320 · 08:30 - 10:45',
                loai: 'flight',
                logoUrl: 'img/Vietjet-Air.jpg',
                thoiGianThem: '10/12/2025, 14:05:00'
            },
            {
                id: 'v003',
                loaiDichVu: 'Vietjet Air VJ-122',
                tuyen: 'SGN → HAN',
                gia: 1150000,
                chiTiet: 'Ghế 5D · Hạng Phổ Thông · Airbus A320 · 08:30 - 10:45',
                loai: 'flight',
                logoUrl: 'img/Vietjet-Air.jpg',
                thoiGianThem: '10/12/2025, 14:05:00'
            }
        ],
        tongTien: 2300000,
        hanhKhach: { hoTen: 'Trần Thị Bảo', sdt: '0912345678', email: 'tranthibao@yahoo.com', cmnd: '038099056789' }
    },
    {
        maDon: 'VTH-9003',
        ngayMua: '15/12/2025, 09:00:00',
        danhSachVe: [
            {
                id: 'v004',
                loaiDichVu: 'Tàu SE1 · Ghế Mềm 12A',
                tuyen: 'SGN → HAN',
                gia: 850000,
                chiTiet: 'Toa 2 · Ghế 12A · Ghế Mềm Điều Hòa · 19:00 - 14:00 (+1)',
                loai: 'train',
                logoUrl: '',
                thoiGianThem: '15/12/2025, 08:55:00'
            },
            {
                id: 'v005',
                loaiDichVu: 'Tàu SE1 · Ghế Mềm 12B',
                tuyen: 'SGN → HAN',
                gia: 850000,
                chiTiet: 'Toa 2 · Ghế 12B · Ghế Mềm Điều Hòa · 19:00 - 14:00 (+1)',
                loai: 'train',
                logoUrl: '',
                thoiGianThem: '15/12/2025, 08:55:00'
            }
        ],
        tongTien: 1700000,
        hanhKhach: { hoTen: 'Lê Hoàng Cường', sdt: '0923456789', email: 'lehoangcuong@gmail.com', cmnd: '025099078901' }
    },
    {
        maDon: 'VTH-9004',
        ngayMua: '20/12/2025, 16:45:00',
        danhSachVe: [
            {
                id: 'v006',
                loaiDichVu: 'Phương Trang Limousine VIP',
                tuyen: 'SGN → DLI',
                gia: 300000,
                chiTiet: 'Giường A3 Tầng Dưới · Limousine VIP 34 Giường · 22:00 - 05:00',
                loai: 'bus',
                logoUrl: '',
                thoiGianThem: '20/12/2025, 16:40:00'
            }
        ],
        tongTien: 300000,
        hanhKhach: { hoTen: 'Phạm Thị Dung', sdt: '0934567890', email: 'phamthidung@gmail.com', cmnd: '001099034567' }
    },
    {
        maDon: 'VTH-9005',
        ngayMua: '28/12/2025, 10:20:00',
        danhSachVe: [
            {
                id: 'v007',
                loaiDichVu: 'Vietnam Airlines VN-563',
                tuyen: 'SGN → DAD',
                gia: 1750000,
                chiTiet: 'Ghế 8A · Hạng Thương Gia · Airbus A321 · 07:30 - 08:40',
                loai: 'flight',
                logoUrl: 'img/Vietnam-Airlines.jpg',
                thoiGianThem: '28/12/2025, 10:15:00'
            },
            {
                id: 'v008',
                loaiDichVu: 'Vietnam Airlines VN-563',
                tuyen: 'SGN → DAD',
                gia: 1750000,
                chiTiet: 'Ghế 8B · Hạng Thương Gia · Airbus A321 · 07:30 - 08:40',
                loai: 'flight',
                logoUrl: 'img/Vietnam-Airlines.jpg',
                thoiGianThem: '28/12/2025, 10:15:00'
            },
            {
                id: 'v009',
                loaiDichVu: 'Vietnam Airlines VN-563',
                tuyen: 'SGN → DAD',
                gia: 1750000,
                chiTiet: 'Ghế 8C · Hạng Thương Gia · Airbus A321 · 07:30 - 08:40',
                loai: 'flight',
                logoUrl: 'img/Vietnam-Airlines.jpg',
                thoiGianThem: '28/12/2025, 10:15:00'
            }
        ],
        tongTien: 5250000,
        hanhKhach: { hoTen: 'Hoàng Minh Đức', sdt: '0945678901', email: 'hoangminhduc@gmail.com', cmnd: '080099056789' }
    },
    {
        maDon: 'VTH-9006',
        ngayMua: '5/1/2026, 11:30:00',
        danhSachVe: [
            {
                id: 'v010',
                loaiDichVu: 'Tàu SE7 · Giường Cabin 1A',
                tuyen: 'SGN → DAD',
                gia: 690000,
                chiTiet: 'Toa VIP · Cabin 1 · Giường 1A · Giường Nằm Điều Hòa · 19:30 - 12:45',
                loai: 'train',
                logoUrl: '',
                thoiGianThem: '5/1/2026, 11:25:00'
            }
        ],
        tongTien: 690000,
        hanhKhach: { hoTen: 'Vũ Thị Lan', sdt: '0956789012', email: 'vuthilan@gmail.com', cmnd: '001099067890' }
    },
    {
        maDon: 'VTH-9007',
        ngayMua: '12/1/2026, 08:00:00',
        danhSachVe: [
            {
                id: 'v011',
                loaiDichVu: 'Bamboo Airways QH-201',
                tuyen: 'SGN → DAD',
                gia: 1500000,
                chiTiet: 'Ghế 15A · Hạng Phổ Thông · Boeing 787-9 · 09:00 - 10:10',
                loai: 'flight',
                logoUrl: 'img/Bamboo-Airways.jpg',
                thoiGianThem: '12/1/2026, 07:55:00'
            },
            {
                id: 'v012',
                loaiDichVu: 'Bamboo Airways QH-201',
                tuyen: 'SGN → DAD',
                gia: 1500000,
                chiTiet: 'Ghế 15B · Hạng Phổ Thông · Boeing 787-9 · 09:00 - 10:10',
                loai: 'flight',
                logoUrl: 'img/Bamboo-Airways.jpg',
                thoiGianThem: '12/1/2026, 07:55:00'
            }
        ],
        tongTien: 3000000,
        hanhKhach: { hoTen: 'Đặng Quốc Phong', sdt: '0967890123', email: 'dangquocphong@gmail.com', cmnd: '023099089012' }
    },
    {
        maDon: 'VTH-9008',
        ngayMua: '18/1/2026, 15:00:00',
        danhSachVe: [
            {
                id: 'v013',
                loaiDichVu: 'Thành Bưởi Cabin Royal',
                tuyen: 'SGN → DLI',
                gia: 420000,
                chiTiet: 'Cabin 3 · Giường Dưới · Phòng nằm Cabin Royal · 23:30 - 06:30',
                loai: 'bus',
                logoUrl: '',
                thoiGianThem: '18/1/2026, 14:55:00'
            },
            {
                id: 'v014',
                loaiDichVu: 'Thành Bưởi Cabin Royal',
                tuyen: 'SGN → DLI',
                gia: 420000,
                chiTiet: 'Cabin 3 · Giường Trên · Phòng nằm Cabin Royal · 23:30 - 06:30',
                loai: 'bus',
                logoUrl: '',
                thoiGianThem: '18/1/2026, 14:55:00'
            }
        ],
        tongTien: 840000,
        hanhKhach: { hoTen: 'Bùi Thị Giang', sdt: '0978901234', email: 'buithigiang@yahoo.com', cmnd: '001099012378' }
    },
    {
        maDon: 'VTH-9009',
        ngayMua: '25/1/2026, 09:45:00',
        danhSachVe: [
            {
                id: 'v015',
                loaiDichVu: 'Vietnam Airlines VN-111',
                tuyen: 'HAN → PQC',
                gia: 3200000,
                chiTiet: 'Ghế 3A · Hạng Thương Gia · Boeing 787-10 · 06:30 - 08:40',
                loai: 'flight',
                logoUrl: 'img/Vietnam-Airlines.jpg',
                thoiGianThem: '25/1/2026, 09:40:00'
            }
        ],
        tongTien: 3200000,
        hanhKhach: { hoTen: 'Ngô Thanh Hải', sdt: '0989012345', email: 'ngothanhhai@gmail.com', cmnd: '038099034561' }
    },
    {
        maDon: 'VTH-9010',
        ngayMua: '2/2/2026, 13:20:00',
        danhSachVe: [
            {
                id: 'v016',
                loaiDichVu: 'Hạnh Cafe Giường Nằm',
                tuyen: 'SGN → CXR',
                gia: 250000,
                chiTiet: 'Giường B5 Tầng Dưới · Standard · 20:00 - 05:00',
                loai: 'bus',
                logoUrl: '',
                thoiGianThem: '2/2/2026, 13:15:00'
            },
            {
                id: 'v017',
                loaiDichVu: 'Hạnh Cafe Giường Nằm',
                tuyen: 'SGN → CXR',
                gia: 250000,
                chiTiet: 'Giường B6 Tầng Dưới · Standard · 20:00 - 05:00',
                loai: 'bus',
                logoUrl: '',
                thoiGianThem: '2/2/2026, 13:15:00'
            },
            {
                id: 'v018',
                loaiDichVu: 'Hạnh Cafe Giường Nằm',
                tuyen: 'SGN → CXR',
                gia: 250000,
                chiTiet: 'Giường B7 Tầng Dưới · Standard · 20:00 - 05:00',
                loai: 'bus',
                logoUrl: '',
                thoiGianThem: '2/2/2026, 13:15:00'
            }
        ],
        tongTien: 750000,
        hanhKhach: { hoTen: 'Lý Thị Hoa', sdt: '0901234589', email: 'lythihoa@gmail.com', cmnd: '025099023456' }
    },
    {
        maDon: 'VTH-9011',
        ngayMua: '10/2/2026, 07:30:00',
        danhSachVe: [
            {
                id: 'v019',
                loaiDichVu: 'Tàu SE3 · Ghế Mềm 5C',
                tuyen: 'SGN → HAN',
                gia: 780000,
                chiTiet: 'Toa 1 · Ghế 5C · Ghế Mềm Điều Hòa · 22:00 - 17:00 (+1)',
                loai: 'train',
                logoUrl: '',
                thoiGianThem: '10/2/2026, 07:25:00'
            },
            {
                id: 'v020',
                loaiDichVu: 'Tàu SE3 · Ghế Mềm 5D',
                tuyen: 'SGN → HAN',
                gia: 780000,
                chiTiet: 'Toa 1 · Ghế 5D · Ghế Mềm Điều Hòa · 22:00 - 17:00 (+1)',
                loai: 'train',
                logoUrl: '',
                thoiGianThem: '10/2/2026, 07:25:00'
            },
            {
                id: 'v021',
                loaiDichVu: 'Tàu SE3 · Ghế Mềm 5A',
                tuyen: 'SGN → HAN',
                gia: 780000,
                chiTiet: 'Toa 1 · Ghế 5A · Ghế Mềm Điều Hòa · 22:00 - 17:00 (+1)',
                loai: 'train',
                logoUrl: '',
                thoiGianThem: '10/2/2026, 07:25:00'
            }
        ],
        tongTien: 2340000,
        hanhKhach: { hoTen: 'Trịnh Văn Khải', sdt: '0912345690', email: 'trinhvankhai@gmail.com', cmnd: '080099045678' }
    },
    {
        maDon: 'VTH-9012',
        ngayMua: '14/2/2026, 10:00:00',
        danhSachVe: [
            {
                id: 'v022',
                loaiDichVu: 'Vietnam Airlines VN-200',
                tuyen: 'HAN → SGN',
                gia: 2700000,
                chiTiet: 'Ghế 1A · Hạng Thương Gia · Boeing 787-10 · 07:00 - 09:15',
                loai: 'flight',
                logoUrl: 'img/Vietnam-Airlines.jpg',
                thoiGianThem: '14/2/2026, 09:55:00'
            },
            {
                id: 'v023',
                loaiDichVu: 'Vietnam Airlines VN-200',
                tuyen: 'HAN → SGN',
                gia: 2700000,
                chiTiet: 'Ghế 1B · Hạng Thương Gia · Boeing 787-10 · 07:00 - 09:15',
                loai: 'flight',
                logoUrl: 'img/Vietnam-Airlines.jpg',
                thoiGianThem: '14/2/2026, 09:55:00'
            }
        ],
        tongTien: 5400000,
        hanhKhach: { hoTen: 'Đinh Thị Linh', sdt: '0923456701', email: 'dinhthinh@gmail.com', cmnd: '023099056789' }
    },
    {
        maDon: 'VTH-9013',
        ngayMua: '20/2/2026, 16:15:00',
        danhSachVe: [
            {
                id: 'v024',
                loaiDichVu: 'Hoàng Long Giường Nằm',
                tuyen: 'HAN → DAD',
                gia: 380000,
                chiTiet: 'Giường C3 Tầng Dưới · Standard · 18:00 - 06:00',
                loai: 'bus',
                logoUrl: '',
                thoiGianThem: '20/2/2026, 16:10:00'
            }
        ],
        tongTien: 380000,
        hanhKhach: { hoTen: 'Phan Văn Minh', sdt: '0934567812', email: 'phanvanminh@gmail.com', cmnd: '001099078901' }
    },
    {
        maDon: 'VTH-9014',
        ngayMua: '28/2/2026, 08:50:00',
        danhSachVe: [
            {
                id: 'v025',
                loaiDichVu: 'Vietjet Air VJ-101',
                tuyen: 'HAN → SGN',
                gia: 990000,
                chiTiet: 'Ghế 22F · Hạng Phổ Thông · Airbus A321 · 12:00 - 14:10',
                loai: 'flight',
                logoUrl: 'img/Vietjet-Air.jpg',
                thoiGianThem: '28/2/2026, 08:45:00'
            },
            {
                id: 'v026',
                loaiDichVu: 'Vietjet Air VJ-101',
                tuyen: 'HAN → SGN',
                gia: 990000,
                chiTiet: 'Ghế 22E · Hạng Phổ Thông · Airbus A321 · 12:00 - 14:10',
                loai: 'flight',
                logoUrl: 'img/Vietjet-Air.jpg',
                thoiGianThem: '28/2/2026, 08:45:00'
            }
        ],
        tongTien: 1980000,
        hanhKhach: { hoTen: 'Nguyễn Thị Ngọc', sdt: '0945678923', email: 'nguyenthinoc@gmail.com', cmnd: '038099089012' }
    },
    {
        maDon: 'VTH-9015',
        ngayMua: '5/3/2026, 11:00:00',
        danhSachVe: [
            {
                id: 'v027',
                loaiDichVu: 'Tàu SE8 · Giường Cabin 2B',
                tuyen: 'DAD → HAN',
                gia: 920000,
                chiTiet: 'Toa 3 · Cabin 2 · Giường 2B · Giường Nằm Điều Hòa · 10:00 - 05:30 (+1)',
                loai: 'train',
                logoUrl: '',
                thoiGianThem: '5/3/2026, 10:55:00'
            }
        ],
        tongTien: 920000,
        hanhKhach: { hoTen: 'Cao Văn Phú', sdt: '0956789034', email: 'caovanphu@gmail.com', cmnd: '025099012345' }
    },
    {
        maDon: 'VTH-9016',
        ngayMua: '12/3/2026, 14:30:00',
        danhSachVe: [
            {
                id: 'v028',
                loaiDichVu: 'Vietnam Airlines VN-805',
                tuyen: 'SGN → PQC',
                gia: 2100000,
                chiTiet: 'Ghế 7A · Hạng Thương Gia · Airbus A321 · 09:20 - 10:30',
                loai: 'flight',
                logoUrl: 'img/Vietnam-Airlines.jpg',
                thoiGianThem: '12/3/2026, 14:25:00'
            },
            {
                id: 'v029',
                loaiDichVu: 'Vietnam Airlines VN-805',
                tuyen: 'SGN → PQC',
                gia: 2100000,
                chiTiet: 'Ghế 7B · Hạng Thương Gia · Airbus A321 · 09:20 - 10:30',
                loai: 'flight',
                logoUrl: 'img/Vietnam-Airlines.jpg',
                thoiGianThem: '12/3/2026, 14:25:00'
            },
            {
                id: 'v030',
                loaiDichVu: 'Vietnam Airlines VN-805',
                tuyen: 'SGN → PQC',
                gia: 2100000,
                chiTiet: 'Ghế 7C · Hạng Thương Gia · Airbus A321 · 09:20 - 10:30',
                loai: 'flight',
                logoUrl: 'img/Vietnam-Airlines.jpg',
                thoiGianThem: '12/3/2026, 14:25:00'
            },
            {
                id: 'v031',
                loaiDichVu: 'Vietnam Airlines VN-805',
                tuyen: 'SGN → PQC',
                gia: 2100000,
                chiTiet: 'Ghế 7D · Hạng Thương Gia · Airbus A321 · 09:20 - 10:30',
                loai: 'flight',
                logoUrl: 'img/Vietnam-Airlines.jpg',
                thoiGianThem: '12/3/2026, 14:25:00'
            }
        ],
        tongTien: 8400000,
        hanhKhach: { hoTen: 'Hà Thị Quỳnh', sdt: '0967890245', email: 'hathiquynh@gmail.com', cmnd: '080099067890' }
    },
    {
        maDon: 'VTH-9017',
        ngayMua: '20/3/2026, 09:15:00',
        danhSachVe: [
            {
                id: 'v032',
                loaiDichVu: 'Phương Trang Limousine VIP',
                tuyen: 'SGN → CXR',
                gia: 350000,
                chiTiet: 'Giường A1 Tầng Dưới · VIP Limo · 19:30 - 04:30',
                loai: 'bus',
                logoUrl: '',
                thoiGianThem: '20/3/2026, 09:10:00'
            },
            {
                id: 'v033',
                loaiDichVu: 'Phương Trang Limousine VIP',
                tuyen: 'SGN → CXR',
                gia: 350000,
                chiTiet: 'Giường A2 Tầng Dưới · VIP Limo · 19:30 - 04:30',
                loai: 'bus',
                logoUrl: '',
                thoiGianThem: '20/3/2026, 09:10:00'
            }
        ],
        tongTien: 700000,
        hanhKhach: { hoTen: 'Tô Văn Sang', sdt: '0978901356', email: 'tovansang@gmail.com', cmnd: '023099023456' }
    },
    {
        maDon: 'VTH-9018',
        ngayMua: '1/4/2026, 10:45:00',
        danhSachVe: [
            {
                id: 'v034',
                loaiDichVu: 'Tàu SE2 · Giường Cabin 4C',
                tuyen: 'HAN → SGN',
                gia: 820000,
                chiTiet: 'Toa VIP · Cabin 4 · Giường 4C · Giường Nằm Điều Hòa · 18:00 - 14:00 (+1)',
                loai: 'train',
                logoUrl: '',
                thoiGianThem: '1/4/2026, 10:40:00'
            },
            {
                id: 'v035',
                loaiDichVu: 'Tàu SE2 · Giường Cabin 4D',
                tuyen: 'HAN → SGN',
                gia: 820000,
                chiTiet: 'Toa VIP · Cabin 4 · Giường 4D · Giường Nằm Điều Hòa · 18:00 - 14:00 (+1)',
                loai: 'train',
                logoUrl: '',
                thoiGianThem: '1/4/2026, 10:40:00'
            }
        ],
        tongTien: 1640000,
        hanhKhach: { hoTen: 'Lê Thị Thúy', sdt: '0989012467', email: 'lethithuy@gmail.com', cmnd: '001099045678' }
    },
    {
        maDon: 'VTH-9019',
        ngayMua: '10/4/2026, 08:00:00',
        danhSachVe: [
            {
                id: 'v036',
                loaiDichVu: 'Bamboo Airways QH-401',
                tuyen: 'HAN → PQC',
                gia: 2600000,
                chiTiet: 'Ghế 11A · Hạng Phổ Thông · Airbus A320 Neo · 10:00 - 12:10',
                loai: 'flight',
                logoUrl: 'img/Bamboo-Airways.jpg',
                thoiGianThem: '10/4/2026, 07:55:00'
            }
        ],
        tongTien: 2600000,
        hanhKhach: { hoTen: 'Trần Quang Uyên', sdt: '0901234578', email: 'tranquanguyen@gmail.com', cmnd: '038099056790' }
    },
    {
        maDon: 'VTH-9020',
        ngayMua: '18/4/2026, 17:30:00',
        danhSachVe: [
            {
                id: 'v037',
                loaiDichVu: 'Hoàng Long VIP Limousine',
                tuyen: 'HAN → DAD',
                gia: 550000,
                chiTiet: 'Giường D1 Tầng Dưới · VIP Limo · 19:00 - 07:00',
                loai: 'bus',
                logoUrl: '',
                thoiGianThem: '18/4/2026, 17:25:00'
            },
            {
                id: 'v038',
                loaiDichVu: 'Hoàng Long VIP Limousine',
                tuyen: 'HAN → DAD',
                gia: 550000,
                chiTiet: 'Giường D2 Tầng Dưới · VIP Limo · 19:00 - 07:00',
                loai: 'bus',
                logoUrl: '',
                thoiGianThem: '18/4/2026, 17:25:00'
            }
        ],
        tongTien: 1100000,
        hanhKhach: { hoTen: 'Đỗ Văn Vinh', sdt: '0912345601', email: 'dovanvinh@gmail.com', cmnd: '025099034567' }
    },
    {
        maDon: 'VTH-9021',
        ngayMua: '25/4/2026, 11:00:00',
        danhSachVe: [
            {
                id: 'v039',
                loaiDichVu: 'Vietjet Air VJ-531',
                tuyen: 'HAN → DAD',
                gia: 1200000,
                chiTiet: 'Ghế 18C · Hạng Phổ Thông · Airbus A320 · 15:00 - 16:10',
                loai: 'flight',
                logoUrl: 'img/Vietjet-Air.jpg',
                thoiGianThem: '25/4/2026, 10:55:00'
            },
            {
                id: 'v040',
                loaiDichVu: 'Vietjet Air VJ-531',
                tuyen: 'HAN → DAD',
                gia: 1200000,
                chiTiet: 'Ghế 18D · Hạng Phổ Thông · Airbus A320 · 15:00 - 16:10',
                loai: 'flight',
                logoUrl: 'img/Vietjet-Air.jpg',
                thoiGianThem: '25/4/2026, 10:55:00'
            },
            {
                id: 'v041',
                loaiDichVu: 'Vietjet Air VJ-531',
                tuyen: 'HAN → DAD',
                gia: 1200000,
                chiTiet: 'Ghế 18E · Hạng Phổ Thông · Airbus A320 · 15:00 - 16:10',
                loai: 'flight',
                logoUrl: 'img/Vietjet-Air.jpg',
                thoiGianThem: '25/4/2026, 10:55:00'
            }
        ],
        tongTien: 3600000,
        hanhKhach: { hoTen: 'Nguyễn Hoàng Xuân', sdt: '0923456712', email: 'nguyenhoangxuan@gmail.com', cmnd: '080099078901' }
    },
    {
        maDon: 'VTH-9022',
        ngayMua: '3/5/2026, 09:00:00',
        danhSachVe: [
            {
                id: 'v042',
                loaiDichVu: 'Tàu SE22 · Ghế Mềm 8A',
                tuyen: 'SGN → NHA',
                gia: 450000,
                chiTiet: 'Toa 2 · Ghế 8A · Ghế Mềm Điều Hòa · 06:00 - 14:00',
                loai: 'train',
                logoUrl: '',
                thoiGianThem: '3/5/2026, 08:55:00'
            }
        ],
        tongTien: 450000,
        hanhKhach: { hoTen: 'Phạm Thị Yến', sdt: '0934567823', email: 'phamthiyen@gmail.com', cmnd: '023099045678' }
    },
    {
        maDon: 'VTH-9023',
        ngayMua: '10/5/2026, 15:20:00',
        danhSachVe: [
            {
                id: 'v043',
                loaiDichVu: 'Vietnam Airlines VN-1363',
                tuyen: 'SGN → DLI',
                gia: 1650000,
                chiTiet: 'Ghế 5A · Hạng Phổ Thông · Airbus A321 · 09:00 - 09:55',
                loai: 'flight',
                logoUrl: 'img/Vietnam-Airlines.jpg',
                thoiGianThem: '10/5/2026, 15:15:00'
            },
            {
                id: 'v044',
                loaiDichVu: 'Vietnam Airlines VN-1363',
                tuyen: 'SGN → DLI',
                gia: 1650000,
                chiTiet: 'Ghế 5B · Hạng Phổ Thông · Airbus A321 · 09:00 - 09:55',
                loai: 'flight',
                logoUrl: 'img/Vietnam-Airlines.jpg',
                thoiGianThem: '10/5/2026, 15:15:00'
            }
        ],
        tongTien: 3300000,
        hanhKhach: { hoTen: 'Vương Văn Dũng', sdt: '0945678934', email: 'vuongvandung@gmail.com', cmnd: '001099056789' }
    },
    {
        maDon: 'VTH-9024',
        ngayMua: '15/5/2026, 07:45:00',
        danhSachVe: [
            {
                id: 'v045',
                loaiDichVu: 'Phương Trang Giường Nằm',
                tuyen: 'SGN → DLI',
                gia: 230000,
                chiTiet: 'Giường C8 Tầng Trên · Standard 40 Chỗ · 21:00 - 04:00',
                loai: 'bus',
                logoUrl: '',
                thoiGianThem: '15/5/2026, 07:40:00'
            },
            {
                id: 'v046',
                loaiDichVu: 'Phương Trang Giường Nằm',
                tuyen: 'SGN → DLI',
                gia: 230000,
                chiTiet: 'Giường C9 Tầng Trên · Standard 40 Chỗ · 21:00 - 04:00',
                loai: 'bus',
                logoUrl: '',
                thoiGianThem: '15/5/2026, 07:40:00'
            },
            {
                id: 'v047',
                loaiDichVu: 'Phương Trang Giường Nằm',
                tuyen: 'SGN → DLI',
                gia: 230000,
                chiTiet: 'Giường C10 Tầng Trên · Standard 40 Chỗ · 21:00 - 04:00',
                loai: 'bus',
                logoUrl: '',
                thoiGianThem: '15/5/2026, 07:40:00'
            }
        ],
        tongTien: 690000,
        hanhKhach: { hoTen: 'Lâm Thị Châu', sdt: '0956789145', email: 'lamthichau@gmail.com', cmnd: '038099012345' }
    },
    {
        maDon: 'VTH-9025',
        ngayMua: '22/5/2026, 12:00:00',
        danhSachVe: [
            {
                id: 'v048',
                loaiDichVu: 'Bamboo Airways QH-301',
                tuyen: 'SGN → HAN',
                gia: 1380000,
                chiTiet: 'Ghế 25A · Hạng Phổ Thông · Airbus A320 Neo · 11:00 - 13:15',
                loai: 'flight',
                logoUrl: 'img/Bamboo-Airways.jpg',
                thoiGianThem: '22/5/2026, 11:55:00'
            },
            {
                id: 'v049',
                loaiDichVu: 'Bamboo Airways QH-301',
                tuyen: 'SGN → HAN',
                gia: 1380000,
                chiTiet: 'Ghế 25B · Hạng Phổ Thông · Airbus A320 Neo · 11:00 - 13:15',
                loai: 'flight',
                logoUrl: 'img/Bamboo-Airways.jpg',
                thoiGianThem: '22/5/2026, 11:55:00'
            }
        ],
        tongTien: 2760000,
        hanhKhach: { hoTen: 'Bạch Văn Điệp', sdt: '0967890356', email: 'bachvandiep@gmail.com', cmnd: '025099056789' }
    },
    {
        maDon: 'VTH-9026',
        ngayMua: '27/5/2026, 16:00:00',
        danhSachVe: [
            {
                id: 'v050',
                loaiDichVu: 'Tàu SE7 · Giường Cabin 3A',
                tuyen: 'SGN → DAD',
                gia: 690000,
                chiTiet: 'Toa 2 · Cabin 3 · Giường 3A · Giường Nằm Điều Hòa · 19:30 - 12:45',
                loai: 'train',
                logoUrl: '',
                thoiGianThem: '27/5/2026, 15:55:00'
            },
            {
                id: 'v051',
                loaiDichVu: 'Tàu SE7 · Giường Cabin 3B',
                tuyen: 'SGN → DAD',
                gia: 690000,
                chiTiet: 'Toa 2 · Cabin 3 · Giường 3B · Giường Nằm Điều Hòa · 19:30 - 12:45',
                loai: 'train',
                logoUrl: '',
                thoiGianThem: '27/5/2026, 15:55:00'
            }
        ],
        tongTien: 1380000,
        hanhKhach: { hoTen: 'Kiều Thị Phương', sdt: '0978901467', email: 'kieutaphuong@gmail.com', cmnd: '080099023456' }
    },
    {
        maDon: 'VTH-9027',
        ngayMua: '29/5/2026, 08:30:00',
        danhSachVe: [
            {
                id: 'v052',
                loaiDichVu: 'Vietjet Air VJ-701',
                tuyen: 'SGN → PQC',
                gia: 1450000,
                chiTiet: 'Ghế 20A · Hạng Phổ Thông · Airbus A320 · 14:00 - 15:05',
                loai: 'flight',
                logoUrl: 'img/Vietjet-Air.jpg',
                thoiGianThem: '29/5/2026, 08:25:00'
            }
        ],
        tongTien: 1450000,
        hanhKhach: { hoTen: 'Mai Văn Quang', sdt: '0989012578', email: 'maivanquang@gmail.com', cmnd: '023099067890' }
    },
    {
        maDon: 'VTH-9028',
        ngayMua: '30/5/2026, 10:15:00',
        danhSachVe: [
            {
                id: 'v053',
                loaiDichVu: 'Hoàng Long Cabin VIP',
                tuyen: 'SGN → CXR',
                gia: 390000,
                chiTiet: 'Cabin 2 · Giường Dưới · VIP 2 Tầng · 21:00 - 06:00',
                loai: 'bus',
                logoUrl: '',
                thoiGianThem: '30/5/2026, 10:10:00'
            },
            {
                id: 'v054',
                loaiDichVu: 'Hoàng Long Cabin VIP',
                tuyen: 'SGN → CXR',
                gia: 390000,
                chiTiet: 'Cabin 2 · Giường Trên · VIP 2 Tầng · 21:00 - 06:00',
                loai: 'bus',
                logoUrl: '',
                thoiGianThem: '30/5/2026, 10:10:00'
            },
            {
                id: 'v055',
                loaiDichVu: 'Hoàng Long Cabin VIP',
                tuyen: 'SGN → CXR',
                gia: 390000,
                chiTiet: 'Cabin 3 · Giường Dưới · VIP 2 Tầng · 21:00 - 06:00',
                loai: 'bus',
                logoUrl: '',
                thoiGianThem: '30/5/2026, 10:10:00'
            }
        ],
        tongTien: 1170000,
        hanhKhach: { hoTen: 'Nguyễn Thị Rạng', sdt: '0901234590', email: 'nguyenthrang@gmail.com', cmnd: '001099089012' }
    },
    {
        maDon: 'VTH-9029',
        ngayMua: '30/5/2026, 14:00:00',
        danhSachVe: [
            {
                id: 'v056',
                loaiDichVu: 'Vietnam Airlines VN-539',
                tuyen: 'HAN → DAD',
                gia: 1900000,
                chiTiet: 'Ghế 4A · Hạng Phổ Thông · Airbus A321 Neo · 07:45 - 08:55',
                loai: 'flight',
                logoUrl: 'img/Vietnam-Airlines.jpg',
                thoiGianThem: '30/5/2026, 13:55:00'
            }
        ],
        tongTien: 1900000,
        hanhKhach: { hoTen: 'Trần Văn Sơn', sdt: '0912345702', email: 'tranvanson@gmail.com', cmnd: '038099023456' }
    },
    {
        maDon: 'VTH-9030',
        ngayMua: '30/5/2026, 17:45:00',
        danhSachVe: [
            {
                id: 'v057',
                loaiDichVu: 'Tàu SE4 · Ghế Mềm 15B',
                tuyen: 'HAN → SGN',
                gia: 750000,
                chiTiet: 'Toa 3 · Ghế 15B · Ghế Mềm Điều Hòa · 21:00 - 17:00 (+1)',
                loai: 'train',
                logoUrl: '',
                thoiGianThem: '30/5/2026, 17:40:00'
            },
            {
                id: 'v058',
                loaiDichVu: 'Tàu SE4 · Ghế Mềm 15C',
                tuyen: 'HAN → SGN',
                gia: 750000,
                chiTiet: 'Toa 3 · Ghế 15C · Ghế Mềm Điều Hòa · 21:00 - 17:00 (+1)',
                loai: 'train',
                logoUrl: '',
                thoiGianThem: '30/5/2026, 17:40:00'
            },
            {
                id: 'v059',
                loaiDichVu: 'Tàu SE4 · Ghế Mềm 15D',
                tuyen: 'HAN → SGN',
                gia: 750000,
                chiTiet: 'Toa 3 · Ghế 15D · Ghế Mềm Điều Hòa · 21:00 - 17:00 (+1)',
                loai: 'train',
                logoUrl: '',
                thoiGianThem: '30/5/2026, 17:40:00'
            },
            {
                id: 'v060',
                loaiDichVu: 'Tàu SE4 · Ghế Mềm 15A',
                tuyen: 'HAN → SGN',
                gia: 750000,
                chiTiet: 'Toa 3 · Ghế 15A · Ghế Mềm Điều Hòa · 21:00 - 17:00 (+1)',
                loai: 'train',
                logoUrl: '',
                thoiGianThem: '30/5/2026, 17:40:00'
            }
        ],
        tongTien: 3000000,
        hanhKhach: { hoTen: 'Hứa Thị Tuyết', sdt: '0923456823', email: 'huathituyet@gmail.com', cmnd: '025099078901' }
    },
    {
        maDon: 'VTH-9031',
        ngayMua: '8/12/2025, 10:30:00',
        danhSachVe: [
            {
                id: 'v061',
                loaiDichVu: 'Vietjet Air VJ-122',
                tuyen: 'SGN → HAN',
                gia: 1150000,
                chiTiet: 'Ghế 14D · Hạng Phổ Thông · Airbus A320 · 08:30 - 10:45',
                loai: 'flight',
                logoUrl: 'img/Vietjet-Air.jpg',
                thoiGianThem: '8/12/2025, 10:25:00'
            }
        ],
        tongTien: 1150000,
        hanhKhach: { hoTen: 'Phùng Quốc Việt', sdt: '0908887766', email: 'vietpq@gmail.com', cmnd: '001099123456' }
    },
    {
        maDon: 'VTH-9032',
        ngayMua: '22/12/2025, 14:15:00',
        danhSachVe: [
            {
                id: 'v062',
                loaiDichVu: 'Tàu SE3 · Ghế Mềm 10A',
                tuyen: 'SGN → HAN',
                gia: 780000,
                chiTiet: 'Toa 1 · Ghế 10A · Ghế Mềm Điều Hòa · 22:00 - 17:00 (+1)',
                loai: 'train',
                logoUrl: '',
                thoiGianThem: '22/12/2025, 14:10:00'
            },
            {
                id: 'v063',
                loaiDichVu: 'Tàu SE3 · Ghế Mềm 10B',
                tuyen: 'SGN → HAN',
                gia: 780000,
                chiTiet: 'Toa 1 · Ghế 10B · Ghế Mềm Điều Hòa · 22:00 - 17:00 (+1)',
                loai: 'train',
                logoUrl: '',
                thoiGianThem: '22/12/2025, 14:10:00'
            }
        ],
        tongTien: 1560000,
        hanhKhach: { hoTen: 'Lý Khánh Vân', sdt: '0917776655', email: 'vanlk@gmail.com', cmnd: '002099234567' }
    },
    {
        maDon: 'VTH-9033',
        ngayMua: '10/1/2026, 09:30:00',
        danhSachVe: [
            {
                id: 'v064',
                loaiDichVu: 'Thành Bưởi Cabin Royal',
                tuyen: 'SGN → DLI',
                gia: 420000,
                chiTiet: 'Cabin 5 · Giường Dưới · Phòng nằm Cabin Royal · 23:30 - 06:30',
                loai: 'bus',
                logoUrl: '',
                thoiGianThem: '10/1/2026, 09:25:00'
            }
        ],
        tongTien: 420000,
        hanhKhach: { hoTen: 'Trần Anh Tuấn', sdt: '0926665544', email: 'tuanta@gmail.com', cmnd: '003099345678' }
    },
    {
        maDon: 'VTH-9034',
        ngayMua: '29/1/2026, 16:40:00',
        danhSachVe: [
            {
                id: 'v065',
                loaiDichVu: 'Bamboo Airways QH-301',
                tuyen: 'SGN → HAN',
                gia: 1380000,
                chiTiet: 'Ghế 12E · Hạng Phổ Thông · Airbus A320 Neo · 11:00 - 13:15',
                loai: 'flight',
                logoUrl: 'img/Bamboo-Airways.jpg',
                thoiGianThem: '29/1/2026, 16:35:00'
            },
            {
                id: 'v066',
                loaiDichVu: 'Bamboo Airways QH-301',
                tuyen: 'SGN → HAN',
                gia: 1380000,
                chiTiet: 'Ghế 12F · Hạng Phổ Thông · Airbus A320 Neo · 11:00 - 13:15',
                loai: 'flight',
                logoUrl: 'img/Bamboo-Airways.jpg',
                thoiGianThem: '29/1/2026, 16:35:00'
            }
        ],
        tongTien: 2760000,
        hanhKhach: { hoTen: 'Nguyễn Minh Thu', sdt: '0935554433', email: 'thunm@gmail.com', cmnd: '004099456789' }
    },
    {
        maDon: 'VTH-9035',
        ngayMua: '5/2/2026, 11:20:00',
        danhSachVe: [
            {
                id: 'v067',
                loaiDichVu: 'Tàu SE7 · Giường Cabin 2A',
                tuyen: 'SGN → DAD',
                gia: 690000,
                chiTiet: 'Toa 3 · Cabin 2 · Giường 2A (Dưới) · Giường Nằm Điều Hòa · 19:30 - 12:45',
                loai: 'train',
                logoUrl: '',
                thoiGianThem: '5/2/2026, 11:15:00'
            }
        ],
        tongTien: 690000,
        hanhKhach: { hoTen: 'Đỗ Gia Bảo', sdt: '0944443322', email: 'baodg@gmail.com', cmnd: '005099567890' }
    },
    {
        maDon: 'VTH-9036',
        ngayMua: '22/2/2026, 08:15:00',
        danhSachVe: [
            {
                id: 'v068',
                loaiDichVu: 'Phương Trang Giường Nằm',
                tuyen: 'SGN → DLI',
                gia: 230000,
                chiTiet: 'Giường A15 Tầng Dưới · Standard 40 Chỗ · 21:00 - 04:00',
                loai: 'bus',
                logoUrl: '',
                thoiGianThem: '22/2/2026, 08:10:00'
            },
            {
                id: 'v069',
                loaiDichVu: 'Phương Trang Giường Nằm',
                tuyen: 'SGN → DLI',
                gia: 230000,
                chiTiet: 'Giường A16 Tầng Dưới · Standard 40 Chỗ · 21:00 - 04:00',
                loai: 'bus',
                logoUrl: '',
                thoiGianThem: '22/2/2026, 08:10:00'
            }
        ],
        tongTien: 460000,
        hanhKhach: { hoTen: 'Phạm Hà My', sdt: '0953332211', email: 'myph@gmail.com', cmnd: '006099678901' }
    },
    {
        maDon: 'VTH-9037',
        ngayMua: '8/3/2026, 15:45:00',
        danhSachVe: [
            {
                id: 'v070',
                loaiDichVu: 'Tàu SE5 · Giường Cabin 3A',
                tuyen: 'SGN → DAD',
                gia: 850000,
                chiTiet: 'Toa 4 · Cabin 3 · Giường 3A (Dưới) · Giường Nằm Điều Hòa · 21:00 - 14:00',
                loai: 'train',
                logoUrl: '',
                thoiGianThem: '8/3/2026, 15:40:00'
            },
            {
                id: 'v071',
                loaiDichVu: 'Tàu SE5 · Giường Cabin 3B',
                tuyen: 'SGN → DAD',
                gia: 850000,
                chiTiet: 'Toa 4 · Cabin 3 · Giường 3B (Dưới) · Giường Nằm Điều Hòa · 21:00 - 14:00',
                loai: 'train',
                logoUrl: '',
                thoiGianThem: '8/3/2026, 15:40:00'
            }
        ],
        tongTien: 1700000,
        hanhKhach: { hoTen: 'Nguyễn Hoài Nam', sdt: '0962221100', email: 'namnh@gmail.com', cmnd: '007099789012' }
    },
    {
        maDon: 'VTH-9038',
        ngayMua: '18/3/2026, 09:20:00',
        danhSachVe: [
            {
                id: 'v072',
                loaiDichVu: 'Vietnam Airlines VN-243',
                tuyen: 'SGN → HAN',
                gia: 2950000,
                chiTiet: 'Ghế 3C · Hạng Thương Gia · Boeing 787-9 · 14:30 - 16:45',
                loai: 'flight',
                logoUrl: 'img/Vietnam-Airlines.jpg',
                thoiGianThem: '18/3/2026, 09:15:00'
            }
        ],
        tongTien: 2950000,
        hanhKhach: { hoTen: 'Lê Ngọc Linh', sdt: '0971110099', email: 'linhln@gmail.com', cmnd: '008099890123' }
    },
    {
        maDon: 'VTH-9039',
        ngayMua: '28/3/2026, 13:10:00',
        danhSachVe: [
            {
                id: 'v073',
                loaiDichVu: 'Hoàng Long Giường Nằm',
                tuyen: 'HAN → SGN',
                gia: 700000,
                chiTiet: 'Giường A1 Tầng Dưới · Giường nằm cao cấp · 08:00 - 08:00 (+1)',
                loai: 'bus',
                logoUrl: '',
                thoiGianThem: '28/3/2026, 13:05:00'
            },
            {
                id: 'v074',
                loaiDichVu: 'Hoàng Long Giường Nằm',
                tuyen: 'HAN → SGN',
                gia: 700000,
                chiTiet: 'Giường A2 Tầng Dưới · Giường nằm cao cấp · 08:00 - 08:00 (+1)',
                loai: 'bus',
                logoUrl: '',
                thoiGianThem: '28/3/2026, 13:05:00'
            },
            {
                id: 'v075',
                loaiDichVu: 'Hoàng Long Giường Nằm',
                tuyen: 'HAN → SGN',
                gia: 700000,
                chiTiet: 'Giường A3 Tầng Dưới · Giường nằm cao cấp · 08:00 - 08:00 (+1)',
                loai: 'bus',
                logoUrl: '',
                thoiGianThem: '28/3/2026, 13:05:00'
            }
        ],
        tongTien: 2100000,
        hanhKhach: { hoTen: 'Vũ Tiến Đạt', sdt: '0980009988', email: 'datvt@gmail.com', cmnd: '009099901234' }
    },
    {
        maDon: 'VTH-9040',
        ngayMua: '5/4/2026, 14:15:00',
        danhSachVe: [
            {
                id: 'v076',
                loaiDichVu: 'Tàu SE22 Nha Trang · Ghế Mềm 12B',
                tuyen: 'SGN → NHA',
                gia: 450000,
                chiTiet: 'Toa 1 · Ghế 12B · Ghế Mềm Điều Hòa · 06:00 - 14:00',
                loai: 'train',
                logoUrl: '',
                thoiGianThem: '5/4/2026, 14:10:00'
            }
        ],
        tongTien: 450000,
        hanhKhach: { hoTen: 'Hoàng Thanh Thảo', sdt: '0909998877', email: 'thaoht@gmail.com', cmnd: '010099012345' }
    },
    {
        maDon: 'VTH-9041',
        ngayMua: '15/4/2026, 11:45:00',
        danhSachVe: [
            {
                id: 'v077',
                loaiDichVu: 'Vietjet Air VJ-355',
                tuyen: 'SGN → DAD',
                gia: 1100000,
                chiTiet: 'Ghế 8E · Hạng Phổ Thông · Airbus A321 · 06:00 - 07:10',
                loai: 'flight',
                logoUrl: 'img/Vietjet-Air.jpg',
                thoiGianThem: '15/4/2026, 11:40:00'
            },
            {
                id: 'v078',
                loaiDichVu: 'Vietjet Air VJ-355',
                tuyen: 'SGN → DAD',
                gia: 1100000,
                chiTiet: 'Ghế 8F · Hạng Phổ Thông · Airbus A321 · 06:00 - 07:10',
                loai: 'flight',
                logoUrl: 'img/Vietjet-Air.jpg',
                thoiGianThem: '15/4/2026, 11:40:00'
            }
        ],
        tongTien: 2200000,
        hanhKhach: { hoTen: 'Trần Thế Vinh', sdt: '0918887766', email: 'vinhtt@gmail.com', cmnd: '011099123456' }
    },
    {
        maDon: 'VTH-9042',
        ngayMua: '28/4/2026, 16:30:00',
        danhSachVe: [
            {
                id: 'v079',
                loaiDichVu: 'Thành Bưởi Premium Cabin',
                tuyen: 'SGN → DAD',
                gia: 480000,
                chiTiet: 'Cabin 4 · Giường Dưới · Phòng nằm Cabin Premium · 16:00 - 06:00 (+1)',
                loai: 'bus',
                logoUrl: '',
                thoiGianThem: '28/4/2026, 16:25:00'
            }
        ],
        tongTien: 480000,
        hanhKhach: { hoTen: 'Lương Quốc Khánh', sdt: '0927776655', email: 'khanhlq@gmail.com', cmnd: '012099234567' }
    },
    {
        maDon: 'VTH-9043',
        ngayMua: '12/5/2026, 09:10:00',
        danhSachVe: [
            {
                id: 'v080',
                loaiDichVu: 'Tàu SE8 · Giường Cabin 4A',
                tuyen: 'DAD → HAN',
                gia: 920000,
                chiTiet: 'Toa 1 · Cabin 4 · Giường 4A (Dưới) · Giường Nằm Điều Hòa · 10:00 - 05:30 (+1)',
                loai: 'train',
                logoUrl: '',
                thoiGianThem: '12/5/2026, 09:05:00'
            },
            {
                id: 'v081',
                loaiDichVu: 'Tàu SE8 · Giường Cabin 4B',
                tuyen: 'DAD → HAN',
                gia: 920000,
                chiTiet: 'Toa 1 · Cabin 4 · Giường 4B (Dưới) · Giường Nằm Điều Hòa · 10:00 - 05:30 (+1)',
                loai: 'train',
                logoUrl: '',
                thoiGianThem: '12/5/2026, 09:05:00'
            }
        ],
        tongTien: 1840000,
        hanhKhach: { hoTen: 'Phan Quỳnh Anh', sdt: '0936665544', email: 'anhpq@gmail.com', cmnd: '013099345678' }
    },
    {
        maDon: 'VTH-9044',
        ngayMua: '18/5/2026, 14:50:00',
        danhSachVe: [
            {
                id: 'v082',
                loaiDichVu: 'Vietnam Airlines VN-565',
                tuyen: 'SGN → CXR',
                gia: 1800000,
                chiTiet: 'Ghế 12A · Hạng Phổ Thông · Airbus A350 · 07:30 - 08:30',
                loai: 'flight',
                logoUrl: 'img/Vietnam-Airlines.jpg',
                thoiGianThem: '18/5/2026, 14:45:00'
            }
        ],
        tongTien: 1800000,
        hanhKhach: { hoTen: 'Đặng Minh Quân', sdt: '0945554433', email: 'quandm@gmail.com', cmnd: '014099456789' }
    },
    {
        maDon: 'VTH-9045',
        ngayMua: '29/5/2026, 17:10:00',
        danhSachVe: [
            {
                id: 'v083',
                loaiDichVu: 'Hạnh Cafe Giường Nằm',
                tuyen: 'SGN → CXR',
                gia: 250000,
                chiTiet: 'Giường A1 Tầng Dưới · Standard 40 Chỗ · 20:00 - 05:00 (+1)',
                loai: 'bus',
                logoUrl: '',
                thoiGianThem: '29/5/2026, 17:05:00'
            },
            {
                id: 'v084',
                loaiDichVu: 'Hạnh Cafe Giường Nằm',
                tuyen: 'SGN → CXR',
                gia: 250000,
                chiTiet: 'Giường A2 Tầng Dưới · Standard 40 Chỗ · 20:00 - 05:00 (+1)',
                loai: 'bus',
                logoUrl: '',
                thoiGianThem: '29/5/2026, 17:05:00'
            }
        ],
        tongTien: 500000,
        hanhKhach: { hoTen: 'Bùi Tuyết Mai', sdt: '0954443322', email: 'maibt@gmail.com', cmnd: '015099567890' }
    }
];

// ---------------------------------------------------------------
// SEED DỮ LIỆU VÀO localStorage (chỉ seed nếu dữ liệu cũ/lỗi thời)
// Gọi ngay khi data.js được load, trước các trang khác
// ---------------------------------------------------------------
(function seedData() {
    var KEY_LICHSU = 'viettravel_lichsu';
    var lichSuHienTai = JSON.parse(localStorage.getItem(KEY_LICHSU)) || [];
    
    // Kiểm tra xem dữ liệu trong localStorage có bị lỗi thời (dùng thongTinKH hoặc thiếu ngayMua)
    var canReSeed = lichSuHienTai.length < 35 || lichSuHienTai.some(function(don) {
        return don.thongTinKH || !don.ngayMua || !don.hanhKhach || !don.danhSachVe || 
               don.danhSachVe.some(function(ve) { return !ve.loaiDichVu; });
    });

    if (canReSeed) {
        localStorage.setItem(KEY_LICHSU, JSON.stringify(mockOrders));
    }

    // Seed tuyến đường quản lý: chỉ seed nếu chưa có hoặc có quá ít (để đảm bảo lấy đủ tuyến mặc định)
    var KEY_TUYEN = 'vth_admin_tuyen';
    var tuyenHienTai = JSON.parse(localStorage.getItem(KEY_TUYEN)) || [];
    if (tuyenHienTai.length < 23) {
        var tuyenMacDinh = [
            { id: 1, tenTuyen: 'SGN → HAN', loai: 'Máy Bay', thoiGian: '2h 15p', giaTu: 1150000 },
            { id: 2, tenTuyen: 'HAN → SGN', loai: 'Máy Bay', thoiGian: '2h 15p', giaTu: 990000 },
            { id: 3, tenTuyen: 'SGN → DAD', loai: 'Máy Bay', thoiGian: '1h 10p', giaTu: 1100000 },
            { id: 4, tenTuyen: 'DAD → SGN', loai: 'Máy Bay', thoiGian: '1h 15p', giaTu: 1050000 },
            { id: 5, tenTuyen: 'HAN → PQC', loai: 'Máy Bay', thoiGian: '2h 10p', giaTu: 2600000 },
            { id: 6, tenTuyen: 'SGN → PQC', loai: 'Máy Bay', thoiGian: '1h 10p', giaTu: 1450000 },
            { id: 7, tenTuyen: 'SGN → CXR', loai: 'Máy Bay', thoiGian: '1h 00p', giaTu: 1550000 },
            { id: 8, tenTuyen: 'SGN → DLI', loai: 'Máy Bay', thoiGian: '0h 55p', giaTu: 1650000 },
            { id: 9, tenTuyen: 'HAN → DAD', loai: 'Máy Bay', thoiGian: '1h 10p', giaTu: 1200000 },
            { id: 10, tenTuyen: 'SGN → HAN', loai: 'Tàu Hỏa', thoiGian: '31h 00p', giaTu: 780000 },
            { id: 11, tenTuyen: 'HAN → SGN', loai: 'Tàu Hỏa', thoiGian: '32h 00p', giaTu: 750000 },
            { id: 12, tenTuyen: 'SGN → DAD', loai: 'Tàu Hỏa', thoiGian: '17h 15p', giaTu: 690000 },
            { id: 13, tenTuyen: 'DAD → HAN', loai: 'Tàu Hỏa', thoiGian: '19h 30p', giaTu: 920000 },
            { id: 14, tenTuyen: 'HAN → DAD', loai: 'Tàu Hỏa', thoiGian: '19h 00p', giaTu: 880000 },
            { id: 15, tenTuyen: 'SGN → NHA', loai: 'Tàu Hỏa', thoiGian: '8h 00p', giaTu: 420000 },
            { id: 16, tenTuyen: 'NHA → SGN', loai: 'Tàu Hỏa', thoiGian: '8h 00p', giaTu: 430000 },
            { id: 17, tenTuyen: 'HAN → NHA', loai: 'Tàu Hỏa', thoiGian: '24h 30p', giaTu: 760000 },
            { id: 18, tenTuyen: 'SGN → DLI', loai: 'Xe Khách', thoiGian: '7h 00p', giaTu: 230000 },
            { id: 19, tenTuyen: 'SGN → CXR', loai: 'Xe Khách', thoiGian: '9h 00p', giaTu: 250000 },
            { id: 20, tenTuyen: 'HAN → DAD', loai: 'Xe Khách', thoiGian: '12h 00p', giaTu: 380000 },
            { id: 21, tenTuyen: 'DAD → SGN', loai: 'Xe Khách', thoiGian: '14h 00p', giaTu: 320000 },
            { id: 22, tenTuyen: 'SGN → DAD', loai: 'Xe Khách', thoiGian: '14h 00p', giaTu: 480000 },
            { id: 23, tenTuyen: 'HAN → SGN', loai: 'Xe Khách', thoiGian: '24h 00p', giaTu: 700000 }
        ];
        localStorage.setItem(KEY_TUYEN, JSON.stringify(tuyenMacDinh));
    }
})();
