import React from 'react'

class InputText extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <input
        type='text'
        placeholder={this.props.placeholder}
        className={this.props.className}
        disabled={this.props.disabled}
        readonly={this.props.readonly}
        maxlength={this.props.maxlength}
        onBlur={this.props.onBlur}
      />
    )
  }
}

InputText.propTypes = {
  className: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  readonly: React.PropTypes.bool,
  maxlength: React.PropTypes.bool,
  onBlur: React.PropTypes.func.isRequired
}

InputText.defaultProps = {}

export default InputText
