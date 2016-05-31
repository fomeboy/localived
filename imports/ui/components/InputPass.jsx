import React from 'react'

class InputPass extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <input
        type='password'
        name={this.props.name}
        disabled={this.props.disabled}
        readonly={this.props.readonly}
        maxlength={this.props.maxlength}
        onBlur={this.props.onBlur}
      />
    )
  }
}

InputPass.propTypes = {
  name: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  readonly: React.PropTypes.bool,
  maxlength: React.PropTypes.bool,
  onBlur: React.PropTypes.func.isRequired
}

InputPass.defaultProps = {}

export default InputPass
