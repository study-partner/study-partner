import { Selector } from 'testcafe';
import { ComponentIDs, PageIDs } from '../imports/ui/utilities/ids';

class AddSessionPage {
  constructor() {
    this.pageId = `#${PageIDs.addSessionPage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then adds a new project */
  async addSession(testController) {
    const course = 'ICS 211';
    const time = '12:30';
    const day = '21';
    const month = '7';
    const year = '2001';
    await this.isDisplayed(testController);
    // Define the new session
    await testController.typeText(`#${ComponentIDs.addSessionFormCourse}`, course);
    await testController.typeText(`#${ComponentIDs.addSessionFormTime}`, time);
    await testController.typeText(`#${ComponentIDs.addSessionFormDay}`, day);
    await testController.typeText(`#${ComponentIDs.addSessionFormMonth}`, month);
    await testController.typeText(`#${ComponentIDs.addSessionFormYear}`, year);

    await testController.click(`#${ComponentIDs.addSessionFormSubmit} input.btn.btn-primary`);
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const addSessionPage = new AddSessionPage();
