import { Meteor } from 'meteor/meteor'
import { Languages, Countries, Dates } from './collections.js'

Meteor.methods({
  getLanguages: function (msg) {
    return Languages.find().fetch()
  },
  getCountries: function (msg) {
    return Countries.find().fetch()
  },
  getDates: function (msg) {
    return Dates.find().fetch()
  }
})
