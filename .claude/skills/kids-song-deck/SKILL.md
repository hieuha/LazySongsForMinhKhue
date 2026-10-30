---
name: kids-song-deck
description: Tạo bài hát thiếu nhi mới cho thư viện "Bài Hát Của Minh Khuê" (songs.hatrunghieu.com) — một file HTML tự chứa gồm nhạc Web Audio, slide động mỗi câu một cảnh, nhân vật dễ thương nhảy theo nhịp, lời karaoke, gợi ý động tác cho bé 1–3 tuổi, hai chế độ ngang/dọc cho điện thoại; rồi đăng ký vào trang chủ và phát hành qua GitHub Pages. Dùng khi người dùng đưa lời bài hát / tên bài hát thiếu nhi và muốn làm slide, hoặc muốn sửa một bài đã có trong songs/.
---

# Kids Song Deck

Biến một bài hát thiếu nhi thành trang `songs/<số>.<ten-bai>.html` để bé 1–3 tuổi vừa nghe, vừa **nhìn là hiểu**, vừa nhảy và hát theo — trên máy tính, TV, iPad và điện thoại (ngang hoặc dọc).

## Tài liệu đi kèm (đọc trước khi làm)

| File | Đọc khi |
|---|---|
| `references/toddler-content-and-visual-guide.md` | **Luôn đọc.** Bé hiểu gì theo tháng tuổi, cấu trúc bài, công thức nhân vật dễ thương, bảng màu, chuyển động, hiệu ứng phần thưởng, kho động tác, checklist |
| `references/song-engine-anatomy.md` | Khi dựng file: phần nào của khuôn mẫu giữ, phần nào thay; định dạng dữ liệu câu hát; chế độ hiển thị & camera; toạ độ an toàn |
| `songs/1.chu-nhen-den-bo-tren-mai-nha.html` | **Khuôn mẫu chuẩn.** Luôn sao chép file này; không viết engine từ đầu |
| `songs/2.nam-chu-khi-con-nhay-tren-giuong.html` | Ví dụ bài 4/4, **nhiều nhân vật** nhân bản từ một khuôn, cảnh trong nhà, kết ru ngủ (`soft`) |
| `songs/covers/*.svg` | Ví dụ ảnh bìa vẽ từ nhân vật trong bài |
| `scripts/screenshot-song-scenes.mjs` | Bước kiểm tra: chụp ảnh từng cảnh (máy tính + điện thoại) |

## Cấu trúc repo liên quan

```
index.html           Trang chủ: thẻ bài hát, tìm kiếm (không dấu vẫn ra), lọc tag, "Bài bất kỳ"
songs/songs.js       window.SONGS = [...] — danh sách cho trang chủ (.js chứ không .json để mở file:// vẫn chạy)
songs/<n>.<slug>.html  Từng bài, tự chứa
CNAME                songs.hatrunghieu.com (GitHub Pages)
README.md            Có bảng "Danh sách bài hát"
.claude/skills/kids-song-deck/   Skill này (được git theo dõi; phần còn lại của .claude/ bị bỏ qua)
```

## Mong muốn đã chốt của người dùng

- **Mỗi dòng lời = một slide** minh hoạ riêng; giữ nguyên lời người dùng đưa.
- Nội dung vui tươi, hình đáng yêu, bắt mắt, hợp bé 1–3 tuổi; bé nhìn là hiểu, vừa nhảy vừa hát.
- Có khoảnh khắc cảm xúc phóng đại theo lời (vd nhện **giật mình** khi mưa tới) và phần thưởng thị giác (vd **cầu vồng** khi tạnh, **muôn ngàn tia nắng lấp lánh**).
- Mở trên điện thoại: **mặc định NGANG phủ kín màn hình** (không viền trống hai bên, tự vào toàn màn hình/xoay ngang); có nút đổi sang **DỌC kiểu TikTok**, ở chế độ dọc **các nút nằm dưới đáy** để không che hình.
- **Chất liệu nghệ thuật kiểu tranh truyện** ở mọi bài, ngay từ đầu (guide mục 11): gradient khối + nét mực + vệt sáng cho nhân vật, bóng đổ dưới chân, nền nhiều lớp có chi tiết vẽ tay, hạt giấy + nắng mềm. Không vẽ chữ/nhãn trong cảnh.
- **Ảnh bìa trang chủ vẽ đúng nhân vật trong bài** (SVG trong `songs/covers/`), không dùng emoji (guide mục 12).
- Lời 1 hay 2 dòng đều **không được che nhân vật** — engine tự xử lý, không chỉnh tay từng bài.
- Không thứ gì bị **tai thỏ / Dynamic Island** che: ở chế độ dọc trên điện thoại thẻ chỉ dẫn luôn cách mép trên ≥ 56px; khi điện thoại quay ngang thì thẻ, nút, thanh lời lùi vào theo `env(safe-area-inset-left/right)`. Engine đã có sẵn (cần `viewport-fit=cover` trong thẻ meta viewport).

## Quy trình

### 1. Lời bài hát
- Dùng **đúng** lời người dùng đưa, giữ chính tả tiếng Việt có dấu. Mỗi dòng lời = một slide.
- Chỉ có tên bài → đề xuất lời quen thuộc phổ biến, hỏi xác nhận trước khi làm.
- Từ ngữ đáng sợ/không hợp tuổi → báo và đề xuất thay, không tự sửa.
- Người dùng gửi thêm yêu cầu hiệu ứng giữa chừng → làm luôn rồi chụp kiểm tra lại cảnh đó.

### 2. Giai điệu
- Xác định giai điệu gốc và nhịp (6/8 hay 4/4), tốc độ ~90–100 BPM theo phách.
- Ghép mỗi âm tiết với `[chữ, nốt, độ dài móc đơn]`. Lệch số âm tiết với giai điệu gốc → tách/gộp nốt, **không đổi lời**.
- Mỗi câu dài `len` (mặc định 12 móc đơn = 2 ô nhịp 6/8). Nốt lấy đà dùng `pick` âm và phải rơi vào phần nghỉ cuối câu trước.
- Hợp âm theo phách (`chords`): nốt giai điệu ở phách mạnh phải nằm trong hợp âm. Thêm nốt/hợp âm mới vào `NOTE`/`CHORD` khi cần.
- Thêm mở đầu đếm nhịp, đoạn nhảy (chant + vỗ tay) giữa hai lượt, kết "Bé giỏi quá!" (guide mục 3).
- Tự kiểm tra bằng số: với mỗi câu, `pick + Σ độ dài ≤ len` và không chồng `pick` của câu sau.

### 3. Kịch bản cảnh — trình bày cho người dùng trước khi code
Lập bảng và gửi người dùng xem trước khi dựng (người dùng có thể đổi ý tưởng hình):

| # | Câu hát | Cảnh (`scene`) | Hình ảnh / chuyện gì xảy ra | Nhân vật làm gì | Mood | Hiệu ứng | Động tác cho bé |
|---|---|---|---|---|---|---|---|

Yêu cầu bảng phải đạt:
- Che chữ đi vẫn đoán được câu hát từ hình.
- Nhân vật có ≥ 3 cảm xúc trong bài; có ≥ 1 khoảnh khắc bất ngờ phóng đại và ≥ 1 khoảnh khắc phần thưởng.
- Cảnh nối nhau bằng chuyển động liên tục (mây bay vào/ra, mặt trời mọc, nhân vật đi từ chỗ cũ tới chỗ mới).
- Hành động mỗi cảnh xảy ra **gần nhân vật** (±260 theo x) để khung dọc hẹp vẫn thấy.
- Mỗi cảnh một động tác hợp tuổi từ kho động tác.

### 4. Thiết kế nhân vật & thế giới
- Nhân vật theo **công thức kawaii** (guide mục 4): khối tròn lớn, mắt to có chấm sáng, má hồng, một phụ kiện màu nổi, chi tròn mập; đủ 4 mood `smile/grin/wow/happy`.
- Vẽ bản mini của nhân vật cho `#mini` (quả bóng karaoke).
- Áp dụng đủ **chất liệu nghệ thuật** (guide mục 11) cho nhân vật và bối cảnh. Nhiều nhân vật → một khuôn trong `<defs>` + nhân bản bằng JS (anatomy mục *Nhiều nhân vật*).
- Bối cảnh màu phẳng tươi, viền đậm, đồ vật có mặt cười, ≤ ~6 vật chính mỗi cảnh. Nền đổi màu theo cảnh (guide mục 5).
- Vẽ trời/đồi/đất **tràn ra ngoài 1280×720** (trời x -700…1980, y -1300…900; đất tới y 2200) và thêm hoa/cỏ ở x < 0, x > 1280 — camera cắt theo tỷ lệ màn hình nên không bao giờ hở nền.
- Nhân vật đứng trên cỏ ở y ≈ 470; điểm thấp nhất của nhân vật (kể cả chân, ở scale lớn nhất) phải ≤ `GROUND_Y` (mặc định 590). Nhân vật mới cao/thấp hơn thì chỉnh `GROUND_Y`, không chỉnh từng cảnh.

### 5. Dựng trang
1. Sao chép khuôn mẫu sang `songs/<số tiếp theo>.<ten-bai-khong-dau>.html` (số = `no` lớn nhất trong `songs/songs.js` + 1).
2. Thay theo `references/song-engine-anatomy.md`: `<title>`, dữ liệu bài hát, `SCENES`, CSS trạng thái cảnh, SVG thế giới & nhân vật, hàm `pose()` (mỗi cảnh một chuyển động bám theo `lb`/phách), tiêu đề mở đầu/kết trong `showLine`, chuỗi `overlayLabel` ("Bấm để hát cùng …"), hộp hướng dẫn cho bố mẹ (lời + động tác + mẹo).
3. **Giữ nguyên** engine âm thanh, lập lịch, karaoke, tương tác, chế độ ngang/dọc, camera (`updateCamera`, `GROUND_Y`), bố cục nút (dọc: nút dưới đáy), nút 🏠 về `../index.html`.

### 6. Đăng ký vào thư viện
- Vẽ ảnh bìa `songs/covers/<n>.<slug>.svg` từ đúng markup nhân vật trong bài (guide mục 12).
- Thêm mục vào `songs/songs.js`: `no`, `title`, `file`, `cover`, `emoji` (dự phòng), `color` (màu chủ đạo của bài), `duration`, `tags` (tái sử dụng tag có sẵn: con vật, thời tiết, vận động…), `desc` (1 câu kể chuyện).
- Thêm một dòng vào bảng *Danh sách bài hát* trong `README.md`.

### 7. Kiểm tra — bắt buộc, không bỏ qua
1. Cú pháp: trích `<script>` ra file tạm rồi `node --check`.
2. Chụp từng cảnh ở 3 khung (chạy trong thư mục có `playwright`, vd scratchpad: `npm i playwright`):
   `node <repo>/.claude/skills/kids-song-deck/scripts/screenshot-song-scenes.mjs <repo>/songs/<file>.html <out-dir> 1.2 --phone`
   → `desk-*` (1280×720), `phone-land-*` (844×390, ngang phủ kín), `phone-port-*` (390×844, dọc TikTok). Script tự tìm Chromium (bản khớp playwright → Google Chrome → cache `ms-playwright`).
3. **Đọc từng ảnh** và đối chiếu checklist (guide mục 13): hình khớp câu; nhân vật (cả chân) nằm trên thanh lời ở mọi khung, kể cả câu 2 dòng; chữ không đè nhau; mood đúng; không hở nền; khung dọc thấy hành động chính, nút ở đáy không che hình; `errors: []`. Sửa và chụp lại tới khi đạt.
4. Mở `index.html` và chụp ảnh: thẻ bài mới hiện với ảnh bìa đúng nhân vật, bấm vào được, nút 🏠 quay về được.
5. Âm thanh không kiểm tra tự động được → nói rõ người dùng cần nghe thử trên máy thật.

### 8. Commit & phát hành (khi người dùng yêu cầu)
- Conventional commit, vd `feat: add <tên bài> song deck` — gồm file bài, `songs/songs.js`, `README.md`.
- Trước khi commit chạy `git status`: chỉ được có file của repo; **không** commit gì khác trong `.claude/` ngoài `.claude/skills/kids-song-deck/` (đặc biệt `.env.example` của ClaudeKit — đã chặn bằng dòng `.env.example` cuối `.claude/.gitignore` cục bộ, ClaudeKit cập nhật có thể xoá dòng đó).
- Push `main` → GitHub Pages tự build → https://songs.hatrunghieu.com (DNS Cloudflare `CNAME songs → hieuha.github.io`, đang Proxied; không bật "Enforce HTTPS" phía GitHub khi còn Proxied).
- Kiểm tra sau khi push: `gh api repos/hieuha/LazySongsForMinhKhue/pages --jq .status` ra `built`; nếu máy không phân giải được tên miền thì kiểm tra qua IP Cloudflare: `curl --resolve songs.hatrunghieu.com:443:$(dig +short @1.1.1.1 songs.hatrunghieu.com A | head -1) https://songs.hatrunghieu.com/songs/<file>.html -o /dev/null -w '%{http_code}'`. Người dùng báo `ERR_NAME_NOT_RESOLVED` mà DNS công cộng đã đúng → do bộ nhớ đệm: Chrome `chrome://net-internals/#dns` → Clear host cache; macOS `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`.

## Bẫy đã gặp

- Phần tử SVG có animation/transition CSS `transform` **ghi đè thuộc tính `transform`** → đặt vị trí ở `<g>` cha, animation ở con.
- Không animate xoay trực tiếp `<use x y>` với `transform-box: fill-box` (tâm xoay lệch, vật bay lệch chỗ) → bọc `<use>` trong `<g class="...">`.
- `.syl` cần `padding` ≥ .24em và `.syl.on` scale ≤ 1.2, nếu không chữ đang hát đè chữ bên cạnh.
- `<use href="#symbol">` trong `<svg>` HTML nhỏ phải có `x y width height` tường minh, nếu không bị co nhỏ.
- Câu có `pick` âm → câu trước phải chừa đủ móc đơn nghỉ ở cuối, nếu không hai nốt chồng nhau.
- Nền chỉ vẽ trong 0…1280 → điện thoại ngang (tỷ lệ ~2.16:1) hở hai bên. Luôn vẽ trời/đồi/đất tràn rộng.
- Lớp phủ HTML dùng `calc(N*var(--u))`, không dùng `cqw` trần (chữ phình to trên màn ngang rộng); riêng override `html.port` dùng `cqw`.
- Thanh lời 2 dòng cao hơn → nếu đặt camera cố định sẽ che chân nhân vật. Camera đọc `lyrics.offsetTop` mỗi khung hình và giữ `GROUND_Y` ngay trên thanh lời (ngang: lùi camera ra; dọc: dời khung) — đừng thay bằng toạ độ cố định.
- Khi sân khấu bị xoay 90°, toạ độ chuột/chạm phải đổi hệ (đã có trong `pointerdown`); vị trí karaoke dùng `offsetLeft/offsetTop` nên không bị ảnh hưởng.
- `const` khai báo sau hàm vẫn dùng được trong hàm miễn là hàm chỉ chạy sau (vòng `frame` khởi động cuối script) — giữ `requestAnimationFrame(frame)` ở cuối.
- Playwright cài mới có thể đòi bản Chromium khác bản trong cache → script đã tự dò; đừng tải lại trình duyệt nếu không cần.
- `env(safe-area-inset-top)` thường bằng 0 trong Safari/Chrome thường (thanh trình duyệt đã chiếm chỗ) nhưng Island vẫn có thể đè khi toàn màn hình → dùng `max(…, 56px)` trên thiết bị cảm ứng thay vì chỉ tin vào safe-area.
- Tay/chi vẽ trước đầu sẽ biến mất khi giơ lên (bị đầu che) → vẽ tay sau đầu.
- Nhãn chữ trong cảnh ("Bác sĩ"…) dính vào nhân vật, khó đọc → bỏ, để hình tự nói.
- Đồ trang trí đặt sau vùng tiêu đề lớn hoặc chồng nhau trông rối → kiểm tra cảnh mở đầu/kết và khung dọc.
- Emoji 🕷️ trên ảnh bìa là nhện thật, không giống nhân vật → luôn dùng ảnh bìa SVG.
- Giữ file tự chứa: không thêm file âm thanh/ảnh ngoài; font Baloo 2 từ Google Fonts có font dự phòng khi offline.
