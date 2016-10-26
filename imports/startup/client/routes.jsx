import React from 'react'
import { Router, Route, browserHistory } from 'react-router'

import Welcome from '../../ui/pages/Welcome.jsx'
import Login from '../../ui/pages/Login.jsx'
import WriteStoriesContainer from '../../ui/containers/writeStoriesContainer.js'
import ReadStoriesContainer from '../../ui/containers/readStoriesContainer.js'
import ResetPassword from '../../ui/pages/ResetPassword.jsx'
import StoryDetail from '../../ui/pages/StoryDetail.jsx'

export const routes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={Welcome}/>
    <Route path='/read' component={ReadStoriesContainer}/>
    <Route path='/write' component={WriteStoriesContainer}/>
    <Route path='/login' component={Login}/>
    <Route path='/detail(/:title)(/:story)(/:author)' component={StoryDetail}/>
    <Route path='/reset-password/:token' component={ResetPassword}/>
  </Router>
)
