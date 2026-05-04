// import { Page, Locator } from '@playwright/test';
// import { BasePage } from './BasePage';

// export class LoginPage extends BasePage {
//   constructor(page: Page) {
//     super(page);
//   }

//   get loginMenu(): Locator {
//     return this.page.locator('button:has-text("Login")').first();
//   }

//   get emailTextbox(): Locator {
//     return this.page.getByRole('textbox', { name: 'Email' });
//   }

//   get passwordTextbox(): Locator {
//     return this.page.getByRole('textbox', { name: 'Password' });
//   }

//   get loginButton(): Locator {
//     return this.page.locator('button:has-text("Login")').last();
//   }

//   get myLearningButton(): Locator {
//     return this.page.locator('button:has-text("My Learning")').first();
//   }

//   get logoutButton(): Locator {
//     return this.page.getByText('Logout', { exact: true });
//   }

//   get logoutOkButton(): Locator {
//     return this.page.getByRole('button', { name: 'OK' });
//   }

//   async openApplication() {
//     await this.page.goto('/');
//     await this.page.waitForLoadState('domcontentloaded');
//   }

//   async clickLoginMenu() {
//     await this.loginMenu.waitFor({ state: 'visible', timeout: 15000 });
//     await this.loginMenu.click();
//   }

//   async login(email: string, password: string) {
//     await this.emailTextbox.fill(email);
//     await this.passwordTextbox.fill(password);
//     await this.loginButton.click();
//   }

//   async verifyLoginSuccessful() {
//     await this.myLearningButton.waitFor({ state: 'visible', timeout: 15000 });
//   }

//   async logout(username: string) {
//   await this.page.waitForLoadState('domcontentloaded');
//   await this.page.getByText(username, { exact: false }).first().waitFor({ timeout: 15000 });
//   await this.page.getByText(username, { exact: false }).first().click();
//   await this.page.getByText('Logout', { exact: true }).click();
//   await this.logoutOkButton.click();

// }
// }




import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get loginMenu(): Locator {
    return this.page.locator('button:has-text("Login")').first();
  }

  get emailTextbox(): Locator {
    return this.page.getByRole('textbox', { name: 'Email' });
  }

  get passwordTextbox(): Locator {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  get loginButton(): Locator {
    return this.page.locator('button:has-text("Login")').last();
  }

  get myLearningButton(): Locator {
    return this.page.locator('button:has-text("My Learning")').first();
  }

  get logoutButton(): Locator {
    return this.page.getByText('Logout', { exact: true });
  }

  get logoutOkButton(): Locator {
    return this.page.getByRole('button', { name: 'OK' });
  }

  async openApplication() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickLoginMenu() {
    await this.clickElement(this.loginMenu);
  }

  async login(email: string, password: string) {
    await this.fillText(this.emailTextbox, email);
    await this.fillText(this.passwordTextbox, password);
    await this.clickElement(this.loginButton);
  }

  async verifyLoginSuccessful() {
    await this.verifyElementVisible(this.myLearningButton);
  }

  async logout(username: string) {
    const userMenu = this.page.getByText(username, { exact: false }).first();

    await this.clickElement(userMenu);
    await this.clickElement(this.logoutButton);
    await this.clickElement(this.logoutOkButton);
  }
}