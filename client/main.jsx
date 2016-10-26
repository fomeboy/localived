import React from 'react'
import { render } from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { routes } from '../imports/startup/client/routes.jsx'
import '../imports/api/client/loadLocalCollections.js'
import '../imports/api/collections.js'
import { Session } from 'meteor/session'
import '../imports/ui/stylesheets/theme.scss'

Meteor.startup(() => {
  Session.set('selectedCountry', '')
  Session.set('docLimit', 5)
  Session.set('docSkip', 0)
  render(routes(), document.getElementById('render-app'))
})

