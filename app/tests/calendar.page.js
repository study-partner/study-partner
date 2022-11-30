import { Selector } from 'testcafe';
import { PageIDs } from '../imports/ui/utilities/ids';

class CalendarPage {
  constructor() {
    this.pageId = `#${PageIDs.calendarPage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that the current page has at least six profiles on it.  */
  async hasCalendar(testController) {
    const smallCalendarCount = Selector('.navigator_default_month').count;
    const bigCalendarCount = Selector('.calendar_default_main').count;
    await testController.expect(smallCalendarCount).gte(3);
    await testController.expect(bigCalendarCount).gte(1);
  }

}

export const calendarPage = new CalendarPage();
