import React from 'react'

class TextArea extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.handleTab = this.handleTab.bind(this)
  }

  handleTab (event) {
    var ref = this.refs.reference
    var val = ref.value
    var start = ref.selectionStart
    var end = ref.selectionEnd

    if (event.keyCode === 9) {
      event.preventDefault()
      ref.value = val.substring(0, start) + '\t' + val.substring(end)
      ref.selectionStart = ref.selectionEnd + 1
      return false
    }
  }

  render () {
    return (
      <textarea
        ref = 'reference'
        className={this.props.className}
        disabled={this.props.disabled}
        placeholder={this.props.placeholder}
        readonly={this.props.readonly}
        maxlength={this.props.maxlength}
        onBlur={this.props.onBlur}
        onKeyDown={this.handleTab}
        >{this.props.value}</textarea>
    )
  }
}

TextArea.propTypes = {
  value: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  className: React.PropTypes.string.isRequired,
  disabled: React.PropTypes.bool,
  readonly: React.PropTypes.bool,
  maxlength: React.PropTypes.bool,
  onBlur: React.PropTypes.func
}

TextArea.defaultProps = {}

export default TextArea
