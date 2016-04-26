import React from 'react'
import { Router, Route, browserHistory } from 'react-router'

import Welcome from '../../ui/pages/Welcome.jsx'
import ReadStories from '../../ui/pages/ReadStories.jsx'
import WriteStories from '../../ui/pages/WriteStories.jsx'

export const routes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={Welcome}/>
    <Route path='/read' component={ReadStories}/>
    <Route path='/write' component={WriteStories}/>
  </Router>
)
