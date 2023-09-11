const images = {
    logo: require('./images/logo.svg'),
    youtube: require('./icons/youtube.svg'),
    facebook: require('./icons/facebook.svg'),
    tiktok: require('./icons/tiktok.svg'),
    zalo: require('./icons/zalo.svg'),
    weather: require('./icons/weather.png'),
    down: require('./icons/down.svg'),
    test_img: require('./images/test_img.jpg'),
    blank_img: require('./images/blank-picture.png'),
    png404: require('./images/404.png'),
    gif404: require('./images/4041.gif'),
    like: require('./icons/like.png'),
    nolike: require('./icons/nolike.png'),
};

const info = {
    hotline: '123456789',
    email: 'tung.ot204619@sis.hust.edu.vn',
    contactAdv: '123456789',
    youtube: 'https://www.youtube.com/',
    facebook: 'https://www.facebook.com/',
    zalo: 'https://zalo.me/',
    tiktok: 'https://www.tiktok.com/',
    editor: 'Ong Thế Tùng',
    defutyEditor1: 'Ong Thế Tùng',
    defutyEditor2: 'Ong Thế Tùng',
    memberEBEC: 'Ong Thế Tùng',
    copyRight:
        'Giấy phép xuất bản số ABC - BTTTT cấp ngày 26.8.2023 © 2023-2024 Bản quyền thuộc về Báo ABC. Cấm sao chép dưới mọi hình thức nếu không có sự chấp thuận bằng văn bản.',
};

const itemsNav = [
    {
        mainItem: 'Thời sự',
        items: [
            { nameItem: 'Chính trị' },
            { nameItem: 'Dân sinh' },
            { nameItem: 'Pháp luật' },
            { nameItem: 'Quốc phòng' },
            { nameItem: 'Quyền được biết' },
            { nameItem: 'Thời luận' },
            { nameItem: 'Phóng sự - Điều tra' },
            { nameItem: 'Lao động - Việc làm' },
            { nameItem: 'Chống tin giả' },
        ],
    },
    {
        mainItem: 'Thế giới',
        items: [
            { nameItem: 'Kinh tế thế giới' },
            { nameItem: 'Quân sự' },
            { nameItem: 'Góc nhìn' },
            { nameItem: 'Hồ sơ' },
            { nameItem: 'Người Việt năm châu' },
            { nameItem: 'Chuyện lạ' },
        ],
    },
    {
        mainItem: 'Kinh tế',
        items: [
            { nameItem: 'Kinh tế xanh' },
            { nameItem: 'Chính sách - Phát triển' },
            { nameItem: 'Ngân hàng' },
            { nameItem: 'Chứng khoán' },
            { nameItem: 'Doanh nghiệp' },
            { nameItem: 'Khát vọng Việt Nam' },
            { nameItem: 'Làm giàu' },
            { nameItem: 'Địa ốc' },
        ],
    },
    {
        mainItem: 'Đời sống',
        items: [
            { nameItem: 'Tết' },
            { nameItem: 'Người sống quanh ta' },
            { nameItem: 'Gia đình' },
            { nameItem: 'Ẩm thực' },
            { nameItem: 'Cộng đồng' },
            { nameItem: 'Một nửa thế giới' },
        ],
    },
    {
        mainItem: 'Sức khỏe',
        items: [{ nameItem: 'Khỏe đẹp mỗi ngày' }, { nameItem: 'Làm đẹp' }, { nameItem: 'Giới tính' }],
    },
    {
        mainItem: 'Giới trẻ',
        items: [
            { nameItem: 'Sống - Yêu - Ăn - Chơi' },
            { nameItem: 'Tiếp sức gen Z mùa thi' },
            { nameItem: 'Cơ hội nghề nghiệp' },
            { nameItem: 'Đoàn - Hội' },
            { nameItem: 'Kết nối' },
            { nameItem: 'Khởi nghiệp' },
            { nameItem: 'Thế giới mạng' },
            { nameItem: 'Gương mặt trẻ' },
        ],
    },
    {
        mainItem: 'Giáo dục',
        items: [
            { nameItem: 'Tuyển sinh' },
            { nameItem: 'Chọn nghề - Chọn trường' },
            { nameItem: 'Du học' },
            { nameItem: 'Nhà trường' },
            { nameItem: 'Phụ huynh' },
            { nameItem: 'Tra cứu điểm thi' },
            { nameItem: 'Cẩm nang tuyển sinh 2023' },
        ],
    },
    {
        mainItem: 'Du lịch',
        items: [
            { nameItem: 'Khám phá' },
            { nameItem: 'Tin tức - Sự kiện' },
            { nameItem: 'Chơi gì, ăn đâu, đi thế nào?' },
            { nameItem: 'Bất động sản du lịch' },
            { nameItem: 'Câu chuyện du lịch' },
        ],
    },
    {
        mainItem: 'Văn hóa',
        items: [
            { nameItem: 'Hào khí miền Đông' },
            { nameItem: 'Câu chuyện văn hóa' },
            { nameItem: 'Khảo cứu' },
            { nameItem: 'Xem - Nghe' },
            { nameItem: 'Sách hay' },
            { nameItem: 'Sống đẹp' },
            { nameItem: 'Món ngon Hà Nội' },
            { nameItem: 'Nghĩa tình miền Tây' },
        ],
    },
    {
        mainItem: 'Giải trí',
        items: [{ nameItem: 'Kết nối' }, { nameItem: 'Phim' }, { nameItem: 'Truyền hình' }, { nameItem: 'Đời nghệ sĩ' }],
    },
    {
        mainItem: 'Thể thao',
        items: [
            { nameItem: 'World Cup nữ 2023' },
            { nameItem: 'Bóng đá Thanh Niên Sinh viên' },
            { nameItem: 'Bóng đá Việt Nam' },
            { nameItem: 'Bóng đá Quốc tế' },
            { nameItem: 'Tin chuyển nhượng' },
            { nameItem: 'Thể thao & Cộng đồng' },
            { nameItem: 'Thể thao khác' },
            { nameItem: 'Bóng rổ' },
        ],
    },
    {
        mainItem: 'Công nghệ - Game',
        items: [
            { nameItem: 'Tin tức công nghệ' },
            { nameItem: 'Blockchain' },
            { nameItem: 'Sản phẩm' },
            { nameItem: 'Xu hướng - Chuyển đổi số' },
            { nameItem: 'Thủ thuật' },
            { nameItem: 'eSports' },
            { nameItem: 'Gaming House' },
            { nameItem: 'Game mới' },
        ],
    },
    {
        mainItem: 'Xe',
        items: [
            { nameItem: 'Thị trường xe' },
            { nameItem: 'Xe điện' },
            { nameItem: 'Đánh giá xe' },
            { nameItem: 'Tư vấn xe' },
            { nameItem: 'Video' },
            { nameItem: 'Diễn đàn xe' },
            { nameItem: 'Luật giao thông' },
            { nameItem: 'Xe & Đời sống' },
        ],
    },
    {
        mainItem: 'Video',
        items: [
            { nameItem: 'Thời sự' },
            { nameItem: 'Phóng sự' },
            { nameItem: 'Giải trí' },
            { nameItem: 'Giáo dục' },
            { nameItem: 'Món ngon' },
            { nameItem: 'Thể thao' },
            { nameItem: 'Thế giới' },
            { nameItem: 'Trực tuyến' },
        ],
    },
    {
        mainItem: 'Tiêu dùng',
        items: [{ nameItem: 'Mới- Mới- Mới' }, { nameItem: 'Mua một chạm' }, { nameItem: 'Ở đâu rẻ?' }, { nameItem: 'Góc người tiêu dùng' }],
    },
    {
        mainItem: 'Thời trang trẻ',
        items: [
            { nameItem: 'Thời trang 24/7' },
            { nameItem: 'Giữ dáng' },
            { nameItem: 'Thẩm mỹ an toàn' },
            { nameItem: 'Thời trang nghề & nghiệp' },
            { nameItem: 'Tận hưởng' },
            { nameItem: 'Video' },
            { nameItem: 'Thư viện thời trang' },
        ],
    },
];

const footerTopMenu = [
    { nameItem: 'Thời sự' },
    { nameItem: 'Thế giới' },
    { nameItem: 'Kinh tế' },
    { nameItem: 'Đời sống' },
    { nameItem: 'Sức khoẻ' },
    { nameItem: 'Giới trẻ' },
    { nameItem: 'Giáo dục' },
    { nameItem: 'Du lịch' },
    { nameItem: 'Văn hoá' },
    { nameItem: 'Giải trí' },
    { nameItem: 'Thể thao' },
    { nameItem: 'Công nghệ - Game' },
    { nameItem: 'Thời trang trẻ' },
    { nameItem: 'Xe' },
    { nameItem: 'Video' },
    { nameItem: 'Podcast', url: '/podcast' },
    { nameItem: 'Bạn đọc', url: '/ban-doc' },
    { nameItem: 'Rao vặt', url: '/rao-vat' },
];

const footerMiddleMenu = [
    { nameItem: 'Đặt báo', url: '/dat-bao' },
    { nameItem: 'Quảng cáo', url: '/quang-cao' },
    { nameItem: 'RSS', url: '/rss' },
    { nameItem: 'Tòa soạn', url: '/toa-soan' },
    { nameItem: 'Chính sách bảo mật', url: '/chinh-sach-bao-mat' },
];

const footerBottomIcon = [
    { icon: images.facebook, nameItem: 'Facebook', url: '/bcd', alt: 'Facebook' },
    { icon: images.youtube, nameItem: 'Youtube', url: '/bcd', alt: 'Youtube' },
    { icon: images.zalo, nameItem: 'Zalo', url: '/bcd', alt: 'Zalo' },
    { icon: images.tiktok, nameItem: 'TikTok', url: '/bcd', alt: 'TikTok' },
];

const itemsTopHeader = [
    { nameItem: 'Bạn cần biết', url: '/' },
    { nameItem: 'Tiện ích', url: '/' },
    { nameItem: 'Việc làm', url: '/' },
    { nameItem: 'Liên hệ', url: '/' },
];

export { images, info, itemsNav, footerTopMenu, footerMiddleMenu, footerBottomIcon, itemsTopHeader };
