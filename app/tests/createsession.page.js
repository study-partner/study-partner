import { Selector } from 'testcafe';
import { ComponentIDs, PageIDs } from '../imports/ui/utilities/ids';

class CreateSessionPage {
  constructor() {
    this.pageId = `#${PageIDs.addSessionPage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then adds a new project */
  async createSession(testController) {
    const text = `ICS 314-${new Date().getTime()}`;
    // const anyPicker = Selector('.addSessionDateAndTime').nth(1);
    // const startDate = anyPicker.find('input');
    // const dateCell = Selector('.addSessionDateAndTime').withText('16');
    const duration = '30';
    const picture = 'https://www.radgrad.org/img/radgrad_logo.png';
    await this.isDisplayed(testController);
    // Define the new project
    await testController.typeText(`#${ComponentIDs.addSessionFormCourse}`, text);
    // await testController.expect(startDate).gte(2);
    // await testController
    //   .click(startDate)
    //   .click(dateCell)
    //   .expect(startDate.value).eql('12/16/2022');
    await testController.typeText(`#${ComponentIDs.addSessionDuration}`, duration);
    await testController.typeText(`#${ComponentIDs.addSessionFormPicture}`, picture);

    await testController.click(`#${ComponentIDs.addSessionFormSubmit} input.btn.btn-primary`);
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const addSessionPage = new CreateSessionPage();
