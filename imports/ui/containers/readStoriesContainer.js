import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import ReadStories from '../pages/ReadStories.jsx'
import { Stories } from '../../api/collections.js'
import { Session } from 'meteor/session'

export default createContainer(() => {
  let stories = []
  let storiesHandle = Meteor.subscribe('stories.public', null)
  let queryOptions = {sort: {updateDate: -1}, limit: Session.get('docLimit'), skip: Session.get('docSkip')}
  let cursor

  if (storiesHandle.ready()) {
    cursor = Stories.find({}, queryOptions)
    Session.set('docCount', cursor.count())
    stories = cursor.fetch()
  }

  return {
    stories
  }
}, ReadStories)
