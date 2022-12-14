import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '../../api/profiles/Profiles';
import { NeedHelpClasses } from '../../api/NeedHelpClasses/NeedHelpClasses';
import { ProfilesNeedHelpClasses } from '../../api/profiles/ProfilesNeedHelpClasses';
import { Reports } from '../../api/report/Reports';
import { HelpOthersClasses } from '../../api/HelpOthersClasses/HelpOthersClasses';
import { ProfilesHelpOthersClasses } from '../../api/profiles/ProfilesHelpOthersClasses';
import { Sessions } from '../../api/sessions/Sessions';
import { JoinSessions } from '../../api/profiles/JoinSessions';

/** Define a publication to publish all needHelpClasses. (new) */
Meteor.publish(NeedHelpClasses.userPublicationName, () => NeedHelpClasses.collection.find());

/** Define a publication to publish all helpOthersClasses. (new) */
Meteor.publish(HelpOthersClasses.userPublicationName, () => HelpOthersClasses.collection.find());

/** Define a publication to publish all sessions. (new) */
Meteor.publish(Sessions.userPublicationName, () => Sessions.collection.find());

/** Define a publication to publish all profiles. */
Meteor.publish(Profiles.userPublicationName, () => Profiles.collection.find());

/** Define a publication to publish this collection. (new) */
Meteor.publish(ProfilesNeedHelpClasses.userPublicationName, () => ProfilesNeedHelpClasses.collection.find());

/** Define a publication to publish this collection. (new) */
Meteor.publish(ProfilesHelpOthersClasses.userPublicationName, () => ProfilesHelpOthersClasses.collection.find());

/** Define a publication to publish this collection. (new) */
Meteor.publish(JoinSessions.userPublicationName, () => JoinSessions.collection.find());

Meteor.publish(Reports.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Reports.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Reports.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Reports.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
