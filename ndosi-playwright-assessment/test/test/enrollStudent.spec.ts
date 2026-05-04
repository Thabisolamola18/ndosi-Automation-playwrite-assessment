// import { test } from '@playwright/test';
// import { LoginPage } from '../../pages/LoginPage';
// import { AdminPage } from '../../pages/AdminPage';
// import { EnrollmentPage } from '../../pages/EnrollmentPage';
// import { UserPage } from '../../pages/UserPage';
// import { users, enrollmentData } from '../../data/testData';

// test('Admin enrols student to a course and student verifies enrollment', async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   const adminPage = new AdminPage(page);
//   const enrollmentPage = new EnrollmentPage(page);
//   const userPage = new UserPage(page);

//   await loginPage.openApplication();

//   await loginPage.clickLoginMenu();

//   await loginPage.login(users.admin.email, users.admin.password);

//   await loginPage.verifyLoginSuccessful();

//   await adminPage.openAdminPanel(users.admin.username);

//   await adminPage.verifyAdminDashboardVisible();

//   await adminPage.openEnrollments();

//   await enrollmentPage.enrollStudent(
//     enrollmentData.studentSearchName,
//     enrollmentData.studentFullName,
//     enrollmentData.studentEmail
//   );

//   await loginPage.logout(users.student.username);

//   await loginPage.clickLoginMenu();

//   await loginPage.login(users.student.email, users.student.password);

//   await loginPage.verifyLoginSuccessful();

//   await userPage.verifyUserDashboardVisible();

//   await userPage.verifyStudentEnrolled(enrollmentData.expectedCourseName);
// });




import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AdminPage } from '../../pages/AdminPage';
import { EnrollmentPage } from '../../pages/EnrollmentPage';
import { UserPage } from '../../pages/UserPage';
import { users, enrollmentData } from '../../data/testData';

test('Admin enrolls student and student verifies enrollment', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const adminPage = new AdminPage(page);
  const enrollmentPage = new EnrollmentPage(page);
  const userPage = new UserPage(page);

  // 1. Login as Admin
  await loginPage.openApplication();
  await loginPage.clickLoginMenu();
  await loginPage.login(users.admin.email, users.admin.password);
  await loginPage.verifyLoginSuccessful();

  // 2. Go to Admin Panel
  await adminPage.openAdminPanel(users.admin.username);
  await adminPage.verifyAdminDashboardVisible();

  // 3. Open Enrollments
  await adminPage.openEnrollments();
  // TODO: add EnrollmentPage.verifyEnrollmentPageVisible() to EnrollmentPage class

  // 4. Enroll Student
  await enrollmentPage.enrollStudent(
    enrollmentData.studentSearchName,
    enrollmentData.studentFullName,
    enrollmentData.studentEmail
  );

  // 5. Logout Admin
  await loginPage.logout(users.admin.username);

  // 6. Login as Student
  await loginPage.clickLoginMenu();
  await loginPage.login(users.student.email, users.student.password);
  await loginPage.verifyLoginSuccessful();

  // 7. Verify Student Sees Course
  await userPage.verifyUserDashboardVisible();
  await userPage.verifyStudentEnrolled(enrollmentData.expectedCourseName);

});