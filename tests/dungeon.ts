import { test as base, expect } from '@playwright/test';

export { expect };

export type DungeonOptions = {
  /** Seconds to keep the browser open after taking the treasure (playwright.config.ts). */
  victoryPauseSeconds: number;
};

type Dungeon = {
  /** Opens a page in the dungeon, e.g. `await dungeon.enter('/rooms/welcome-matt')`. */
  enter(path: string): Promise<void>;
  /**
   * Waits for a cleared room's treasure flag, prints it in the test's output,
   * and returns it. Then holds the browser open for victoryPauseSeconds so you
   * can see it worked.
   */
  takeTreasure(): Promise<string>;
};

/**
 * Use this `test` instead of Playwright's own. Every test gets:
 * - `page`: a fresh browser tab
 * - `dungeon`: helpers for the dungeon (`enter` and `takeTreasure`)
 */
export const test = base.extend<DungeonOptions & { dungeon: Dungeon }>({
  victoryPauseSeconds: [3, { option: true }],

  dungeon: async ({ page, baseURL, victoryPauseSeconds }, use, testInfo) => {
    await use({
      async enter(path) {
        try {
          await page.goto(path);
        } catch (error) {
          if (String(error).includes('ERR_CONNECTION_REFUSED')) {
            throw new Error(`Can't reach the dungeon at ${baseURL}. Is it running? The address is set in playwright.config.ts.`);
          }
          throw error;
        }
      },

      async takeTreasure() {
        const flag = page.getByLabel('Treasure flag');
        await expect(flag).toContainText('PDC{');
        const text = (await flag.textContent())!.trim();
        console.log(`Treasure flag: ${text}`);
        testInfo.annotations.push({ type: 'Treasure flag', description: text });

        // A CI server has no one watching, so it skips the pause.
        if (victoryPauseSeconds > 0 && !process.env.CI) {
          await flag.scrollIntoViewIfNeeded();
          await page.waitForTimeout(victoryPauseSeconds * 1000);
        }
        return text;
      },
    });
  },
});
