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
        className={this.props.className}
        placeholder={this.props.placeholder}
        disabled={this.props.disabled}
        readonly={this.props.readonly}
        maxlength={this.props.maxlength}
        onBlur={this.props.onBlur}
      />
    )
  }
}

InputPass.propTypes = {
  className: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  readonly: React.PropTypes.bool,
  maxlength: React.PropTypes.bool,
  onBlur: React.PropTypes.func.isRequired
}

InputPass.defaultProps = {}

export default InputPass
