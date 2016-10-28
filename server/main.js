import { Meteor } from 'meteor/meteor'

import '../imports/api/collections.js'
import '../imports/api/methods.js'
import '../imports/api/methods.js'
import '../imports/api/server/publications.js'
import '../imports/startup/server/EmailTemplates.js'

Meteor.startup(() => {
  process.env.MAIL_URL = 'smtp://user@gmail.com:password@smtp.gmail.com:465/'
})
