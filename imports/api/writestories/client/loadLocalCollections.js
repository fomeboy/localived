import { Meteor } from 'meteor/meteor'
import { getCountries } from '../methods.js'
import { LocalCountries } from './collections.js'
import { getDates } from '../methods.js'
import { LocalDates } from './collections.js'

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

