import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { HelpOthersClasses } from './HelpOthersClasses';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('HelpOthersClassesCollection', function testSuite() {
    it('Check that a new HelpOthersClass can be defined and retrieved', function test() {
      const name = `test-helpOthersClass-${new Date().getTime()}`;
      HelpOthersClasses.collection.insert({ name });
      expect(HelpOthersClasses.collection.findOne({ name }).name).to.equal(name);
    });
  });
}
