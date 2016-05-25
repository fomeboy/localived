import React from 'react'

class TextArea extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <textarea
        name={this.props.name}
        disabled={this.props.disabled}
        readonly={this.props.readonly}
        maxlength={this.props.maxlength}
        onBlur={this.props.onBlur}
      />
    )
  }
}

TextArea.propTypes = {
  name: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  readonly: React.PropTypes.bool,
  maxlength: React.PropTypes.bool,
  onBlur: React.PropTypes.func.isRequired
}

TextArea.defaultProps = {}

export default TextArea
