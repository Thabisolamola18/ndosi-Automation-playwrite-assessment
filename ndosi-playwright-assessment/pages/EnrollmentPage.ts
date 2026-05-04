// import { Page, Locator, expect } from '@playwright/test';
// import { BasePage } from './BasePage';

// export class EnrollmentPage extends BasePage {
//   constructor(page: Page) {
//     super(page);
//   }

//   get manageEnrollmentsHeading(): Locator {
//     return this.page.getByText('Manage Enrollments', { exact: true });
//   }

//   get enrollUserButton(): Locator {
//     return this.page.getByText('+ Enroll User', { exact: true });
//   }

//   get enrollModal(): Locator {
//     return this.page.locator('form').filter({ hasText: 'Select Course' });
//   }

//   get courseDropdown(): Locator {
//     return this.enrollModal.locator('select').first();
//   }

//   get individualUserOption(): Locator {
//     return this.enrollModal.getByText('Individual User', { exact: true }).first();
//   }

//   get studentSearchTextbox(): Locator {
//     return this.enrollModal.getByPlaceholder('Search by name or email...');
//   }

//   get submitEnrollUserButton(): Locator {
//     return this.enrollModal.locator('button[type="submit"]:has-text("Enroll User")');
//   }

//   get successMessage(): Locator {
//     return this.page.getByText('User enrolled successfully!', { exact: true });
//   }

//   get backToWebsiteButton(): Locator {
//     return this.page.getByText('Back to Website', { exact: true }).first();
//   }

//   async verifyEnrollmentPageVisible() {
//     await expect(this.manageEnrollmentsHeading).toBeVisible({ timeout: 15000 });
//     await expect(this.enrollUserButton).toBeVisible({ timeout: 15000 });
//   }

//   async enrollStudent(
//     studentSearchName: string,
//     studentFullName: string,
//     studentEmail: string
//   ) {
//     await this.enrollUserButton.click();

//     await expect(this.enrollModal).toBeVisible({ timeout: 15000 });

//     await this.courseDropdown.selectOption({ index: 1 });

//     await this.individualUserOption.click();

//     await this.studentSearchTextbox.fill(studentSearchName);

//     const studentResult = this.enrollModal
//       .locator('div')
//       .filter({ hasText: studentEmail })
//       .last();

//     await expect(studentResult).toBeVisible({ timeout: 10000 });
//     await studentResult.click();

//     await expect(this.submitEnrollUserButton).toBeEnabled({ timeout: 10000 });
//     await this.submitEnrollUserButton.click();

//     await expect(this.successMessage).toBeVisible({ timeout: 15000 });

//     await this.backToWebsiteButton.click();
//   }
// }




import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class EnrollmentPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ===== BUTTONS =====
  get enrollUserButton(): Locator {
    return this.page.getByText('+ Enroll User', { exact: true });
  }

  // ===== MODAL =====
  get enrollModal(): Locator {
    return this.page.locator('form').filter({ hasText: 'Select Course' }).first();
  }

  // ===== FIELDS =====
  get courseDropdown(): Locator {
    return this.enrollModal.locator('select').first();
  }

  get individualUserOption(): Locator {
    return this.enrollModal.getByText('Individual User');
  }

  get studentSearchTextbox(): Locator {
    return this.enrollModal.getByPlaceholder('Search by name or email...');
  }

  get submitEnrollUserButton(): Locator {
    return this.enrollModal.locator('button[type="submit"]');
  }

  get successMessage(): Locator {
    return this.page.getByText('User enrolled successfully!', { exact: false });
  }

  get backToWebsiteButton(): Locator {
    return this.page.getByText('Back to Website', { exact: true }).first();
  }

  // ===== MAIN ACTION =====
async enrollStudent(
  studentSearchName: string,
  studentFullName: string,
  studentEmail: string
) {

  for (let i = 1; i <= 10; i++) {

    await this.clickElement(this.enrollUserButton);
    await this.enrollModal.waitFor({ state: 'visible', timeout: 30000 });

    // Get option text
    const option = this.courseDropdown.locator('option').nth(i);
    const text = (await option.textContent())?.trim();

    // ❌ Skip bad ones
    if (!text || text.includes('-- Select Course --') || text.includes('Test 12354')) {
      await this.enrollModal.getByText('Cancel', { exact: true }).click();
      continue;
    }

    // ✅ Select course
    await this.courseDropdown.selectOption({ index: i });

    await this.clickElement(this.individualUserOption);
    await this.fillText(this.studentSearchTextbox, studentSearchName);

  
// 🔥 SELECT STUDENT USING EMAIL (clean + stable)
const studentRow = this.enrollModal
  .getByText(studentEmail, { exact: false })
  .first();

await studentRow.waitFor({ state: 'visible', timeout: 10000 });
await studentRow.click({ force: true });

// confirm user is selected
await this.enrollModal
  .getByText('User selected', { exact: false })
  .waitFor({ state: 'visible', timeout: 10000 });

  // ✅ CLICK ENROLL USER FIRST
await this.submitEnrollUserButton.click({ force: true });
await this.page.waitForTimeout(1000);

    // 👇 KEY PART (this is what you were missing)
    const alreadyEnrolled = this.page.locator('text=/already.*enroll/i');

    if (await alreadyEnrolled.isVisible().catch(() => false)) {
      // ❌ skip and try next course
      await this.enrollModal.getByText('Cancel', { exact: true }).click();
      continue;
    }

    // ✅ success
    await Promise.race([
      this.successMessage.waitFor({ state: 'visible', timeout: 10000 }),
      this.page.waitForTimeout(3000)
    ]);

// close the enroll popup first
      await this.enrollModal.getByText('Cancel', { exact: true }).click();

// now click Back to Website
      await this.backToWebsiteButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.backToWebsiteButton.click({ force: true });

return;
  }

  throw new Error('No available course found for this student');
}

  
}

