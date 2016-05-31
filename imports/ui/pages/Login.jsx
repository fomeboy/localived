import { Meteor } from 'meteor/meteor'
import React from 'react'
import InputText from '../components/InputText.jsx'
import InputPass from '../components/InputPass.jsx'
import Button from '../components/Button.jsx'
import MessageList from '../components/MessageList.jsx'
import { required, email } from '../../api/validators.js'
import { Accounts } from 'meteor/accounts-base'

class Login extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}

    this.handleUserChangeLogin = this.handleUserChangeLogin.bind(this)
    this.handlePasswordChangeLogin = this.handlePasswordChangeLogin.bind(this)
    this.handleLogInClick = this.handleLogInClick.bind(this)

    this.handleUserChange = this.handleUserChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSignUpClick = this.handleSignUpClick.bind(this)
  }

  componentWillMount () {
    this.setState({msgs: []})
    this.msgs = []
  }

  handleUserChangeLogin (e) {
    this.setState({userName: e.target.value}, () => console.log('user selected: ' + this.state.userName))
  }

  handlePasswordChangeLogin (e) {
    this.setState({password: e.target.value}, () => console.log('password selected: ' + this.state.password))
  }

  handleLogInClick (e) {
    this.msgs = []
    this.setState({msgs: [], passError: false})
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
                                   this.setState({passError: true})
                                 }
                               }
                             }
                            )
    }
  }

  handleUserChange (e) {
    this.setState({userNameSign: e.target.value}, () => console.log('user selected: ' + this.state.userNameSign))
  }

  handleEmailChange (e) {
    this.setState({email: e.target.value}, () => console.log('email selected: ' + this.state.email))
  }

  handlePasswordChange (e) {
    this.setState({passwordSign: e.target.value}, () => console.log('password selected: ' + this.state.passwordSign))
  }

  handleSignUpClick (e) {
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
                           profile: {}},
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
      <div>
        <div>
          <h5>LOGIN</h5>
          {this.state.passError ? <p>toma</p> : null}
          <InputText name='userInputLogin' onBlur={this.handleUserChangeLogin} disabled={false} readonly={false}/>
          <InputPass name='passwordInputLogin' onBlur={this.handlePasswordChangeLogin} disabled={false} readonly={false}/>
          <Button name='loginButton' value='Log in' onClick={this.handleLogInClick} disabled={false}/>
        </div>

        <div>
          <h5>SIGN UP</h5>
          <InputText name='userInput' onBlur={this.handleUserChange} disabled={false} readonly={false}/>
          <InputText name='emailInput' onBlur={this.handleEmailChange} disabled={false} readonly={false}/>
          <InputPass name='passwordInput' onBlur={this.handlePasswordChange} disabled={false} readonly={false}/>
          <Button name='signUpButton' value='Sign up' onClick={this.handleSignUpClick} disabled={false}/>
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
