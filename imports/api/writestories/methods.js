import { Meteor } from 'meteor/meteor'
import { Languages, Countries, Dates, Stories } from './collections.js'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { StoriesSchema } from './schemas.js'

export const getLanguages = new ValidatedMethod({
  name: 'getLanguages',
  validate: () => {},
  run () {
    return Languages.find().fetch()
  }
})

export const getCountries = new ValidatedMethod({
  name: 'getCountries',
  validate: () => {},
  run () {
    return Countries.find().fetch()
  }
})

export const getDates = new ValidatedMethod({
  name: 'getDates',
  validate: () => {},
  run () {
    return Dates.find().fetch()
  }
})

export const publishStory = new ValidatedMethod({
  name: 'publishStory',
  validate: StoriesSchema.validator(),
  run ({language, country, location, date, title, story}) {
    if (!this.userId) {
      throw new Meteor.Error('publishStory.userID', 'Please log in first...')
    }

    Stories.insert({
      users__id: this.userId,
      creationDate: new Date(),
      verified: false,
      language: language,
      country: country,
      location: location,
      date: date,
      title: title,
      story: story
    })
  //  if location not exists
  }
})
