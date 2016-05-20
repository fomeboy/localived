import { Mongo } from 'meteor/mongo'

export const Languages = new Mongo.Collection('languages')
export const Countries = new Mongo.Collection('countries')
export const Dates = new Mongo.Collection('dates')

export const Locations = new Mongo.Collection('locations')

