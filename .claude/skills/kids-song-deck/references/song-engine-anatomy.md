# Cấu trúc file bài hát (khuôn mẫu: `songs/1.chu-nhen-den-bo-tren-mai-nha.html`)

Tìm các mục bằng chú thích tiêu đề trong file. **GIỮ** = engine dùng chung, không sửa trừ khi sửa lỗi. **THAY** = riêng cho từng bài.

## CSS (`<style>`)

| Mục | Loại | Ghi chú |
|---|---|---|
| `:root`, `.stage`, `.world` | GIỮ | Sân khấu luôn phủ kín màn hình (`position:fixed`, `container-type:size`). Kích thước lớp phủ dùng `calc(N*var(--u))`, với `--u = min(1cqw, 1.7778cqh)` = 1% của khung 16:9 lớn nhất vừa sân khấu |
| Khối chế độ hiển thị (`html.land` / `html.port`) | GIỮ | NGANG: phủ kín; màn dọc thì xoay sân khấu 90°. DỌC (TikTok): phủ kín màn dọc, các override `html.port …` dùng `cqw` (theo bề ngang) |
| `/* ---------- trạng thái từng cảnh ---------- */` | THAY | Mỗi cảnh = `.world[data-scene=<tên>] #id{...}`: màu trời/đất, vị trí mặt trời/mây, hiện/ẩn mưa, cầu vồng, sao lấp lánh… Dùng `transition` để cảnh đổi mượt |
| hiệu ứng riêng (`#alarm`, `#sunGlow`, `#twinkles`…) | THAY | Thêm/bớt theo bài |
| `/* ---------- nét mặt ... ---------- */` | THAY/GIỮ | Cơ chế `data-mood` (smile, grin, wow, happy) giữ được cho nhân vật mới |
| `/* ---------- keyframes ---------- */` | GIỮ, thêm | Animation theo phách dùng `var(--beat)` + `animation-delay: var(--sync)` và có class `beat` để tự khớp nhịp khi tua |
| `/* ---------- lớp HTML trên sân khấu ---------- */` | GIỮ | Thẻ gợi ý (ngang: trên trái; dọc: sát mép trên, rộng hết), tiêu đề, thanh lời karaoke (dọc: tự xuống dòng), nút (ngang: trên phải; **dọc: hàng dưới đáy**, dưới thanh lời), lớp phủ nút phát. Các vị trí có cộng `env(safe-area-inset-*)` cho tai thỏ/thanh home |
| `/* ---------- hướng dẫn cho bố mẹ ---------- */` | GIỮ | |

## SVG world (`<svg class="world">`)

- `<defs>`: `#drop`, `#flower`, `#cloud` dùng lại được; `#mini` = nhân vật thu nhỏ làm "quả bóng" karaoke → **THAY** thành phiên bản mini của nhân vật mới.
- Bối cảnh (trời, đồi, đất, nhà, mặt trời…): **THAY** theo câu chuyện. Thứ tự vẽ: nền → vật ở xa → nhân vật → mưa/hiệu ứng → hoa giấy.
- Nhân vật `#spider` (đổi tên nếu muốn, nhớ sửa JS): cấu trúc nên giữ:
  `#char` (JS: translate/rotate/scale) › `#charSquash` (nhún) › chi (`#legsL/#legsR` JS xoay) + thân + mắt (`.eyes-open` / `.eyes-happy`, `#pupils` JS dịch) + miệng (`.m-smile/.m-wow/.m-grin`) + vùng chạm `#spiderHit`.
  Gốc toạ độ nhân vật ở tâm thân, thân bán kính ~50.
- `#bubble` ("Hihi!" khi chạm): GIỮ.
- Nhóm sinh bằng JS (`#rain`, `#twinkles`, `#notes`, `#confetti`): GIỮ nếu dùng.
- **Thế giới vẽ tràn ra ngoài 1280×720** để camera cắt khung nào cũng kín: trời `x -700…1980, y -1300…900`, đồi/đất kéo tới `x -700…1980` và xuống `y 2200`, thêm hoa ở `x < 0` và `x > 1280`. Hoa giấy/sao lấp lánh rải trên vùng rộng đó. Nội dung *quan trọng* vẫn đặt trong 0…1280 × 0…720.

## JS (`<script>`)

| Mục | Loại | Việc cần làm |
|---|---|---|
| `BÀI HÁT` | THAY | `E` (giây/móc đơn), `BEAT`, `LINE`; `NOTE` (thêm nốt: `440 * 2 ** ((midi - 69) / 12)`); `CHORD` (thêm hợp âm: `bass` [gốc, quãng 5], `pad` 3 nốt quãng 4); `SCENES` (icon + gợi ý động tác); `INTRO`, `VERSE`, `DANCE`, `OUTRO`, `SONG` |
| `ÂM THANH` | GIỮ | Nhạc cụ: `bell` (giai điệu), `bass`, `pad`, `kick`, `clap`, `shaker`, `tick`, `crash`, `boing`. Nốt đặc biệt trong lời: `'tick'` (đếm nhịp), `'clap'` (vỗ tay) |
| `TRẠNG THÁI PHÁT` | GIỮ | play/pause/jump theo cảnh, lập lịch Web Audio |
| `CẢNH + LỜI KARAOKE` | GIỮ | Chỉ sửa chuỗi tiêu đề mở đầu/kết trong `showLine` |
| `CHÚ NHỆN` → `pose()` | THAY | Mỗi cảnh trả `{x, y, r, s, sq, leg, lx, ly, mood}`. `lb` = số phách từ đầu câu (dùng cho chuyển động theo lời), `bp` = phách tổng (nhún nhảy), `hop`/`sway` = sóng theo phách. Nhân vật được làm mượt khi đổi cảnh |
| `TRANG TRÍ SINH BẰNG JS` | THAY/GIỮ | |
| `CHẾ ĐỘ NGANG / DỌC` | GIỮ | `mode` lưu ở localStorage `lazysongs-display-mode` (chung mọi bài); nút `#btnMode`; khi bấm phát trên máy cảm ứng: vào toàn màn hình + `screen.orientation.lock` (Android), iPhone dùng xoay CSS. `updateCamera()` đặt `viewBox` theo tỷ lệ sân khấu: ngang rộng hơn 16:9 → giữ cao 720, mở rộng hai bên; vuông hơn → mở thêm trời; dọc → khung rộng 520 bám theo `disp.x` của nhân vật. Cả hai chế độ đặt `GROUND_Y` (590, dưới chân nhân vật lớn nhất) ngay tại mép trên thanh lời, đọc từ `lyricsEl.offsetTop` mỗi khung hình và làm mượt (`cam.ground`) — lời 2 dòng thì camera tự lùi/dời, không che nhân vật |
| `TƯƠNG TÁC`, `VÒNG LẶP` | GIỮ | Toạ độ chạm đã đổi về hệ sân khấu khi sân khấu đang xoay 90° |

## Định dạng dữ liệu câu hát

```js
{ scene:'rain', pick:-1, len:12, chords:'C F C C',
  syl:[['Chợt','E5',2],['một','E5',1],['cơn','F5',2],['mưa','G5',6]] }
```

- `syl`: `[chữ, nốt | 'tick' | 'clap', độ dài móc đơn]`; chữ bắt đầu bằng `/` = xuống dòng (dùng cho câu dài).
- `pick`: âm tiết đầu bắt đầu sớm `|pick|` móc đơn (nốt lấy đà).
- `len`: mặc định `LINE` (12 = 2 ô nhịp 6/8). Đoạn mở đầu/nhảy/kết thường `len:24`.
- `chords`: số hợp âm = `len / 3` (mỗi phách 6/8 một hợp âm). Phách chẵn có kick + pad, phách lẻ có clap nhẹ.
- Kiểm tra: `pick + tổng độ dài ≤ len` và không chồng lên `pick` của câu kế.
- Với 4/4: đặt `BEAT = 2 * E` hoặc đổi E thành móc đơn 4/4, sửa `b % 2` trong vòng dựng sự kiện cho đúng phách mạnh, và `chords` = `len / (BEAT/E)` hợp âm.

## Toạ độ (thế giới chuẩn 1280×720)

- Mặt đất y = 540; nhân vật đứng trên cỏ ở y ≈ 470 (scale 1).
- Ngang 16:9: thanh lời che y > ~548; thẻ gợi ý: x < 460, y < 110; nút: x > 860, y < 95.
- Mép thanh lời luôn ứng với `GROUND_Y` = 590 (camera tự canh) → mọi thứ phải thấy được đặt ở y < 590.
- Dọc: camera chỉ thấy ~520 đơn vị bề ngang quanh nhân vật → hành động chính của mỗi cảnh phải xảy ra gần nhân vật (≤ ±260 theo x); vật ở xa (mặt trời góc phải…) sẽ ra ngoài khung, nên cảnh nào cần thấy vật đó thì đưa nó lại gần nhân vật (như mặt trời bay tới x 330 ở cảnh nắng).
- Cảnh nhân vật di chuyển xa (trôi đi, đi về nhà) thì camera dọc trượt theo — giữ quãng đường ≤ ~450 đơn vị cho dễ nhìn.
