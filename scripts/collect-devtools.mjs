import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const results = { console: [], pageerror: [], requestFailed: [], responses: [] };
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();

page.on('console', msg => {
  try {
    results.console.push({ type: msg.type(), text: msg.text(), location: msg.location() });
  } catch (e) {
    results.console.push({ type: 'unknown', text: msg.text() });
  }
});

page.on('pageerror', err => {
  results.pageerror.push({ message: err.message, stack: err.stack });
});

page.on('requestfailed', req => {
  results.requestFailed.push({ url: req.url(), method: req.method(), failure: req.failure() });
});

page.on('response', async res => {
  try {
    const status = res.status();
    const url = res.url();
    if (status >= 400) {
      results.responses.push({ url, status, headers: res.headers() });
    }
  } catch (e) {
    // ignore
  }
});

const target = process.argv[2] || 'http://127.0.0.1:3000/';

try {
  await page.goto(target, { waitUntil: 'networkidle', timeout: 15000 });
} catch (err) {
  results.pageerror.push({ message: 'goto failed: ' + err.message, stack: err.stack });
}

await page.waitForTimeout(2000);

try {
  const html = await page.content();
  fs.writeFileSync(path.resolve('collect-page.html'), html, 'utf8');
} catch (e) {}

try {
  await page.screenshot({ path: 'collect-screenshot.png', fullPage: true });
} catch (e) {}

fs.writeFileSync(path.resolve('collect-results.json'), JSON.stringify(results, null, 2), 'utf8');
console.log(JSON.stringify(results, null, 2));

await browser.close();
process.exit(0);
