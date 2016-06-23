import React from 'react'

class TextArea extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <textarea
        className={this.props.className}
        disabled={this.props.disabled}
        readonly={this.props.readonly}
        maxlength={this.props.maxlength}
        onBlur={this.props.onBlur}
        >{this.props.value}</textarea>
    )
  }
}

TextArea.propTypes = {
  value: React.PropTypes.string,
  className: React.PropTypes.string.isRequired,
  disabled: React.PropTypes.bool,
  readonly: React.PropTypes.bool,
  maxlength: React.PropTypes.bool,
  onBlur: React.PropTypes.func
}

TextArea.defaultProps = {}

export default TextArea
