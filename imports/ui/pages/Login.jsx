import '../stylesheets/login.scss'
import { Meteor } from 'meteor/meteor'
import React from 'react'
import InputText from '../components/InputText.jsx'
import InputPass from '../components/InputPass.jsx'
import Button from '../components/Button.jsx'
import MessageList from '../components/MessageList.jsx'
import { required, email } from '../../api/validators.js'
import { Accounts } from 'meteor/accounts-base'
import { browserHistory } from 'react-router'

class Login extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}

    this.handleUserChangeLogin = this.handleUserChangeLogin.bind(this)
    this.handlePasswordChangeLogin = this.handlePasswordChangeLogin.bind(this)
    this.handleLogInClick = this.handleLogInClick.bind(this)

    this.handleEmailPassChange = this.handleEmailPassChange.bind(this)
    this.handleRestorePassClick = this.handleRestorePassClick.bind(this)

    this.handleUserChange = this.handleUserChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSignUpClick = this.handleSignUpClick.bind(this)
  }

  componentWillMount () {
    this.setState({msgs_login: [], msgs_signup: [], passError: false})
    this.msgs_login = []
    this.msgs_signup = []
    this.loginAttempt = 0
  }

  handleUserChangeLogin (e) {
    this.setState({userName: e.target.value})
  }

  handlePasswordChangeLogin (e) {
    this.setState({password: e.target.value})
  }

  handleLogInClick () {
    this.msgs_login = []
    this.loginAttempt = this.loginAttempt + 1
    this.setState({msgs_login: []})
    required(this.state.userName, this.msgs_login, 'Username')
    required(this.state.password, this.msgs_login, 'Password')

    if (this.msgs_login.length > 0) {
      this.setState({msgs_login: this.msgs_login})
    } else {
      Meteor.loginWithPassword({username: this.state.userName},
                             this.state.password,
                             (err) => {
                               if (err) {
                                 this.setState({msgs_login: this.state.msgs_login.concat(err.reason)})
                                 if (/password/g.test(err.reason)) {
                                   if (this.loginAttempt >= 4) {
                                     this.setState({passError: true})
                                   }
                                 }
                               } else {
                                 browserHistory.replace('/write')
                               }
                             }
                            )
    }
  }

  handleEmailPassChange (e) {
    this.setState({emailPassInput: e.target.value})
  }

  handleRestorePassClick () {
    this.msgs_login = []
    this.setState({msgs_login: []})
    required(this.state.emailPassInput, this.msgs_login, 'Email')

    if (this.msgs_login.length > 0) {
      this.setState({msgs_login: this.msgs_login})
    } else {
      Accounts.forgotPassword({email: this.state.emailPassInput},
                              (err) => {
                                if (err) {
                                  this.setState({msgs_login: this.state.msgs_login.concat(err.reason)})
                                } else {
                                  this.setState({passError: false})
                                  this.setState({msgs_login: this.state.msgs_login.concat('Please check your email for password reset instructions')})
                                }
                              }
                             )
    }
  }

  handleUserChange (e) {
    this.setState({userNameSign: e.target.value})
  }

  handleEmailChange (e) {
    this.setState({email: e.target.value})
  }

  handlePasswordChange (e) {
    this.setState({passwordSign: e.target.value})
  }

  handleSignUpClick () {
    this.msgs_signup = []
    this.setState({msgs_signup: [], passError: false})
    required(this.state.email, this.msgs_signup, 'Email')
    email(this.state.email, this.msgs_signup, 'Email')
    required(this.state.userNameSign, this.msgs_signup, 'Username')
    required(this.state.passwordSign, this.msgs_signup, 'Password')

    if (this.msgs_signup.length > 0) {
      this.setState({msgs_signup: this.msgs_signup})
    } else {
      Accounts.createUser({username: this.state.userNameSign,
                           email: this.state.email,
                           password: this.state.passwordSign,
                           profile: {
                             name: '',
                             languages: []
                           }},
                           (err) => {
                             if (err) {
                               this.setState({ msgs_signup: this.state.msgs_signup.concat(err.reason) })
                             } else {
                               this.setState({ msgs_signup: this.state.msgs_signup.concat('User ' + this.state.userNameSign + ' created!') })
                             }
                           }
                         )
    }
  }

  render () {
    return (
      <div className='main'>
        <div className='main-login'>
          <p className='main-login-header'>Already registered?</p>
          <InputText className='main-login-user' placeholder='Username' onBlur={this.handleUserChangeLogin} disabled={false} readonly={false}/>
          <InputPass className='main-login-password' placeholder='Password' onBlur={this.handlePasswordChangeLogin} disabled={false} readonly={false}/>
          {this.state.passError
           ? <div className='main-login-restore'>
              <p className='main-login-restore-header'>Forgot password?</p>
              <InputText className='main-login-restore-email' placeholder='Type your email' onBlur={this.handleEmailPassChange} disabled={false} readonly={false}/>
              <Button className='main-login-restore-button' value='Restore password' onClick={this.handleRestorePassClick} disabled={false}/>
            </div>
            : null}
          <MessageList className='main-login-message' msgs={this.state.msgs_login}/>
          <Button className='main-login-button' value='Login' onClick={this.handleLogInClick} disabled={false}/>
        </div>
        <div className='main-signup'>
          <p className='main-signup-header'>New to localived?</p>
          <InputText className='main-signup-email' placeholder='Email' onBlur={this.handleEmailChange} disabled={false} readonly={false}/>
          <InputText className='main-signup-user' placeholder='Username' onBlur={this.handleUserChange} disabled={false} readonly={false}/>
          <InputPass className='main-signup-pass' placeholder='Password' onBlur={this.handlePasswordChange} disabled={false} readonly={false}/>
          <MessageList className='main-signup-message' msgs={this.state.msgs_signup}/>
          <Button className='main-signup-button' value='Sign Up' onClick={this.handleSignUpClick} disabled={false}/>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
}

Login.defaultProps = {
}

export default Login
