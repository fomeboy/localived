import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export const StoriesSchema = new SimpleSchema({
  user: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  creationdate: {type: Date},
  language: {type: String},
  country: {type: String},
  location: {type: String},
  date: {type: String},
  title: {type: String},
  Story: {type: String}
})
