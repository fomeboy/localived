import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export const StoriesSchema = new SimpleSchema({
  // user: {type: String, regEx: SimpleSchema.RegEx.Id},
  user: {type: String},
  creationDate: {type: Date},
  language: {type: String},
  country: {type: String},
  location: {type: String},
  date: {type: String},
  title: {type: String},
  story: {type: String},
  updateDate: {type: Date, optional: true}
})
