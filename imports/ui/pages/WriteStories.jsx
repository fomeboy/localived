import { Meteor } from 'meteor/meteor'
import React from 'react'
import DropDownList from '../components/DropDownList.jsx'
import { LocalCountries } from '../../api/writestories/client/collections.js'

class WriteStories extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.handleCountryChange = this.handleCountryChange.bind(this)
  }

  componentWillMount () {
    this.options = LocalCountries.find().fetch()
  }

  handleCountryChange (e) {
    this.setState({country: e.target.value}, () => console.log('afinal: ' + this.state.country))
  }

  render () {
    return (
      <div>
        <h5>Write Stories</h5>
        <DropDownList name={this.props.name} defaultValue={this.props.selected} options={this.options} onChange={this.handleCountryChange}/>
      </div>
    )
  }
}

WriteStories.propTypes = {}

WriteStories.defaultProps = {
  name: 'countryList',
  // options: [{'value': 'one'}, {'value': 'spain'}],
  selected: 'spain'
}

export default WriteStories
