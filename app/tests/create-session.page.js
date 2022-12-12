import { Selector } from 'testcafe';
import { ComponentIDs, PageIDs } from '../imports/ui/utilities/ids';

class CreateSessionPage {
  constructor() {
    this.pageId = `#${PageIDs.addSessionPage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /* Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async createSession(testController, course, date, duration, picture) {
    // Type in the required information.
    await testController.typeText(`#${ComponentIDs.addSessionFormCourse}`, course);
    await testController.typeText(`#${ComponentIDs.addSessionDateAndTime}`, date);
    await testController.typeText(`#${ComponentIDs.addSessionDuration}`, duration);
    await testController.typeText(`#${ComponentIDs.addSessionFormPicture}`, picture);
    // Submit it.
    await testController.click(`#${ComponentIDs.addSessionFormSubmit} input.btn.btn-primary`);
    // Click the OK button on the Sweet Alert.
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const createSessionPage = new CreateSessionPage();
