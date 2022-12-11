import { Selector } from 'testcafe';
import { PageIDs } from '../imports/ui/utilities/ids';

class HomePage {
  constructor() {
    this.pageId = `#${PageIDs.homePage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /* Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(50000).expect(this.pageSelector.exists).ok();
  }
}

export const homePage = new HomePage();
