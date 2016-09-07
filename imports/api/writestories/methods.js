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
  run ({user, creationDate, language, country, location, date, title, story}) {
    // if (!this.userId) {
    //   throw new Meteor.Error('you must log in to be able to publish')
    // }
    Stories.insert({
      user: user,
      language: language,
      country: country,
      location: location,
      date: date,
      title: title,
      story: story
    })
  }
})
