import React from 'react'

class DropDownList extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <select name={this.props.name} defaultValue={this.props.defaultValue} onChange={this.props.onChange}>
        {this.props.options.map((option, i) => {
          return <option key={i} value={option.value}>{option.value}</option>
        })}
      </select>
    )
  }
}

DropDownList.propTypes = {
  name: React.PropTypes.string,
  onChange: React.PropTypes.func,
  options: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
}

DropDownList.defaultProps = {}

export default DropDownList
