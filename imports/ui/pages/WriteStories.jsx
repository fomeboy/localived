import { Meteor } from 'meteor/meteor'
import React from 'react'
import DropDownList from '../components/DropDownList.jsx'
import { LocalCountries, LocalDates } from '../../api/writestories/client/collections.js'

class WriteStories extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.handleCountryChange = this.handleCountryChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  componentWillMount () {
    this.countries = LocalCountries.find({}, {sort: {value: 0}}).fetch()
    this.dates = LocalDates.find({}, {sort: {value: -1}}).fetch()
  }

  handleCountryChange (e) {
    this.setState({country: e.target.value}, () => console.log('country selected: ' + this.state.country))
  }

  handleDateChange (e) {
    this.setState({date: e.target.value}, () => console.log('date selected: ' + this.state.date))
  }

  render () {
    return (
      <div>
        <h5>Write Stories</h5>
        <DropDownList name='countryList' defaultValue={this.props.selected} options={this.countries} onChange={this.handleCountryChange}/>
        <DropDownList name='dateList' defaultValue={this.props.selected} options={this.dates} onChange={this.handleDateChange}/>
      </div>
    )
  }
}

WriteStories.propTypes = {}

WriteStories.defaultProps = {
  selectedCountry: 'spain',
  selectedDate: '2015'
}

export default WriteStories
