import { Selector } from 'testcafe';
import { ComponentIDs, PageIDs } from '../imports/ui/utilities/ids';

class ContactAdminPage {
  constructor() {
    this.pageId = `#${PageIDs.contactAdminPage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /* Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed and if can file a report. */
  // Should be able to use setFirstName without generating warnings with first release after 1.9.4. (Fixed in pull/5584).
  async fileReport(testController, firstName, lastName, subject, description) {
    await this.isDisplayed(testController);
    // Type in the required information.
    await testController.typeText(`#${ComponentIDs.contactAdminFormFirstName}`, firstName);
    await testController.typeText(`#${ComponentIDs.contactAdminFormLastName}`, lastName);
    await testController.typeText(`#${ComponentIDs.contactAdminFormSubject}`, subject);
    await testController.typeText(`#${ComponentIDs.contactAdminFormDescription}`, description);
    // Submit it.
    await testController.click(`#${ComponentIDs.contactAdminFormSubmit} input.btn.btn-primary`);
    // Click the OK button on the Sweet Alert.
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const contactAdminPage = new ContactAdminPage();
