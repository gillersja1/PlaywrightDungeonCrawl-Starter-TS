import { defineConfig, devices } from '@playwright/test';
import type { DungeonOptions } from './tests/dungeon';

export default defineConfig<DungeonOptions>({
  testDir: './tests',
  // One room at a time: the dungeon is a small free server.
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    // Where your tests send the browser. This points at the live dungeon. If you
    // run a copy of the dungeon on your own machine, change it to
    // http://localhost:5299. The DUNGEON_URL environment variable overrides it.
    baseURL: process.env.DUNGEON_URL ?? 'https://playwright-dungeon-crawl.onrender.com',

    // Victory pause: after takeTreasure() finds the treasure, the browser stays
    // open this many seconds so you can see the room give it up. 0 turns it off.
    victoryPauseSeconds: 3,

    // Keep a trace of any test that fails, to replay step by step later.
    trace: 'retain-on-failure',

    launchOptions: {
      // Slow motion: waits this many milliseconds after every action, so you can
      // follow along. Change 0 to 1000 to turn it on. Turn it off again for timed
      // trap rooms, or you'll run out of time.
      slowMo: 0,
    },
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
