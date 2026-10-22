// Run against Vite: PLAYWRIGHT_MODULE may point to an existing Playwright installation.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_EXECUTABLE || undefined,
});
const base = process.env.PREVIEW_BASE_URL || 'http://127.0.0.1:5176';
try {
  for (const width of [1440, 768, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.addInitScript(() => {
      window.previewShifts = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.previewShifts += entry.value;
      }).observe({ type: 'layout-shift', buffered: true });
    });
    await page.goto(`${base}/animation-preview`);
    await page.locator('.home-codex-hero h1').waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1400);
    for (const [name, duration] of [['Cinematic', 540], ['Editorial', 400], ['Atmospheric', 580]]) {
      await page.getByRole('button', { name, exact: true }).click();
      assert.equal(await page.getByRole('button', { name, exact: true }).getAttribute('aria-pressed'), 'true');
      const animations = await page.locator('.home-codex-hero h1').evaluate((node) => node.getAnimations().map((a) => ({ duration: a.effect.getTiming().duration, time: a.currentTime })));
      assert.ok(animations.some((a) => a.duration === duration && a.time < duration), `${width} ${name}: actual entrance animation`);
      await page.waitForTimeout(1100);
      assert.equal(await page.locator('.home-codex-hero h1').evaluate((node) => getComputedStyle(node).opacity), '1');
      await page.getByRole('button', { name: 'Повторити анімацію', exact: true }).click();
      assert.ok(await page.locator('.home-codex-hero h1').evaluate((node) => node.getAnimations().some((a) => a.currentTime < 200)), 'replay restarts animation');
      await page.getByRole('button', { name: 'Повторити появу довідника', exact: true }).click();
      for (const card of await page.locator('.home-reference-card').all()) {
        await card.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        assert.equal(await card.getAttribute('data-preview-reveal'), 'visible');
        assert.equal(await card.evaluate((node) => getComputedStyle(node).opacity), '1');
      }
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width} ${name}: no horizontal overflow`);
    }
    // Toggle the OS preference on a mounted page, then switch/replay every variant.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const name of ['Cinematic', 'Editorial', 'Atmospheric']) {
      await page.getByRole('button', { name, exact: true }).click();
      await page.getByRole('button', { name: 'Повторити появу довідника', exact: true }).click();
      assert.ok(await page.locator('.animation-preview').evaluate((node) => node.getAnimations({ subtree: true }).length === 0));
      assert.ok(await page.locator('[data-home-reveal]').evaluateAll((nodes) => nodes.every((node) => getComputedStyle(node).opacity === '1')));
    }
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.getByRole('button', { name: 'Повторити анімацію', exact: true }).click();
    await page.waitForTimeout(1200);
    assert.ok(await page.locator('.home-codex-hero img').evaluate((node) => node.complete && node.naturalWidth > 0));
    assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex, nofollow, noarchive');
    const shifts = await page.evaluate(() => window.previewShifts);
    assert.ok(shifts < 0.01, `${width}: unexpected layout shift ${shifts}`);
    if (process.env.PREVIEW_SCREENSHOT_DIR) {
      for (const item of await page.locator('[data-home-reveal]').all()) {
        await item.scrollIntoViewIfNeeded();
        await page.waitForTimeout(850);
      }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.screenshot({ path: `${process.env.PREVIEW_SCREENSHOT_DIR}/preview-${width}.png`, fullPage: true });
    }
    // SPA navigation leaves the dev CSS loaded: verify it cannot affect the homepage.
    await page.getByRole('button', { name: 'Перемкнути головне меню' }).click();
    await page.getByRole('link', { name: 'Кодекс Майстра, головна', exact: true }).click();
    await page.waitForURL(`${base}/`);
    await page.reload();
    await page.locator('.home-codex-hero h1').waitFor();
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(250);
    const homepageAnimation = await page.locator('.home-codex-hero h1').evaluate((node) => ({
      active: node.getAnimations().map((animation) => animation.effect.getTiming().duration),
      cssDuration: getComputedStyle(node).animationDuration,
      playing: node.closest('.home-codex-hero')?.hasAttribute('data-home-hero-playing'),
    }));
    assert.equal(homepageAnimation.playing, true, `${width}: homepage Cinematic trigger`);
    assert.ok(homepageAnimation.active.includes(540) || homepageAnimation.cssDuration === '0.54s', `${width}: homepage uses Cinematic Hero`);
    await page.waitForTimeout(1200);
    assert.equal(await page.locator('.animation-preview').count(), 0);
    assert.equal(await page.locator('[data-preview-playing], [data-preview-reveal]').count(), 0);
    assert.equal(await page.locator('.home-codex-hero h1').evaluate((node) => getComputedStyle(node).opacity), '1');
    const headerHeroGap = await page.evaluate(() => {
      const header = document.querySelector('.archive-topbar');
      const hero = document.querySelector('.home-codex-hero');
      return hero.getBoundingClientRect().top - header.getBoundingClientRect().bottom;
    });
    assert.ok(Math.abs(headerHeroGap) <= 1, `${width}: header-to-hero gap is ${headerHeroGap}px`);
    const indicator = page.locator('.home-scroll-indicator');
    assert.equal(await indicator.getAttribute('aria-hidden'), null, `${width}: scroll indicator starts visible`);
    await indicator.click();
    await page.waitForTimeout(900);
    assert.ok(await page.locator('.home-reference').evaluate((node) => Math.abs(node.getBoundingClientRect().top - 62) < 8), `${width}: indicator scrolls to reference`);
    await page.locator('.home-section-divider__line').waitFor();
    assert.equal(await page.locator('.home-section-divider__line').getAttribute('data-reveal-state'), 'visible');
    for (const card of await page.locator('.home-reference-card').all()) {
      await card.scrollIntoViewIfNeeded();
      await page.waitForTimeout(750);
      assert.equal(await card.getAttribute('data-home-reveal-state'), 'visible');
      assert.equal(await card.evaluate((node) => getComputedStyle(node).opacity), '1');
    }
    await page.locator('#home-global-search').fill('дракон');
    assert.ok(await page.locator('.home-global-search__result').count() > 0, `${width}: search works after reveal`);
    assert.equal(await indicator.getAttribute('aria-hidden'), 'true', `${width}: indicator hides while search is open`);
    await page.locator('#home-global-search').press('Escape');
    assert.equal(await page.locator('.home-global-search__results').count(), 0);
    await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
    await page.waitForTimeout(250);
    assert.equal(await indicator.getAttribute('aria-hidden'), 'true', `${width}: indicator hides at page bottom`);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(250);
    assert.equal(await indicator.getAttribute('aria-hidden'), null, `${width}: indicator returns when scrolling up`);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}: homepage has no horizontal overflow`);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.reload();
    await page.locator('.home-codex-hero h1').waitFor();
    assert.equal(await page.locator('.home-codex-hero').evaluate((node) => node.getAnimations({ subtree: true }).length), 0);
    assert.equal(await page.locator('.home-codex-hero h1').evaluate((node) => getComputedStyle(node).opacity), '1');
    assert.equal(await page.locator('.home-scroll-indicator svg').evaluate((node) => node.getAnimations().length), 0);
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    assert.equal(await page.locator('meta[name="robots"][content*="noindex"]').count(), 0);
    assert.deepEqual(errors, []);
    console.log(`PASS ${width}px: three modes, replay, scroll, reduced motion, overflow, CLS=${shifts}, homepage isolation`);
    await page.close();
  }
} finally {
  await browser.close();
}
