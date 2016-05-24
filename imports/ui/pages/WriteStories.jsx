import { Meteor } from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'
import DropDownList from '../components/DropDownList.jsx'
import InputAutoComplete from '../components/InputAutoComplete.jsx'
import InputText from '../components/InputText.jsx'
import { Session } from 'meteor/session'

class WriteStories extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.handleLanguageChange = this.handleLanguageChange.bind(this)
    this.handleCountryChange = this.handleCountryChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
  }

  // componentWillMount () {
  // }

  handleLanguageChange (e) {
    this.setState({language: e.target.value}, () => console.log('language selected: ' + this.state.language))
  }

  handleCountryChange (e) {
    Session.set('selectedCountry', e.target.value)
    this.refs.inputLoc.state.value = ''
    this.setState({country: e.target.value}, () => console.log('country selected: ' + this.state.country))
  }

  handleDateChange (e) {
    this.setState({date: e.target.value}, () => console.log('date selected: ' + this.state.date))
  }

  handleLocationChange (e) {
    this.setState({location: e.target.value}, () => {
      console.log('location selected: ' + this.state.location)
    })
  }

  handleTitleChange (e) {
    this.setState({title: e.target.value}, () => {
      console.log('title change: ' + this.state.title)
    })
  }

  render () {
    return (
      <div>
        <h5>Write Stories</h5>
        <DropDownList name='languagesList' defaultValue={this.props.selectedLanguage} options={this.props.languages} onChange={this.handleLanguageChange}/>
        <DropDownList name='countryList' defaultValue={this.props.selectedCountry} options={this.props.countries} onChange={this.handleCountryChange}/>
        <DropDownList name='dateList' defaultValue={this.props.selectedDate} options={this.props.dates} onChange={this.handleDateChange}/>
        <InputAutoComplete ref='inputLoc' name='locationsInput' placeholder='Type location' options={this.props.locations} onBlur={this.handleLocationChange}/>
        <InputText name='titleInput' onBlur={this.handleTitleChange} disabled={false} readonly={false}/>
      </div>
    )
  }
}

WriteStories.propTypes = {
  languages: React.PropTypes.array,
  locations: React.PropTypes.array,
  countries: React.PropTypes.array,
  dates: React.PropTypes.array
}

WriteStories.defaultProps = {
  // selectedLanguage: 'English',
  // selectedCountry: 'Portugal',
  // selectedDate: '2015'
}

export default WriteStories
