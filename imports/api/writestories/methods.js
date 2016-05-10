import { Meteor } from 'meteor/meteor'
import { Countries } from './collections.js'
import { Dates } from './collections.js'

Meteor.methods({
  getCountries: function (msg) {
    return Countries.find().fetch()
  },
  getDates: function (msg) {
    return Dates.find().fetch()
  }
})
