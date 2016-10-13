import React from 'react'

class InputText extends React.Component {

  constructor (props) {
    super(props)
    this.state = {value: ''}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState({value: e.target.value})
  }

  render () {
    return (
      <input
        type='text'
        value={this.state.value}
        placeholder={this.props.placeholder}
        className={this.props.className}
        disabled={this.props.disabled}
        readonly={this.props.readonly}
        maxlength={this.props.maxlength}
        onBlur={this.props.onBlur}
        onChange={this.handleChange}
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
