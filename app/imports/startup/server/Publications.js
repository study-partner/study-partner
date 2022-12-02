import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Interests } from '../../api/interests/Interests';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';
import { Projects } from '../../api/projects/Projects';
import { ProjectsInterests } from '../../api/projects/ProjectsInterests';
import { NeedHelpClasses } from '../../api/NeedHelpClasses/NeedHelpClasses';
import { ProfilesNeedHelpClasses } from '../../api/profiles/ProfilesNeedHelpClasses';
import { Reports } from '../../api/report/Reports';
import { HelpOthersClasses } from '../../api/HelpOthersClasses/HelpOthersClasses';
import { ProfilesHelpOthersClasses } from '../../api/profiles/ProfilesHelpOthersClasses';

/** Define a publication to publish all interests. */
Meteor.publish(Interests.userPublicationName, () => Interests.collection.find());

/** Define a publication to publish all needHelpClasses. (new) */
Meteor.publish(NeedHelpClasses.userPublicationName, () => NeedHelpClasses.collection.find());

/** Define a publication to publish all helpOthersClasses. (new) */
Meteor.publish(HelpOthersClasses.userPublicationName, () => HelpOthersClasses.collection.find());

/** Define a publication to publish all profiles. */
Meteor.publish(Profiles.userPublicationName, () => Profiles.collection.find());

/** Define a publication to publish this collection. */
Meteor.publish(ProfilesInterests.userPublicationName, () => ProfilesInterests.collection.find());

/** Define a publication to publish this collection. */
Meteor.publish(ProfilesProjects.userPublicationName, () => ProfilesProjects.collection.find());

/** Define a publication to publish this collection. (new) */
Meteor.publish(ProfilesNeedHelpClasses.userPublicationName, () => ProfilesNeedHelpClasses.collection.find());

/** Define a publication to publish this collection. (new) */
Meteor.publish(ProfilesHelpOthersClasses.userPublicationName, () => ProfilesHelpOthersClasses.collection.find());

/** Define a publication to publish all projects. */
Meteor.publish(Projects.userPublicationName, () => Projects.collection.find());

/** Define a publication to publish this collection. */
Meteor.publish(ProjectsInterests.userPublicationName, () => ProjectsInterests.collection.find());

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
