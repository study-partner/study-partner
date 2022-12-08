import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';
import { ProfilesNeedHelpClasses } from '../../api/profiles/ProfilesNeedHelpClasses';
import { ProfilesHelpOthersClasses } from '../../api/profiles/ProfilesHelpOthersClasses';
import { Sessions } from '../../api/sessions/Sessions';
import { Projects } from '../../api/projects/Projects';
import { ProjectsInterests } from '../../api/projects/ProjectsInterests';
import { JoinSessions } from '../../api/profiles/JoinSessions';

/**
 * In Bowfolios, insecure mode is enabled, so it is possible to update the server's Mongo database by making
 * changes to the client MiniMongo DB.
 *
 * However, updating the database via client-side calls can be inconvenient for two reasons:
 *   1. If we want to update multiple collections, we need to use nested callbacks in order to trap errors, leading to
 *      the dreaded "callback hell".
 *   2. For update and removal, we can only provide a docID as the selector on the client-side, making bulk deletes
 *      hard to do via nested callbacks.
 *
 * A simple solution to this is to use Meteor Methods (https://guide.meteor.com/methods.html). By defining and
 * calling a Meteor Method, we can specify code to be run on the server-side but invoked by clients. We don't need
 * to use callbacks, because any errors are thrown and sent back to the client. Also, the restrictions on the selectors
 * are removed for server-side code.
 *
 * Meteor Methods are commonly introduced as the necessary approach to updating the DB once the insecure package is
 * removed, and that is definitely true, but Bowfolios illustrates that they can simplify your code significantly
 * even when prototyping. It turns out that we can remove insecure mode if we want, as we use Meteor methods to update
 * the database.
 *
 * Note that it would be even better if each method was wrapped in a transaction so that the database would be rolled
 * back if any of the intermediate updates failed. Left as an exercise to the reader.
 */

const updateProfileMethod = 'Profiles.update';

/**
 * The server-side Profiles.update Meteor Method is called by the client-side Home page after pushing the update button.
 * Its purpose is to update the Profiles, ProfilesInterests, and ProfilesProjects collections to reflect the
 * updated situation specified by the user.
 */
Meteor.methods({
  'Profiles.update'({ email, firstName, lastName, bio, title, picture, needHelpClasses, helpOthersClasses }) {
    Profiles.collection.update({ email }, { $set: { email, firstName, lastName, bio, title, picture } });
    ProfilesNeedHelpClasses.collection.remove({ profile: email });
    ProfilesHelpOthersClasses.collection.remove({ profile: email });
    needHelpClasses.map((needHelpClass) => ProfilesNeedHelpClasses.collection.insert({ profile: email, needHelpClass }));
    helpOthersClasses.map((helpOthersClass) => ProfilesHelpOthersClasses.collection.insert({ profile: email, helpOthersClass }));
  },
});

const joinSessionMethod = 'Sessions.join';
/** Updates a user's profile when they join a session */
Meteor.methods({
  'Sessions.join'({ email, sessions }) {
    JoinSessions.collection.remove({ profile: email });
    sessions.map((session) => JoinSessions.collection.insert({ profile: email, session }));
  },
});

const addProjectMethod = 'Projects.add';

/** Creates a new project in the Projects collection, and also updates ProfilesProjects and SessionsCourses. */
Meteor.methods({
  'Projects.add'({ name, description, picture, interests, participants, homepage }) {
    Projects.collection.insert({ name, description, picture, homepage });
    ProfilesProjects.collection.remove({ project: name });
    ProjectsInterests.collection.remove({ project: name });
    if (interests) {
      interests.map((interest) => ProjectsInterests.collection.insert({ project: name, interest }));
    } else {
      throw new Meteor.Error('At least one interest is required.');
    }
    if (participants) {
      participants.map((participant) => ProfilesProjects.collection.insert({ project: name, profile: participant }));
    }
  },
});

const addSessionMethod = 'Sessions.add';

/** Creates a new project in the Projects collection, and also updates ProfilesProjects and SessionsCourses. */
Meteor.methods({
  'Sessions.add'({ id, text, startDate, duration }) {
    const endDate = new Date();
    const durationMinutesInMillis = duration * 60 * 1000;
    endDate.setTime(startDate.getTime() + durationMinutesInMillis);
    if (duration < 1) {
      throw new Meteor.Error('Duration cannot be 0 or lower');
    } else if (Meteor.user() === null) {
      throw new Meteor.Error('You must be logged in');
    } else {
      // Ex: 2001-12-10T-10:15:30
      const start = startDate.toISOString().slice(0, -5);
      const end = endDate.toISOString().slice(0, -5);
      const attendees = [Meteor.user().username];
      Sessions.collection.insert({ id, text, start, end, attendees });
    }
  },
});

export { joinSessionMethod, updateProfileMethod, addSessionMethod, addProjectMethod };
