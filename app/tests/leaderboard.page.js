import { Selector } from 'testcafe';
import { PageIDs } from '../imports/ui/utilities/ids';

class LeaderboardPage {
  constructor() {
    this.pageId = `#${PageIDs.leaderboardPage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that the current page has at least one rank in it.  */
  async hasRank(testController) {
    const cardCount = Selector('.card').count;
    await testController.expect(cardCount).gte(1);
  }
}

export const leaderboardPage = new LeaderboardPage();
