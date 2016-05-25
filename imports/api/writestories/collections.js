import { Mongo } from 'meteor/mongo'

// static collections
export const Languages = new Mongo.Collection('languages')
export const Countries = new Mongo.Collection('countries')
export const Dates = new Mongo.Collection('dates')

// reactive collections
export const Locations = new Mongo.Collection('locations')
export const Stories = new Mongo.Collection('stories')
