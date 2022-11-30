import { Selector } from 'testcafe';
import { PageIDs } from '../imports/ui/utilities/ids';

class ViewReportPage {
  constructor() {
    this.pageId = `#${PageIDs.viewReportPage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that the current page has at least one report in it.  */
  async hasReport(testController) {
    const cardCount = Selector('.card').count;
    await testController.expect(cardCount).gte(1);
  }
}

export const viewReportPage = new ViewReportPage();
