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
    this.setState({msgs: [], passError: false})
    this.msgs = []
    this.loginAttempt = 0
  }

  handleUserChangeLogin (e) {
    this.setState({userName: e.target.value})
  }

  handlePasswordChangeLogin (e) {
    this.setState({password: e.target.value})
  }

  handleLogInClick () {
    this.msgs = []
    this.loginAttempt = this.loginAttempt + 1
    this.setState({msgs: []})
    required(this.state.userName, this.msgs, 'Username')
    required(this.state.password, this.msgs, 'Password')

    if (this.msgs.length > 0) {
      this.setState({msgs: this.msgs})
    } else {
      Meteor.loginWithPassword({username: this.state.userName},
                             this.state.password,
                             (err) => {
                               if (err) {
                                 this.setState({msgs: this.state.msgs.concat(err.reason)})
                                 if (/password/g.test(err.reason)) {
                                   if (this.loginAttempt === 3) {
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
    this.msgs = []
    this.setState({msgs: []})
    required(this.state.emailPassInput, this.msgs, 'Email')

    if (this.msgs.length > 0) {
      this.setState({msgs: this.msgs})
    } else {
      Accounts.forgotPassword({email: this.state.emailPassInput},
                              (err) => {
                                if (err) {
                                  this.setState({msgs: this.state.msgs.concat(err.reason)})
                                } else {
                                  this.setState({passError: false})
                                  this.setState({msgs: this.state.msgs.concat('Password reset instructions were sento to your email')})
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
    this.msgs = []
    this.setState({msgs: [], passError: false})
    required(this.state.userNameSign, this.msgs, 'Username')
    required(this.state.email, this.msgs, 'Email')
    email(this.state.email, this.msgs, 'Email')
    required(this.state.passwordSign, this.msgs, 'Password')

    if (this.msgs.length > 0) {
      this.setState({msgs: this.msgs})
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
                               this.setState({ msgs: this.state.msgs.concat(err.reason) })
                             } else {
                               this.setState({ msgs: this.state.msgs.concat('User ' + this.state.userNameSign + ' created!') })
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
          <Button className='main-login-button' value='Login' onClick={this.handleLogInClick} disabled={false}/>
          {this.state.passError
           ? <div>
              <h2>Forgot password?</h2>
              <InputText name='emailPassInput' onBlur={this.handleEmailPassChange} disabled={false} readonly={false}/>
              <Button name='restorePassButton' value='Restore password' onClick={this.handleRestorePassClick} disabled={false}/>
            </div>
          : null}
        </div>
        <div className='main-signup'>
          <p className='main-signup-header'>New to localived?</p>
          <InputText className='main-signup-email' onBlur={this.handleEmailChange} disabled={false} readonly={false}/>
          <InputText className='main-signup-user' onBlur={this.handleUserChange} disabled={false} readonly={false}/>
          <InputPass className='main-signup-pass' onBlur={this.handlePasswordChange} disabled={false} readonly={false}/>
          <Button className='main-signup-button' value='Sign Up' onClick={this.handleSignUpClick} disabled={false}/>
          <MessageList name='msgList' msgs={this.state.msgs}/>
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
