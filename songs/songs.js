/* Danh sách bài hát cho trang chủ (index.html).
   Thêm bài mới: đặt file HTML vào songs/ rồi thêm một mục vào mảng dưới đây.
   Dùng file .js (không phải .json) để trang chủ mở trực tiếp bằng file:// vẫn đọc được. */
window.SONGS = [
  {
    no: 1,
    title: 'Chú Nhện Đen',
    file: 'songs/1.chu-nhen-den-bo-tren-mai-nha.html',
    emoji: '🕷️',
    color: '#B9A2FF',
    duration: '1 phút',
    tags: ['con vật', 'thời tiết', 'vận động'],
    desc: 'Nhện leo mái nhà, gặp mưa, gặp nắng rồi lại leo lên.',
  },
];
