import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import WriteStories from '../pages/WriteStories.jsx'
import { Stories, Locations } from '../../api/collections.js'
import { LocalLanguages, LocalCountries, LocalDates } from '../../api/client/collections.js'
import { Session } from 'meteor/session'

export default createContainer(() => {
  let languages = []
  let countries = []
  let dates = []
  let locations = []
  let stories = []
  const locationsHandle = Meteor.subscribe('locations.public', null)
  const storiesHandle = Meteor.subscribe('userStories.public', null)

  // Wired collections
  if (locationsHandle.ready()) {
    locations = Locations.find({ country: Session.get('selectedCountry') }, {sort: {value: 0}}).fetch()
  }

  if (storiesHandle.ready()) {
    stories = Stories.find({}, {}).fetch()
  }

  // Local collections
  languages = LocalLanguages.find({}, {sort: {value: 1}}).fetch()
  countries = LocalCountries.find({}, {sort: {value: 1}}).fetch()
  dates = LocalDates.find({}, {sort: {value: -1}}).fetch()

  return {
    languages,
    locations,
    countries,
    dates
  }
}, WriteStories)

