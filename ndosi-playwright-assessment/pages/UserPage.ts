// import { Page, Locator } from '@playwright/test';
// import { BasePage } from './BasePage';

// export class UserPage extends BasePage {
//   constructor(page: Page) {
//     super(page);
//   }

//   get myCoursesHeading(): Locator {
//     return this.page.getByText('My Courses');
//   }

//   courseName(courseName: string): Locator {
//     return this.page.getByText(courseName);
//   }

//   async verifyUserDashboardVisible() {
//     await this.verifyElementVisible(this.myCoursesHeading);
//   }

//   async verifyStudentEnrolled(courseName: string) {
//     await this.verifyElementVisible(this.courseName(courseName));
//   }
// }                                                                           





import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class UserPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get myCoursesHeading(): Locator {
    return this.page.getByText('My Courses').first();
  }

  courseName(courseName: string): Locator {
    return this.page.getByText(courseName).first();
  }

  async verifyUserDashboardVisible() {
    await this.verifyElementVisible(this.myCoursesHeading);
  }

  async verifyStudentEnrolled(courseName: string) {
    await this.verifyElementVisible(this.courseName(courseName));
  }
}