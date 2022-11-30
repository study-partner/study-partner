import { Selector } from 'testcafe';
import { ComponentIDs, PageIDs } from '../imports/ui/utilities/ids';

class YourProfilePage {
  constructor() {
    this.pageId = `#${PageIDs.yourProfilePage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /* Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /* Sets the first name field to a new value, then checks that the update succeeded. */
  async setFirstName(testController, firstName) {
    // Delete text from first name field.
    await testController.selectText(`#${ComponentIDs.yourProfileFormFirstName}`).pressKey('delete');
    // Type in new first name.
    await testController.typeText(`#${ComponentIDs.yourProfileFormFirstName}`, firstName);
    // Submit it.
    await testController.click(`#${ComponentIDs.yourProfileFormSubmit} input.btn.btn-primary`);
    // Click the OK button on the Sweet Alert.
    await testController.click(Selector('.swal-button--confirm'));
    // Check that the field is updated.
    await testController.expect(Selector(`#${ComponentIDs.yourProfileFormFirstName}`).value).eql(firstName);
  }

  /** Checks this page is displayed, then changes firstName field, checks update succeeded, then restores value. */
  // Should be able to use setFirstName without generating warnings with first release after 1.9.4. (Fixed in pull/5584).
  async updateProfile(testController, firstName) {
    const newFirstName = 'New First Name';
    await this.isDisplayed(testController);
    // Delete text from first name field.
    await testController.selectText(`#${ComponentIDs.yourProfileFormFirstName}`).pressKey('delete');
    // Type in new first name.
    await testController.typeText(`#${ComponentIDs.yourProfileFormFirstName}`, newFirstName);
    // Submit it.
    await testController.click(`#${ComponentIDs.yourProfileFormSubmit} input.btn.btn-primary`);
    // Click the OK button on the Sweet Alert.
    await testController.click(Selector('.swal-button--confirm'));
    // Check that the field is updated.
    await testController.expect(Selector(`#${ComponentIDs.yourProfileFormFirstName}`).value).eql(newFirstName);
    // Now restore original value.
    await testController.selectText(`#${ComponentIDs.yourProfileFormFirstName}`).pressKey('delete');
    await testController.typeText(`#${ComponentIDs.yourProfileFormFirstName}`, firstName);
    await testController.click(`#${ComponentIDs.yourProfileFormSubmit}  input.btn.btn-primary`);
    await testController.click(Selector('.swal-button--confirm'));
    await testController.expect(Selector(`#${ComponentIDs.yourProfileFormFirstName}`).value).eql(firstName);
  }
}

export const yourProfilePage = new YourProfilePage();
