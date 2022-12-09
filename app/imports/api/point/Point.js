import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Encapsulates state and variable values for this collection. */
class PointCollection {
  constructor() {
    // The name of this collection.
    this.name = 'PointCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      firstName: { type: String, optional: true },
      lastName: { type: String, optional: true },
      point: { type: Number, defaultValue: 0, optional: true },
      owner: { type: String, optional: true },
      _id: { type: String, optional: true },
    }, { tracker: Tracker });
    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
  }
}

export const Point = new PointCollection();
