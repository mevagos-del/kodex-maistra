import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.PREVIEW_BASE_URL || 'http://127.0.0.1:5176';
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_EXECUTABLE || undefined,
});

async function assertNoRuntimeErrors(page, errors, label) {
  await page.waitForTimeout(100);
  assert.deepEqual(errors, [], `${label}: browser errors: ${errors.join('; ')}`);
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${label}: horizontal overflow`);
}

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto(`${base}/`);
  const spellsHomeLink = page.locator('.home-reference-card[href="/spells"]');
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
  await spellsHomeLink.scrollIntoViewIfNeeded();
  assert.ok(await page.evaluate(() => window.scrollY > 50), 'homepage test starts below the fold');
  await spellsHomeLink.click();
  await page.waitForURL(`${base}/spells`);
  await page.locator('.spell-list').waitFor();
  assert.ok(await page.evaluate(() => window.scrollY < 2), 'normal navigation opens the catalog at the top');

  await page.getByLabel('Клас').selectOption('wizard');
  await page.locator('.spell-record').nth(24).scrollIntoViewIfNeeded();
  const catalogScroll = await page.evaluate(() => window.scrollY);
  const catalogUrl = page.url();
  assert.ok(catalogScroll > 500, 'catalog is scrolled before opening a detail page');
  await page.locator('.spell-record').nth(24).click();
  await page.locator('.spell-detail .detail-context-back').waitFor();
  assert.ok(await page.evaluate(() => window.scrollY < 2), 'spell detail opens at the top');
  await page.locator('.spell-detail .detail-context-back').click();
  await page.waitForURL(catalogUrl);
  await page.locator('.spell-list').waitFor();
  const restoredScroll = await page.evaluate(() => window.scrollY);
  assert.ok(Math.abs(restoredScroll - catalogScroll) < 80, `catalog scroll restored (${catalogScroll} -> ${restoredScroll})`);
  assert.equal(await page.getByLabel('Клас').inputValue(), 'wizard', 'catalog filter restored');

  await page.goto(`${base}/bestiary/lich`);
  const spellLink = page.locator('.bestiary-spells a[href^="/spells/"]').first();
  await spellLink.scrollIntoViewIfNeeded();
  const bestiaryScroll = await page.evaluate(() => window.scrollY);
  assert.ok(await spellLink.count(), 'bestiary detail exposes an exact spell link');
  await spellLink.click();
  await page.locator('.spell-detail .detail-context-back').waitFor();
  await page.locator('.spell-detail .detail-context-back').click();
  await page.waitForURL(`${base}/bestiary/lich`);
  assert.ok(Math.abs((await page.evaluate(() => window.scrollY)) - bestiaryScroll) < 80, 'hyperlink Back restores the Bestiary detail position');

  const directPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await directPage.goto(`${base}/spells/fireball`);
  await directPage.locator('.spell-detail .detail-context-back').click();
  await directPage.waitForURL(`${base}/spells`);
  assert.ok(await directPage.evaluate(() => window.scrollY < 2), 'direct detail URL falls back to the catalog top');
  await directPage.close();
  await assertNoRuntimeErrors(page, errors, 'navigation scenarios');
  await page.close();

  const viewports = [
    [390, 844],
    [768, 1024],
    [1440, 900],
    [1920, 1080],
    [2560, 1440],
    [3840, 2160],
  ];
  const routes = ['/races', '/classes', '/feats', '/spells', '/items', '/conditions', '/rules', '/bestiary', '/races/dwarf', '/classes/fighter', '/feats/alert', '/spells/fireball', '/items/longsword', '/conditions/blinded', '/rules/action', '/bestiary/lich'];

  for (const [width, height] of viewports) {
    const responsivePage = await browser.newPage({ viewport: { width, height } });
    const responsiveErrors = [];
    responsivePage.on('pageerror', (error) => responsiveErrors.push(error.message));
    for (const route of routes) {
      await responsivePage.goto(`${base}${route}`);
      await responsivePage.locator('.app-main').waitFor();
      await assertNoRuntimeErrors(responsivePage, responsiveErrors, `${width}x${height} ${route}`);
      responsiveErrors.length = 0;
    }
    console.log(`PASS ${width}x${height}: catalogs, details, overflow and runtime errors`);
    await responsivePage.close();
  }
} finally {
  await browser.close();
}
