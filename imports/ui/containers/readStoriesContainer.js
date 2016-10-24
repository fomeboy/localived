import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import ReadStories from '../pages/ReadStories.jsx'
import { Stories } from '../../api/collections.js'
import { Session } from 'meteor/session'

export default createContainer(() => {
  let stories = []
  let storiesHandle = Meteor.subscribe('stories.public', null)
  let queryOptions = {limit: Session.get('docLimit'), skip: Session.get('docSkip')}

  if (storiesHandle.ready()) {
    stories = Stories.find({}, queryOptions).fetch()
  }

  return {
    stories
  }
}, ReadStories)
