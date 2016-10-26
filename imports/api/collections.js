import { Mongo } from 'meteor/mongo'

// static collections
export const Languages = new Mongo.Collection('languages')
export const Countries = new Mongo.Collection('countries')
export const Dates = new Mongo.Collection('dates')

// reactive collections
export const Locations = new Mongo.Collection('locations')
export const Stories = new Mongo.Collection('stories')

// public fields
Locations.publicFields = {
  verified: 1,
  location: 1,
  country: 1
}

Stories.publicFields = {
  verified: 1,
  updateDate: 1,
  username: 1,
  language: 1,
  country: 1,
  date: 1,
  location: 1,
  title: 1,
  story: 1
}
