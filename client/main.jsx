import React from 'react'
import { render } from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { routes } from '../imports/startup/client/routes.jsx'
import '../imports/api/writestories/client/loadLocalCollections.js'
import '../imports/api/writestories/collections.js'
import { Session } from 'meteor/session'

Meteor.startup(() => {
  Session.set('selectedCountry', '')
  render(routes(), document.getElementById('render-app'))
})

