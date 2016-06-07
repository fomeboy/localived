import React from 'react'
import { Router, Route, browserHistory } from 'react-router'

import Welcome from '../../ui/pages/Welcome.jsx'
import Login from '../../ui/pages/Login.jsx'
import ReadStories from '../../ui/pages/ReadStories.jsx'
import WriteStoriesContainer from '../../ui/containers/writeStoriesContainer.js'
import ResetPassword from '../../ui/pages/ResetPassword.jsx'

export const routes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={Welcome}/>
    <Route path='/read' component={ReadStories}/>
    <Route path='/write' component={WriteStoriesContainer}/>
    <Route path='/login' component={Login}/>
    <Route path='/reset-password/:token' component={ResetPassword}/>
  </Router>
)
