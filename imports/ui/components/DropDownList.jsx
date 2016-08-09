import React from 'react'

class DropDownList extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <select className={this.props.className} defaultValue={this.props.placeholder} onChange={this.props.onChange}>
        <option value={this.props.placeholder} disabled hidden>{this.props.placeholder}</option>
        {this.props.options.map((option, i) => {
          return <option key={i} value={option.value}>{option.value}</option>
        })}
      </select>
    )
  }
}

DropDownList.propTypes = {
  className: React.PropTypes.string,
  onChange: React.PropTypes.func,
  options: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
}

DropDownList.defaultProps = {}

export default DropDownList
