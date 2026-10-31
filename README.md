# 🎵 Bài Hát Của Minh Khuê

Tuyển tập bài hát thiếu nhi dạng slide động cho bé Minh Khuê (2 tuổi): vừa nghe nhạc, vừa nhìn hình để hiểu, vừa nhảy múa và hát theo.

Mỗi bài là **một file HTML tự chứa**: nhạc tạo bằng Web Audio ngay trong trang, không cần file âm thanh, không cần cài đặt, không cần server.

## Mở xem

- **Trên máy:** mở `index.html` bằng trình duyệt (Chrome, Safari, Edge…).
- **Trên iPad / TV / điện thoại:** mở https://songs.hatrunghieu.com
  (GitHub Pages, Branch `main`, thư mục `/ (root)`; tên miền khai báo trong file `CNAME`,
  DNS cần bản ghi `CNAME songs → hieuha.github.io`).

## Cấu trúc

```
CNAME               Tên miền GitHub Pages (songs.hatrunghieu.com)
index.html          Trang chủ: danh sách bài hát, tìm kiếm, lọc theo chủ đề, chọn bài bất kỳ
songs/
  songs.js          Danh sách bài hát hiển thị ở trang chủ
  covers/           Ảnh bìa SVG vẽ từ nhân vật trong từng bài
  1.<ten-bai>.html  Từng bài hát (slide động + nhạc)
```

## Danh sách bài hát

| # | Bài | Nội dung |
|---|---|---|
| 1 | 🕷️ [Chú Nhện Đen](songs/1.chu-nhen-den-bo-tren-mai-nha.html) | Nhện leo mái nhà, gặp mưa, gặp nắng rồi lại leo lên — giai điệu *Itsy Bitsy Spider* |
| 2 | 🐵 [Năm Chú Khỉ Con](songs/2.nam-chu-khi-con-nhay-tren-giuong.html) | Đếm lùi 5 → 1: khỉ nhảy trên giường, ngã u đầu, mẹ gọi bác sĩ, cả nhà đi ngủ — giai điệu *Five Little Monkeys* |
| 3 | ⭐ [Twinkle Twinkle Little Star](songs/3.twinkle-twinkle-little-star.html) | Lời tiếng Anh: ngôi sao nhỏ và bạn Cú, ngân "mm", chúc ngủ ngon |
| 4 | 🐰 [Cao Thấp To Bé](songs/4.cao-thap-to-be-nhanh-cham.html) | Cặp từ trái nghĩa: cao/thấp, to/bé tí xíu, nhanh/chậm — Thỏ con làm mẫu, nhạc cũng “diễn” theo từ |

## Thêm bài hát mới

1. Tạo file `songs/<số>.<ten-bai-khong-dau>.html` (có thể sao chép bài Chú Nhện Đen làm khung).
2. Thêm một mục vào `songs/songs.js`:

   ```js
   {
     no: 2,
     title: 'Tên bài hát',
     file: 'songs/2.ten-bai-hat.html',
     emoji: '🐘',            // biểu tượng to trên thẻ bài
     color: '#7FE3FF',       // màu nền thẻ
     duration: '1 phút',
     tags: ['con vật'],      // dùng cho nút lọc chủ đề ở trang chủ
     desc: 'Một câu mô tả ngắn.',
   },
   ```

3. Thêm một dòng vào bảng *Danh sách bài hát* ở trên, rồi commit.

## Trong trang bài hát

- Nút hồng to: phát / tạm dừng. Slide tự chuyển theo nhạc, mỗi câu hát là một cảnh.
- Lời hát kiểu karaoke có chú nhện nhỏ nhảy trên từng chữ để bố mẹ hát dẫn.
- Thẻ góc trái gợi ý động tác cho bé làm theo.
- Chạm vào nhân vật: nhân vật nhảy lên cười. Chạm chỗ khác: bắn sao kèm tiếng chuông. Chạm lung tung không làm dừng nhạc.
- Nút: 🏠 trang chủ · ⏮ ⏭ chuyển cảnh · ⛶ toàn màn hình · ⓘ lời bài hát & động tác cho bố mẹ.
- Phím tắt: `Space` phát/dừng · `←` `→` chuyển cảnh · `F` toàn màn hình.

## Mẹo

- iPhone/iPad không có tiếng: gạt tắt chế độ im lặng ở cạnh máy.
- Bé 2 tuổi học qua lặp lại và vận động: bố mẹ làm động tác trước, bé bắt chước theo; hát lại nhiều lần.
