import { Meteor } from 'meteor/meteor'
import Countries from '../collections'

Meteor.publish('countries', function () {
  return Countries.find()
})
