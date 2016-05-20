import { Meteor } from 'meteor/meteor'
import { getLanguages, getCountries, getDates } from '../methods.js'
import { LocalLanguages, LocalCountries, LocalDates } from './collections.js'

Meteor.call('getLanguages', null, (err, res) => {
  if (err) {
    LocalLanguages.insert({value: 'Languages list is unavailable'})
  } else {
    LocalLanguages.remove({})
    res.forEach((item) => {
      LocalLanguages.insert(item)
      console.log(item)
    })
  }
})

Meteor.call('getCountries', null, (err, res) => {
  if (err) {
    LocalCountries.insert({value: 'Country list is unavailable'})
  } else {
    LocalCountries.remove({})
    res.forEach((item) => {
      LocalCountries.insert(item)
      console.log(item)
    })
  }
})

Meteor.call('getDates', null, (err, res) => {
  if (err) {
    LocalDates.insert({value: 'Dates list is unavailable'})
  } else {
    LocalDates.remove({})
    res.forEach((item) => {
      LocalDates.insert(item)
      console.log(item)
    })
  }
})

