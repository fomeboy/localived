import React from 'react'
import Autosuggest from 'react-autosuggest'

class InputAutoComplete extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      value: '',
      suggestions: this.getSuggestions('')
    }

    this.getSuggestionValue = this.getSuggestionValue.bind(this)
    this.renderSuggestion = this.renderSuggestion.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this)
  }

  getSuggestions (value) {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0 ? [] : this.props.options.filter(
      item => item.value.toLowerCase().slice(0, inputLength) === inputValue
    )
  }

  getSuggestionValue (suggestion) {
    return suggestion.value
  }

  renderSuggestion (suggestion) {
    return (
      <span>{suggestion.value}</span>
    )
  }

  onChange (event, {newValue, method}) {
    this.setState({value: newValue})
  }

  onSuggestionsUpdateRequested ({value}) {
    this.setState({suggestions: this.getSuggestions(value)})
  }

  render () {
    const { value, suggestions } = this.state
    const inputProps = {
      placeholder: this.props.placeholder,
      value,
      onChange: this.onChange,
      onBlur: this.props.onBlur,
      className: this.props.className
    }

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
        renderSuggestion={this.renderSuggestion}
        getSuggestionValue={this.getSuggestionValue}
        inputProps={inputProps}
      />
    )
  }
}

InputAutoComplete.propTypes = {
  className: React.PropTypes.string,
  onBlur: React.PropTypes.func,
  options: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  placeholder: React.PropTypes.string
}

InputAutoComplete.defaultProps = {}

export default InputAutoComplete
