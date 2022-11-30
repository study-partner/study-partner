import { landingPage } from './landing.page';
import { signInPage } from './signin.page';
// import { signOutPage } from './signout.page';
import { signupPage } from './signup.page';
import { profilesPage } from './profiles.page';
import { homePage } from './home.page';
import { navBar } from './navbar.component';
import { yourProfilePage } from './yourprofile.page';
import { calendarPage } from './calendar.page';
import { contactAdminPage } from './contactadmin.page';
import { viewReportPage } from './viewreport.page';
import { addSessionPage } from './createsession.page';
/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = {
  username: 'john@foo.com',
  password: 'changeme',
  firstName: 'John',
  lastName: 'Foo',
  subject: 'File a report.',
  description: 'Sending a testing file report to admin and see if received',
};

/** Credentials for one of the admin users defined in settings.development.json. */
const admin = { username: 'admin@foo.com', password: 'changeme' };

fixture('Study Partner localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, credentials.username, credentials.password);
  await navBar.logout(testController);
  // await signOutPage.isDisplayed(testController);
  await landingPage.isDisplayed(testController);
});

test('Test that signup page, then logout works', async (testController) => {
  // Create a new user email address that's guaranteed to be unique.
  const newUser = `user-${new Date().getTime()}@foo.com`;
  await navBar.gotoSignUpPage(testController);
  await signupPage.isDisplayed(testController);
  await signupPage.signupUser(testController, newUser, credentials.password);
  // New user has successfully logged in, so now let's logout.
  await navBar.logout(testController);
  // await signOutPage.isDisplayed(testController);
  await landingPage.isDisplayed(testController);
});

test('Test that profiles page displays', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoProfilesPage(testController);
  await profilesPage.isDisplayed(testController);
  await profilesPage.hasDefaultProfiles(testController);
});

test('Test that profile page display and profile modification works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoYourProfilePage(testController);
  await yourProfilePage.isDisplayed(testController);
  await yourProfilePage.updateProfile(testController, credentials.firstName);
  await navBar.ensureLogout(testController);
});

test('Test that calendar page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoCalendarPage(testController);
  await calendarPage.isDisplayed(testController);
  await calendarPage.hasCalendar(testController);
});

test('Test that contact admin page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoContactAdminPage(testController);
  await contactAdminPage.isDisplayed(testController);
  await contactAdminPage.fileReport(testController, credentials.firstName, credentials.lastName, credentials.subject, credentials.description);
  await navBar.ensureLogout(testController);
});

test('Test that admin view reports works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, admin.username, admin.password);
  await navBar.gotoViewReportPage(testController);
  await viewReportPage.isDisplayed(testController);
  await viewReportPage.hasReport(testController);
  await navBar.ensureLogout(testController);
});

test('Test that the home page displays', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, admin.username, admin.password);
  await homePage.isDisplayed(testController);
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, credentials.username, credentials.password);
  await homePage.isDisplayed(testController);
});

test('Test that createSession page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoAddSessionPage(testController);
  await addSessionPage.isDisplayed(testController);
  await addSessionPage.addSession(testController);
});
