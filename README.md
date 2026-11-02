# Playwright Dungeon Crawl: TypeScript Starter Kit

Your test project for **[Playwright Dungeon Crawl](https://playwright-dungeon-crawl.onrender.com/?lang=ts)**,
a dungeon you clear by writing [Playwright](https://playwright.dev/) tests in TypeScript.

No experience needed. Floor 1 of the dungeon walks you through everything below step by step, then has you
write your first test. Prefer C#? There's a [C# starter kit](https://github.com/gillersja1/PlaywrightDungeonCrawl-Starter) too.

## Get going

1. Install [Node.js](https://nodejs.org/) (the LTS version) and [VS Code](https://code.visualstudio.com/).
2. In VS Code, choose **Clone Git Repository** and paste this repo's URL. Open the folder when it asks.
3. Accept the prompt to install the recommended **Playwright Test for VS Code** extension.
4. Open a terminal (**Terminal › New Terminal**) and run:

   ```bash
   npm install
   npm run setup
   ```

   The second command downloads the browser Playwright drives. It takes about a minute.
5. Open the **Testing** view (the flask icon on the left) and run `the dungeon is open`.

When it goes green, head to floor 1 of the dungeon.

## What's in here

| File | What it's for |
|---|---|
| `tests/dungeon.ts` | The `test` to use in your tests: a browser tab (`page`) and dungeon helpers (`dungeon`) |
| `tests/example.spec.ts` | One working test to copy from |
| `playwright.config.ts` | Where the dungeon is, slow motion, and the victory pause |

Add one `.spec.ts` file per trap room in `tests/`, next to `example.spec.ts`. Import `test` and `expect`
from `./dungeon`, not from `@playwright/test`, so you get the helpers.

## Helpers

```ts
import { test, expect } from './dungeon';

test('clear the room', async ({ page, dungeon }) => {
  await dungeon.enter('/rooms/welcome-matt');   // open a page in the dungeon
  // your moves here
  const flag = await dungeon.takeTreasure();    // wait for the flag, print it, return it
});
```

## Watching a test run

Tests are fast, often too fast to see. Ways to slow them down:

- **Show the browser.** In the Testing view's Playwright section, tick **Show browser**.
- **UI mode.** Run `npm run ui`. Pick a test, run it, then click through every step to see the page as it
  was, with **Pick locator** to get a locator for any element.
- **Pause.** Add `await page.pause();` where you want to stop and the Playwright Inspector opens. Remove it
  when you're done, or the test waits for you forever.
- **Slow motion.** Set `slowMo` in `playwright.config.ts`. Turn it off for timed trap rooms.

## Running from a terminal

```bash
npx playwright test                     # everything, without a window
npx playwright test welcome-matt --headed   # one file, with the browser showing
```

To point at a different copy of the dungeon without editing files, set the `DUNGEON_URL` environment variable.
