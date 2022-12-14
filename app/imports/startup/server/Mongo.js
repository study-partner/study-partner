import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Sessions } from '../../api/sessions/Sessions';
import { Profiles } from '../../api/profiles/Profiles';
import { NeedHelpClasses } from '../../api/NeedHelpClasses/NeedHelpClasses';
import { ProfilesNeedHelpClasses } from '../../api/profiles/ProfilesNeedHelpClasses';
import { HelpOthersClasses } from '../../api/HelpOthersClasses/HelpOthersClasses';
import { ProfilesHelpOthersClasses } from '../../api/profiles/ProfilesHelpOthersClasses';
import { JoinSessions } from '../../api/profiles/JoinSessions';

/** Define a user in the Meteor accounts package. This enables login. Username is the email address. */
function createUser(email, role) {
  const userID = Accounts.createUser({ username: email, email, password: 'changeme' });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}

/** Define a needHelpClass.  Has no effect if needHelpClass already exists. */
function addNeedHelpClass(needHelpClass) {
  NeedHelpClasses.collection.update({ name: needHelpClass }, { $set: { name: needHelpClass } }, { upsert: true });
}

/** Define a helpOthersClass.  Has no effect if helpOthersClass already exists. */
function addHelpOthersClass(helpOthersClass) {
  HelpOthersClasses.collection.update({ name: helpOthersClass }, { $set: { name: helpOthersClass } }, { upsert: true });
}

/** Defines a new user and associated profile. Error if user already exists. */
function addProfile({ firstName, lastName, bio, title, needHelpClasses, helpOthersClasses, sessions, picture, point, email, role }) {
  console.log(`Defining profile ${email}`);
  // Define the user in the Meteor accounts package.
  createUser(email, role);
  // Create the profile.
  Profiles.collection.insert({ firstName, lastName, bio, title, picture, point, email });
  // Add needHelpClasses and helpOthersClasses
  needHelpClasses.map(needHelpClass => ProfilesNeedHelpClasses.collection.insert({ profile: email, needHelpClass }));
  helpOthersClasses.map(helpOthersClass => ProfilesHelpOthersClasses.collection.insert({ profile: email, helpOthersClass }));
  // Add sessions
  sessions.map(session => JoinSessions.collection.insert({ profile: email, session }));
  // Make sure needHelpClasses are defined in the NeedHelpClasses collection if they weren't already.
  needHelpClasses.map(needHelpClass => addNeedHelpClass(needHelpClass));
  // Make sure helpOthersClasses are defined in the HelpOthersClasses collection if they weren't already.
  helpOthersClasses.map(helpOthersClass => addHelpOthersClass(helpOthersClass));
  // Make sure sessions are defined in the Sessions collection if they weren't already.
  // sessions.map(session => addSession(session));
}

function addSession({ id, text, start, end, attendees, picture }) {
  console.log(`Defining session ${text}, id: ${id}`);
  Sessions.collection.insert({ id, text, start, end, attendees, picture });
}

/** Initialize DB if it appears to be empty (i.e. no users defined.) */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultProfiles && Meteor.settings.defaultSessions) {
    console.log('Creating the default profiles');
    Meteor.settings.defaultProfiles.map(profile => addProfile(profile));
    console.log('Creating the default classes');
    Meteor.settings.defaultNeedHelpClasses.map(needHelpClass => addNeedHelpClass(needHelpClass));
    Meteor.settings.defaultHelpOthersClasses.map(helpOthersClass => addHelpOthersClass(helpOthersClass));
    console.log('Creating the default session');
    Meteor.settings.defaultSessions.map(session => addSession(session));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}

/**
 * If the loadAssetsFile field in settings.development.json is true, then load the data in private/data.json.
 * This approach allows you to initialize your system with large amounts of data.
 * Note that settings.development.json is limited to 64,000 characters.
 * We use the "Assets" capability in Meteor.
 * For more info on assets, see https://docs.meteor.com/api/assets.html
 * User count check is to make sure we don't load the file twice, which would generate errors due to duplicate info.
 */
if ((Meteor.settings.loadAssetsFile) && (Meteor.users.find().count() < 7)) {
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.profiles.map(profile => addProfile(profile));
  jsonData.sessions.map(session => addSession(session));
}
