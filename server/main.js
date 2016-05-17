import { Meteor } from 'meteor/meteor'

import '../imports/api/writestories/collections.js'
import '../imports/api/writestories/methods.js'
import '../imports/api/writestories/server/publications.js'

Meteor.startup(() => {
  // code to run on server at startup
  // console.log(countries)
})
