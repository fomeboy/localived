import { Meteor } from 'meteor/meteor'
import { Stories, Locations } from '../collections.js'

Meteor.publish('locations.public', function () {
  return Locations.find({verified: true}, { fields: Locations.publicFields })
})

Meteor.publish('userStories.public', function () {
  return Stories.find({users__id: this.userId}, { fields: Stories.publicFields })
})

Meteor.publish('stories.public', function () {
  return Stories.find({}, {fields: Stories.publicFields})
})
