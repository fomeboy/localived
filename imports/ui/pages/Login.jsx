import '../stylesheets/login.scss'
import { Meteor } from 'meteor/meteor'
import React from 'react'
import { buildErrorMsg } from '../../api/utils.js'
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
    this.loginAttempt = 0
    this.setState({passError: false})
    this.setState({msgs_login: []})
  }

  handlePasswordChangeLogin (e) {
    this.setState({password: e.target.value})
    this.loginAttempt = 0
    this.setState({passError: false})
    this.setState({msgs_login: []})
  }

  handleLogInClick () {
    this.msgs_login = []
    this.loginAttempt = this.loginAttempt + 1
    this.setState({msgs_login: []})
    this.setState({passError: false})
    required(this.state.userName, this.msgs_login, 'Username')
    required(this.state.password, this.msgs_login, 'Password')

    if (this.msgs_login.length > 0) {
      this.setState({msgs_login: buildErrorMsg(this.msgs_login)})
    } else {
      Meteor.loginWithPassword({username: this.state.userName},
                             this.state.password,
                             (err) => {
                               if (err) {
                                 this.setState({msgs_login: this.state.msgs_login.concat(err.reason + '...')})
                                 if (/password/g.test(err.reason)) {
                                   if (this.loginAttempt >= 4) {
                                     this.setState({passError: true})
                                     this.setState({msgs_login: []})
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
    this.loginAttempt = 0
    email(this.state.emailPassInput, this.msgs_login, 'Email')
    required(this.state.emailPassInput, this.msgs_login, 'Email')

    if (this.msgs_login.length > 0) {
      this.setState({msgs_login: buildErrorMsg(this.msgs_login)})
    } else {
      Accounts.forgotPassword({email: this.state.emailPassInput},
                              (err) => {
                                if (err) {
                                  this.setState({msgs_login: this.state.msgs_login.concat(err.reason + '...')})
                                } else {
                                  this.setState({passError: false})
                                  this.setState({msgs_login: this.state.msgs_login.concat('Please check your email for password reset instructions...')})
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
    required(this.state.userNameSign, this.msgs_signup, 'Username')
    required(this.state.passwordSign, this.msgs_signup, 'Password')
    if (this.msgs_signup.length > 0) {
      this.msgs_signup = buildErrorMsg(this.msgs_signup)
    }
    email(this.state.email, this.msgs_signup, 'Email')

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
                               this.setState({ msgs_signup: this.state.msgs_signup.concat(err.reason + '...') })
                             } else {
                               this.setState({ msgs_signup: this.state.msgs_signup.concat('User ' + this.state.userNameSign + ' created!') })
                             }
                           }
                         )
    }
  }

  render () {
    return (
      <div className='registration'>
        <div className='registration-login'>
          <p className='registration-login-header'>Already registered?</p>
          <InputText className='registration-login-user' placeholder='Username' onBlur={this.handleUserChangeLogin} disabled={false} readonly={false}/>
          <InputPass className='registration-login-password' placeholder='Password' onBlur={this.handlePasswordChangeLogin} disabled={false} readonly={false}/>
          {this.state.passError
           ? <div className='registration-login-restore'>
              <p className='registration-login-restore-header'>Forgot password?</p>
              <InputText className='registration-login-restore-email' placeholder='Type your email' onBlur={this.handleEmailPassChange} disabled={false} readonly={false}/>
              <Button className='registration-login-restore-button' value='RESTORE PASSWORD' onClick={this.handleRestorePassClick} disabled={false}/>
            </div>
            : null}
          <MessageList className='registration-login-message' msgs={this.state.msgs_login}/>
          <Button className='registration-login-button' value='LOGIN' onClick={this.handleLogInClick} disabled={false}/>
        </div>
        <div className='registration-signup'>
          <p className='registration-signup-header'>New to Modern Bard?</p>
          <InputText className='registration-signup-email' placeholder='Email' onBlur={this.handleEmailChange} disabled={false} readonly={false}/>
          <InputText className='registration-signup-user' placeholder='Username' onBlur={this.handleUserChange} disabled={false} readonly={false}/>
          <InputPass className='registration-signup-pass' placeholder='Password' onBlur={this.handlePasswordChange} disabled={false} readonly={false}/>
          <MessageList className='registration-signup-message' msgs={this.state.msgs_signup}/>
          <Button className='registration-signup-button' value='SIGN UP' onClick={this.handleSignUpClick} disabled={false}/>
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
