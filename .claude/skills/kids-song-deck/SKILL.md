---
name: kids-song-deck
description: Tạo bài hát thiếu nhi mới cho thư viện "Bài Hát Của Minh Khuê" — một file HTML tự chứa gồm nhạc Web Audio, slide động mỗi câu một cảnh, nhân vật dễ thương nhảy theo nhịp, lời karaoke và gợi ý động tác cho bé 1–3 tuổi; rồi đăng ký vào trang chủ. Dùng khi người dùng đưa lời bài hát / tên bài hát thiếu nhi và muốn làm slide, hoặc muốn sửa một bài đã có trong songs/.
---

# Kids Song Deck

Biến một bài hát thiếu nhi thành trang `songs/<số>.<ten-bai>.html` để bé 1–3 tuổi vừa nghe, vừa **nhìn là hiểu**, vừa nhảy và hát theo.

## Tài liệu đi kèm (đọc trước khi làm)

| File | Đọc khi |
|---|---|
| `references/toddler-content-and-visual-guide.md` | **Luôn đọc.** Bé hiểu gì theo tháng tuổi, cấu trúc bài, công thức nhân vật dễ thương, bảng màu, chuyển động, hiệu ứng phần thưởng, kho động tác, checklist |
| `references/song-engine-anatomy.md` | Khi dựng file: phần nào của khuôn mẫu giữ, phần nào thay; định dạng dữ liệu câu hát; toạ độ an toàn |
| `songs/1.chu-nhen-den-bo-tren-mai-nha.html` | **Khuôn mẫu chuẩn.** Luôn sao chép file này; không viết engine từ đầu |
| `scripts/screenshot-song-scenes.mjs` | Bước kiểm tra: chụp ảnh từng cảnh |

## Quy trình

### 1. Lời bài hát
- Dùng **đúng** lời người dùng đưa, giữ chính tả tiếng Việt có dấu. Mỗi dòng lời = một slide.
- Chỉ có tên bài → đề xuất lời quen thuộc phổ biến, hỏi xác nhận trước khi làm.
- Từ ngữ đáng sợ/không hợp tuổi → báo và đề xuất thay, không tự sửa.

### 2. Giai điệu
- Xác định giai điệu gốc và nhịp (6/8 hay 4/4), tốc độ ~90–100 BPM theo phách.
- Ghép mỗi âm tiết với `[chữ, nốt, độ dài móc đơn]`. Lệch số âm tiết với giai điệu gốc → tách/gộp nốt, **không đổi lời**.
- Mỗi câu dài `len` (mặc định 12 móc đơn = 2 ô nhịp 6/8). Nốt lấy đà dùng `pick` âm và phải rơi vào phần nghỉ cuối câu trước.
- Hợp âm theo phách (`chords`): nốt giai điệu ở phách mạnh phải nằm trong hợp âm. Thêm nốt/hợp âm mới vào `NOTE`/`CHORD` khi cần.
- Thêm mở đầu đếm nhịp, đoạn nhảy (chant + vỗ tay) giữa hai lượt, kết "Bé giỏi quá!" (xem guide mục 3).

### 3. Kịch bản cảnh — trình bày cho người dùng trước khi code
Lập bảng và gửi người dùng xem trước khi dựng (người dùng có thể đổi ý tưởng hình):

| # | Câu hát | Cảnh (`scene`) | Hình ảnh / chuyện gì xảy ra | Nhân vật làm gì | Mood | Hiệu ứng | Động tác cho bé |
|---|---|---|---|---|---|---|---|

Yêu cầu bảng phải đạt:
- Che chữ đi vẫn đoán được câu hát từ hình.
- Nhân vật có ≥ 3 cảm xúc trong bài; có ≥ 1 khoảnh khắc bất ngờ phóng đại và ≥ 1 khoảnh khắc phần thưởng (cầu vồng, sao lấp lánh, hoa giấy…).
- Cảnh nối nhau bằng chuyển động liên tục (mây bay vào/ra, mặt trời mọc, nhân vật đi từ chỗ cũ tới chỗ mới).
- Mỗi cảnh một động tác hợp tuổi từ kho động tác.

### 4. Thiết kế nhân vật & thế giới
- Nhân vật theo **công thức kawaii** (guide mục 4): khối tròn lớn, mắt to có chấm sáng, má hồng, một phụ kiện màu nổi, chi tròn mập; đủ 4 mood `smile/grin/wow/happy`.
- Vẽ bản mini của nhân vật cho `#mini` (quả bóng karaoke).
- Bối cảnh màu phẳng tươi, viền đậm, đồ vật có mặt cười, ≤ ~6 vật chính mỗi cảnh. Nền đổi màu theo cảnh (guide mục 5).
- Giữ vùng an toàn: nhân vật & vật quan trọng trong y 150–540 (viewBox 1280×720); thanh lời phía dưới, thẻ gợi ý trên trái, nút trên phải.
- **Hai chế độ hiển thị** (giữ nguyên từ khuôn mẫu): NGANG phủ kín màn hình (mặc định, tự vào toàn màn hình và xoay ngang khi mở trên điện thoại) và DỌC kiểu TikTok (camera bám nhân vật). Vì vậy: vẽ nền tràn ra ngoài khung 1280×720 (xem anatomy) và đặt hành động mỗi cảnh gần nhân vật để khung dọc hẹp vẫn thấy đủ.

### 5. Dựng trang
1. Sao chép khuôn mẫu sang `songs/<số tiếp theo>.<ten-bai-khong-dau>.html` (số = `no` lớn nhất trong `songs/songs.js` + 1).
2. Thay theo `references/song-engine-anatomy.md`: `<title>`, dữ liệu bài hát, `SCENES`, CSS trạng thái cảnh, SVG thế giới & nhân vật, hàm `pose()` (mỗi cảnh một chuyển động bám theo `lb`/phách), tiêu đề mở đầu/kết trong `showLine`, hộp hướng dẫn cho bố mẹ (lời + động tác + mẹo).
3. Giữ nguyên engine âm thanh, lập lịch, karaoke, tương tác, chế độ ngang/dọc + camera, nút 🏠 về `../index.html`.

### 6. Đăng ký vào thư viện
- Thêm mục vào `songs/songs.js`: `no`, `title`, `file`, `emoji` (biểu tượng nhân vật), `color` (màu chủ đạo của bài), `duration`, `tags` (tái sử dụng tag có sẵn: con vật, thời tiết, vận động…), `desc` (1 câu kể chuyện).
- Thêm một dòng vào bảng *Danh sách bài hát* trong `README.md`.

### 7. Kiểm tra — bắt buộc, không bỏ qua
1. Cú pháp: trích `<script>` ra file tạm rồi `node --check`.
2. Chụp từng cảnh (chạy trong thư mục có `playwright`, vd thư mục scratchpad: `npm i playwright`):
   `node <repo>/.claude/skills/kids-song-deck/scripts/screenshot-song-scenes.mjs <repo>/songs/<file>.html <out-dir> [giây-chờ]`
   Script tự tìm Chromium (bản khớp playwright → Google Chrome → cache `ms-playwright`). Thêm `--phone` để chụp thêm từng cảnh ở điện thoại ngang (844×390) và chế độ dọc (390×844).
3. **Đọc từng ảnh** (cả bộ `--phone`) và đối chiếu checklist (guide mục 11): hình khớp câu, nhân vật không bị che, chữ không đè nhau, mood đúng, không có viền trống/khoảng nền bị hụt khi ngang rộng, khung dọc vẫn thấy hành động chính, `errors: []`. Sửa và chụp lại tới khi đạt.
4. Mở `index.html`: thẻ bài mới hiện, bấm vào được, nút 🏠 quay về được.
5. Âm thanh không kiểm tra tự động được → nói rõ người dùng cần nghe thử trên máy thật.

### 8. Commit khi người dùng yêu cầu
`feat: add <tên bài> song deck` — gồm file bài, `songs/songs.js`, `README.md`.

## Bẫy đã gặp

- Phần tử SVG có animation/transition CSS `transform` **ghi đè thuộc tính `transform`** → đặt vị trí ở `<g>` cha, animation ở con.
- Không animate xoay trực tiếp `<use x y>` với `transform-box: fill-box` (tâm xoay lệch, vật bay lệch chỗ) → bọc `<use>` trong `<g class="...">`.
- `.syl` cần `padding` ≥ .24em và `.syl.on` scale ≤ 1.2, nếu không chữ đang hát đè chữ bên cạnh.
- `<use href="#symbol">` trong `<svg>` HTML nhỏ phải có `x y width height` tường minh, nếu không bị co nhỏ.
- Câu có `pick` âm → câu trước phải chừa đủ móc đơn nghỉ ở cuối, nếu không hai nốt chồng nhau.
- Nền chỉ vẽ trong 0…1280 → điện thoại ngang (tỷ lệ ~2.16:1) hở hai bên. Luôn vẽ trời/đồi/đất tràn rộng.
- Lớp phủ HTML dùng `calc(N*var(--u))`, không dùng `cqw` trần (chữ sẽ phình to trên màn ngang rộng); riêng override `html.port` dùng `cqw`.
- Khi sân khấu bị xoay 90°, toạ độ chuột/chạm phải đổi hệ (đã có trong `pointerdown`); vị trí karaoke dùng `offsetLeft/offsetTop` nên không bị ảnh hưởng.
- Giữ file tự chứa: không thêm file âm thanh/ảnh ngoài; font Baloo 2 từ Google Fonts có font dự phòng khi offline.
