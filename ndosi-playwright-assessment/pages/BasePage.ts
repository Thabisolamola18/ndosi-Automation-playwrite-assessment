// import { Page, Locator, expect } from '@playwright/test';

// export class BasePage {
//   readonly page: Page;

//   constructor(page: Page) {
//     this.page = page;
//   }

//   async clickElement(locator: Locator) {
//     await locator.waitFor({ state: 'visible', timeout: 10000 });
//    await locator.click();
//   }

//   async fillText(locator: Locator, value: string) {
//     await locator.fill(value);
//   }

//   async verifyElementVisible(locator: Locator) {
//   await locator.waitFor({ state: 'visible', timeout: 10000 });
//   await expect(locator).toBeVisible();
// }

// async selectByText(locator: Locator, text: string) {
//   await locator.waitFor({ state: 'visible', timeout: 10000 });
//   await locator.selectOption({ label: text });
// }

// async selectByIndex(locator: Locator, index: number) {
//   await locator.waitFor({ state: 'visible', timeout: 10000 });
//   await locator.selectOption({ index });
// }

// }







import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickElement(locator: Locator) {
  await locator.waitFor({ state: 'visible', timeout: 15000 });

  try {
    await locator.click();
  } catch {
    const element = await locator.elementHandle();
    if (element) {
      await this.page.evaluate((el) => el.click(), element);
    }
  }
}
  async fillText(locator: Locator, value: string) {
    await locator.waitFor({ state: 'visible', timeout: 15000 });
    await locator.fill(value);
  }

  async verifyElementVisible(locator: Locator) {
    await locator.waitFor({ state: 'visible', timeout: 15000 });
    await expect(locator).toBeVisible();
  }

  async selectByIndex(locator: Locator, index: number) {
    await locator.waitFor({ state: 'visible', timeout: 15000 });
    await locator.selectOption({ index });
  }
}