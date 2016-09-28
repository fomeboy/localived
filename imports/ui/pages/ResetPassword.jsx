import '../stylesheets/reset.scss'
import { Meteor } from 'meteor/meteor'
import React from 'react'
import { buildErrorMsg } from '../../api/utils.js'
import InputText from '../components/InputText.jsx'
import InputPass from '../components/InputPass.jsx'
import Button from '../components/Button.jsx'
import MessageList from '../components/MessageList.jsx'
import { required, equality } from '../../api/validators.js'
import { Accounts } from 'meteor/accounts-base'

class ResetPassword extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}

    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handlePasswordChange2 = this.handlePasswordChange2.bind(this)
    this.handleResetClick = this.handleResetClick.bind(this)
  }

  componentWillMount () {
    this.setState({msgs: []})
    this.msgs = []
  }

  handlePasswordChange (e) {
    this.setState({password: e.target.value})
  }

  handlePasswordChange2 (e) {
    this.setState({password2: e.target.value})
  }

  handleResetClick () {
    this.msgs = []
    this.setState({msgs: []})
    required(this.state.password, this.msgs, 'Password')
    required(this.state.password2, this.msgs, 'Password confirmation')
    if (this.msgs.length > 0) {
      this.msgs = buildErrorMsg(this.msgs)
    }
    equality(this.state.password, this.state.password2, this.msgs, 'Passwords')

    if (this.msgs.length > 0) {
      this.setState({msgs: this.msgs})
    } else {
      Accounts.resetPassword(this.props.params.token,
                             this.state.password,
                             (err) => {
                               if (err) {
                                 this.setState({msgs: this.state.msgs.concat('Error updating password: ' + err.reason)})
                               } else {
                                 this.setState({msgs: this.state.msgs.concat('Password successfully changed!')})
                               }
                             }
                            )
    }
  }

  render () {
    return (
      <div className='reset'>
        <div className='reset-pass'>
          <p className='reset-pass-header'>Password reset requested?</p>
          <InputPass className='reset-pass-input' placeholder='Type new password' onBlur={this.handlePasswordChange} disabled={false} readonly={false}/>
          <InputPass className='reset-pass-input2' placeholder='Confirm new password' onBlur={this.handlePasswordChange2} disabled={false} readonly={false}/>
          <MessageList className='reset-pass-message' msgs={this.state.msgs}/>
          <Button className='reset-pass-button' value='RESET PASSWORD' onClick={this.handleResetClick} disabled={false}/>
        </div>
      </div>
    )
  }
}

ResetPassword.propTypes = {
}

ResetPassword.defaultProps = {
}

export default ResetPassword
