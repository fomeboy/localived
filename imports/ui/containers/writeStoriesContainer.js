import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import WriteStories from '../pages/WriteStories.jsx'
import { Locations } from '../../api/writestories/collections.js'

export default createContainer(() => {
  let data = []
  const locationsHandle = Meteor.subscribe('locations.public', null)

  if (locationsHandle.ready()) {
    console.log('ALELUIA')
    data = Locations.find({ country: 'Portugal' }).fetch()
    console.log('data1: ' + JSON.stringify(data))
  }
  return {
    data
  }
}, WriteStories)

