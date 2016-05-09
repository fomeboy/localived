import { Meteor } from 'meteor/meteor'
import { Countries } from './collections.js'

Meteor.methods({
  getCountries: function (msg) {
    console.log('me camhou: ' + Countries)
    return Countries.find().fetch()
  }
})
