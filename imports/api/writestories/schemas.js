import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export const StoriesSchema = new SimpleSchema({
  users__id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  creationDate: {type: Date, optional: true},
  verified: {type: Boolean, optional: true},
  language: {type: String},
  country: {type: String},
  location: {type: String},
  date: {type: String},
  title: {type: String},
  story: {type: String, min: 30},
  updateDate: {type: Date, optional: true}
})
