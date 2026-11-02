// A working example to copy from. Add your own test files next to this one,
// one per trap room, each ending in .spec.ts.
import { test, expect } from './dungeon';

test('the dungeon is open', async ({ page, dungeon }) => {
  // Open the dungeon's map page.
  await dungeon.enter('/');

  // Check we landed in the right place. expect(...) waits and retries,
  // so there's no need to sleep while the page loads.
  await expect(page).toHaveTitle(/Playwright Dungeon Crawl/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
