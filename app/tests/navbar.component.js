import { Selector } from 'testcafe';
import { ComponentIDs } from '../imports/ui/utilities/ids';

class NavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const visible = await Selector(`#${ComponentIDs.basicNavbarNav}`).visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    const loggedInUser = await Selector(`#${ComponentIDs.currentUserDropdown}`).exists;
    if (loggedInUser) {
      await testController.click(`#${ComponentIDs.currentUserDropdown}`);
      await testController.click(`#${ComponentIDs.currentUserDropdownSignOut}`);
    }
  }

  async gotoSignInPage(testController) {
    await this.ensureLogout(testController);
    const visible = await Selector(`#${ComponentIDs.basicNavbarNav}`).visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click(`#${ComponentIDs.loginDropdown}`);
    await testController.click(`#${ComponentIDs.loginDropdownSignIn}`);
  }

  async gotoYourProfilePage(testController) {
    const visible = await Selector(`#${ComponentIDs.basicNavbarNav}`).visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click(`#${ComponentIDs.yourProfileMenuItem}`);
  }

  // async gotoCreateSessionPage(testController) {
  //   const visible = await Selector(`#${ComponentIDs.basicNavbarNav}`).visible;
  //   if (!visible) {
  //     await testController.click('button.navbar-toggler');
  //   }
  //   await testController.click(`#${ComponentIDs.addSessionMenuItem}`);
  // }

  async gotoJoinSessionsPage(testController) {
    const visible = await Selector(`#${ComponentIDs.basicNavbarNav}`).visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click(`#${ComponentIDs.joinSessionMenuItem}`);
  }

  async gotoProfilesPage(testController) {
    const visible = await Selector(`#${ComponentIDs.basicNavbarNav}`).visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click(`#${ComponentIDs.profilesMenuItem}`);
  }

  async gotoCalendarPage(testController) {
    const visible = await Selector(`#${ComponentIDs.basicNavbarNav}`).visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click(`#${ComponentIDs.calendarMenuItem}`);
  }

  async gotoContactAdminPage(testController) {
    const visible = await Selector(`#${ComponentIDs.basicNavbarNav}`).visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click(`#${ComponentIDs.contactAdminMenuItem}`);
  }

  async gotoViewReportPage(testController) {
    const visible = await Selector(`#${ComponentIDs.basicNavbarNav}`).visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click(`#${ComponentIDs.viewReportMenuItem}`);
  }

  async gotoLeaderboardPage(testController) {
    const visible = await Selector(`#${ComponentIDs.basicNavbarNav}`).visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click(`#${ComponentIDs.leaderboardMenuItem}`);
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(testController, username) {
    const visible = await Selector(`#${ComponentIDs.basicNavbarNav}`).visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.expect(Selector(`#${ComponentIDs.currentUserDropdown}`).innerText).eql(username);
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout(testController) {
    const visible = await Selector(`#${ComponentIDs.basicNavbarNav}`).visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.expect(Selector(`#${ComponentIDs.currentUserDropdown}`).exists).ok();
    await testController.click(`#${ComponentIDs.currentUserDropdown}`);
    await testController.click(`#${ComponentIDs.currentUserDropdownSignOut}`);
  }

  /** Pull down login menu, go to sign up page. */
  async gotoSignUpPage(testController) {
    await this.ensureLogout(testController);
    const visible = await Selector(`#${ComponentIDs.basicNavbarNav}`).visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click(`#${ComponentIDs.loginDropdown}`);
    await testController.click(`#${ComponentIDs.loginDropdownSignUp}`);
  }

  async gotoCreateSessionPage(testController) {
    const visible = await Selector(`#${ComponentIDs.basicNavbarNav}`).visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click(`#${ComponentIDs.addSessionMenuItem}`);
  }
}

export const navBar = new NavBar();
