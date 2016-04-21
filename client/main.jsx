import React from 'react'
import { render } from 'react-dom'
import { Meteor } from 'meteor/meteor'

import Welcome from '../imports/ui/Welcome'

Meteor.startup(() => {
  render(<Welcome />, document.getElementById('render-app'))
})

