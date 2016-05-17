import { Meteor } from 'meteor/meteor'
import { Locations } from '../collections.js'

Meteor.publish('locations.public', function () {
  return Locations.find({}, { fields: Locations.publicFields })
})
