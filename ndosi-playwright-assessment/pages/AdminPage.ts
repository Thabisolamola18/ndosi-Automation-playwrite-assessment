// import { Page, Locator } from '@playwright/test';
// import { BasePage } from './BasePage';

// export class AdminPage extends BasePage {
//   constructor(page: Page) {
//     super(page);
//   }

//   get adminPanelLink(): Locator {
//     return this.page.locator('button:has-text("Admin Panel")').first();
//   }

//   get adminDashboardHeading(): Locator {
//     return this.page.getByText('Admin Dashboard');
//   }

//   get enrollmentsMenu(): Locator {
//     return this.page.locator('button:has-text("Enrollments")').first();
//   }

//   async verifyAdminDashboardVisible() {
//     await this.verifyElementVisible(this.adminDashboardHeading);
//   }

//   async openAdminPanel(username: string) {
//   const userMenu = this.page.getByRole('button', { name: username });
//     await this.clickElement(userMenu);
//     await this.clickElement(this.adminPanelLink);
// }

//   async openEnrollments() {
//     await this.clickElement(this.enrollmentsMenu);
//   }
// }


import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AdminPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get adminPanelLink(): Locator {
    return this.page.locator('button:has-text("Admin Panel")').first();
  }

  get adminDashboardHeading(): Locator {
    return this.page.getByText('Admin Dashboard').first();
  }

  get enrollmentsMenu(): Locator {
    return this.page.locator('button:has-text("Enrollments")').first();
  }

  async openAdminPanel(username: string) {
    const userMenu = this.page.getByText(username, { exact: false }).first();

    await this.clickElement(userMenu);
    await this.clickElement(this.adminPanelLink);
  }

  async verifyAdminDashboardVisible() {
    await this.verifyElementVisible(this.adminDashboardHeading);
  }

  async openEnrollments() {
    await this.clickElement(this.enrollmentsMenu);
  }
}