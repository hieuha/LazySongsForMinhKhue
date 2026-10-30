// Chụp ảnh từng cảnh của một trang bài hát để kiểm tra hình bằng mắt.
// Dùng: node screenshot-song-scenes.mjs <song.html> <out-dir> [giây-chờ-trong-cảnh=1.2]
// Cần playwright cài trong thư mục hiện tại (npm i playwright) và trình duyệt Chromium
// (npx playwright install chromium) — script tìm module từ cwd, không phải từ thư mục skill.
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { mkdirSync, readdirSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';

// Bản Chromium khớp phiên bản playwright → Google Chrome đã cài → bản Chromium mới nhất trong cache
async function launchAnyChromium() {
  try { return await chromium.launch(); } catch {}
  try { return await chromium.launch({ channel: 'chrome' }); } catch {}
  const cache = process.env.PLAYWRIGHT_BROWSERS_PATH || resolve(homedir(), 'Library/Caches/ms-playwright');
  const dirs = existsSync(cache) ? readdirSync(cache).filter(d => /^chromium-\d+$/.test(d)).sort().reverse() : [];
  for (const d of dirs) {
    for (const sub of ['chrome-mac-arm64', 'chrome-mac', 'chrome-linux']) {
      for (const exe of ['Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
                         'Chromium.app/Contents/MacOS/Chromium', 'chrome']) {
        const p = resolve(cache, d, sub, exe);
        if (existsSync(p)) return chromium.launch({ executablePath: p });
      }
    }
  }
  throw new Error('Không tìm thấy Chromium. Chạy: npx playwright install chromium');
}

const [, , songArg, outArg, waitArg] = process.argv;
if (!songArg || !outArg) {
  console.error('Dùng: node screenshot-song-scenes.mjs <song.html> <out-dir> [giây-chờ]');
  process.exit(1);
}
const require = createRequire(resolve(process.cwd(), 'noop.js'));
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  console.error('Không tìm thấy playwright trong thư mục hiện tại. Chạy: npm i playwright && npx playwright install chromium');
  process.exit(1);
}

const song = resolve(songArg), out = resolve(outArg), wait = Number(waitArg || 1.2) * 1000;
mkdirSync(out, { recursive: true });

const browser = await launchAnyChromium();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', e => errors.push(e.message));
await page.goto('file://' + song);
await page.waitForTimeout(500);
await page.screenshot({ path: `${out}/00-idle.png` });

// Mỗi lần bấm "cảnh sau" nhảy tới đầu cảnh kế tiếp; dừng khi cảnh không đổi nữa
await page.click('#overlay');
let prev = '', i = 1;
for (;;) {
  await page.waitForTimeout(wait);
  const scene = await page.$eval('#world', el => el.dataset.scene);
  if (scene === prev) break;
  await page.screenshot({ path: `${out}/${String(i).padStart(2, '0')}-${scene}.png` });
  console.log(`${i}: ${scene}`);
  prev = scene; i++;
  await page.click('#btnNext');
}
console.log('errors:', JSON.stringify(errors));
await browser.close();
