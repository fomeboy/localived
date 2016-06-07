import { Meteor } from 'meteor/meteor'

import '../imports/api/writestories/collections.js'
import '../imports/api/writestories/methods.js'
import '../imports/api/methods.js'
import '../imports/api/writestories/server/publications.js'
import '../imports/startup/server/EmailTemplates.js'

Meteor.startup(() => {
  process.env.MAIL_URL = 'smtp://fomeboy@gmail.com:yuki2007@smtp.gmail.com:465/'
})
