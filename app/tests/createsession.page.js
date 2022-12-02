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
    const text = 'ICS 211';
    const startD = '2001-09-21';
    const startT = '10:11:00';
    const endD = '2001-09-22';
    const endT = '11:11:00';
    await this.isDisplayed(testController);
    // Define the new session
    await testController.typeText(`#${ComponentIDs.addSessionFormCourse}`, text);
    await testController.typeText(`#${ComponentIDs.addSessionStartdate}`, startD);
    await testController.typeText(`#${ComponentIDs.addSessionStarttime}`, startT);
    await testController.typeText(`#${ComponentIDs.addSessionEnddate}`, endD);
    await testController.typeText(`#${ComponentIDs.addSessionEndtime}`, endT);

    await testController.click(`#${ComponentIDs.addSessionFormSubmit} input.btn.btn-primary`);
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const addSessionPage = new AddSessionPage();
