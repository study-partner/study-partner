import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { NeedHelpClasses } from './NeedHelpClasses';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('NeedHelpClassesCollection', function testSuite() {
    it('Check that a new NeedHelpClass can be defined and retrieved', function test() {
      const name = `test-needHelpClass-${new Date().getTime()}`;
      NeedHelpClasses.collection.insert({ name });
      expect(NeedHelpClasses.collection.findOne({ name }).name).to.equal(name);
    });
  });
}
