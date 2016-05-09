import { Meteor } from 'meteor/meteor'
import { getCountries } from '../methods.js'
import { LocalCountries } from './collections.js'

Meteor.call('getCountries', null, (err, res) => {
  if (err) {
    LocalCountries.insert({value: 'Undefined'})
  } else {
    LocalCountries.remove({})
    res.forEach((item) => {
      LocalCountries.insert(item)
      console.log(item)
    })
  }
})

console.log('Loaded local countries')
