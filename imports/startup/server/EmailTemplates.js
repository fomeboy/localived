import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Accounts.emailTemplates.siteName = 'MODERN BARD - Local Stories Worth Saving'
Accounts.emailTemplates.from = 'MODERN BARD Admin <info@modern-bard.com>'
Accounts.urls.resetPassword = (token) => {
  return Meteor.absoluteUrl('reset-password/' + token)
}

Accounts.emailTemplates.resetPassword.subject = function (user) {
  return 'Password Reset ' + user.profile.name
}
Accounts.emailTemplates.resetPassword.text = function (user, url) {
  return 'You have requested a password reset.\n' +
         'To complete your request please click the link below:\n\n' +
         url
}

