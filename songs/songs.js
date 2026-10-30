/* Danh sách bài hát cho trang chủ (index.html).
   Thêm bài mới: đặt file HTML vào songs/ rồi thêm một mục vào mảng dưới đây.
   Dùng file .js (không phải .json) để trang chủ mở trực tiếp bằng file:// vẫn đọc được.
   cover: ảnh bìa SVG vẽ lại ĐÚNG nhân vật trong bài (songs/covers/); emoji chỉ là dự phòng. */
window.SONGS = [
  {
    no: 1,
    title: 'Chú Nhện Đen',
    file: 'songs/1.chu-nhen-den-bo-tren-mai-nha.html',
    cover: 'songs/covers/1.chu-nhen-den.svg',
    emoji: '🕷️',
    color: '#B9A2FF',
    duration: '1 phút',
    tags: ['con vật', 'thời tiết', 'vận động'],
    desc: 'Nhện leo mái nhà, gặp mưa, gặp nắng rồi lại leo lên.',
  },
  {
    no: 2,
    title: 'Năm Chú Khỉ Con',
    file: 'songs/2.nam-chu-khi-con-nhay-tren-giuong.html',
    cover: 'songs/covers/2.nam-chu-khi-con.svg',
    emoji: '🐵',
    color: '#FFB020',
    duration: '1 phút 50',
    tags: ['con vật', 'đếm số', 'vận động', 'đi ngủ'],
    desc: 'Năm chú khỉ nhảy trên giường, lần lượt ngã u đầu, mẹ gọi bác sĩ rồi cả nhà đi ngủ.',
  },
  {
    no: 3,
    title: 'Twinkle Twinkle Little Star',
    file: 'songs/3.twinkle-twinkle-little-star.html',
    cover: 'songs/covers/3.twinkle-twinkle-little-star.svg',
    emoji: '⭐',
    color: '#3A3480',
    duration: '1 phút 35',
    tags: ['tiếng Anh', 'đi ngủ', 'thiên nhiên'],
    desc: 'Ngôi sao nhỏ lấp lánh, bạn Cú tò mò ngắm sao rồi cả hai chúc nhau ngủ ngon.',
  },
];
