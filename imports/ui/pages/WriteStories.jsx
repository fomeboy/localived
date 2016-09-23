import '../stylesheets/write.scss'
import { Meteor } from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'
import DropDownList from '../components/DropDownList.jsx'
import InputAutoComplete from '../components/InputAutoComplete.jsx'
import InputText from '../components/InputText.jsx'
import TextArea from '../components/TextArea.jsx'
import Button from '../components/Button.jsx'
import MessageList from '../components/MessageList.jsx'
import { required } from '../../api/validators.js'
import { Session } from 'meteor/session'
import { browserHistory } from 'react-router'
import { publishStory } from '../../api/writestories/methods.js'

class WriteStories extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.handleLanguageChange = this.handleLanguageChange.bind(this)
    this.handleCountryChange = this.handleCountryChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleStoryChange = this.handleStoryChange.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  componentWillMount () {
    this.setState({msgs_submit: []})
    this.msgs_submit = []
    if (!Meteor.userId()) {
      browserHistory.replace('/login')
    }
    console.log('USER:' + Meteor.userId())
  }

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

  handleStoryChange (e) {
    this.setState({story: e.target.value}, () => {
      console.log('story change: ' + this.state.story)
    })
  }

  buildErrorMsg (msgs) {
    var msgOut = ''
    for (var i = 0; i < msgs.length; i++) {
      i === 0 ? msgOut += msgs[i] : msgOut += ', ' + msgs[i]
    }
    return ['Please fill in the following fields: ' + msgOut]
  }

  handleButtonClick (e) {
    this.msgs_submit = []
    this.setState({msgs_submit: []})
    required(this.state.date, this.msgs_submit, 'date')
    required(this.state.language, this.msgs_submit, 'language')
    required(this.state.country, this.msgs_submit, 'country')
    required(this.state.location, this.msgs_submit, 'village')
    required(this.state.title, this.msgs_submit, 'title')
    required(this.state.story, this.msgs_submit, 'story')

    if (this.msgs_submit.length > 0) {
      // this.setState({msgs_submit: this.msgs_submit})
      this.setState({msgs_submit: this.buildErrorMsg(this.msgs_submit)})
    } else {
      publishStory.call({
        user: Meteor.userId(),
        creationDate: new Date(),
        language: this.state.language,
        country: this.state.country,
        location: this.state.location,
        date: this.state.date,
        title: this.state.title,
        story: this.state.story
      }, (err, res) => {
        if (err) {
          console.log('Error submiting story: ' + err)
        }
      })
    }
  }

  render () {
    return (
      <div className='write'>
        <div className='write-context'>
            <p className='write-context-header'>Context</p>
            <DropDownList className='write-context-date' placeholder='date...' defaultValue={this.props.selectedDate} options={this.props.dates} onChange={this.handleDateChange}/>
            <DropDownList className='write-context-language' placeholder='language...' defaultValue={this.props.selectedLanguage} options={this.props.languages} onChange={this.handleLanguageChange}/>
            <DropDownList className='write-context-country' placeholder='country...' defaultValue={this.props.selectedCountry} options={this.props.countries} onChange={this.handleCountryChange}/>
            <InputAutoComplete ref='inputLoc' className='write-context-location' placeholder='village/neighbourhood...' options={this.props.locations} onBlur={this.handleLocationChange}/>
        </div>
        <div className='write-story'>
            <p className='write-story-header'>Story</p>
            <InputText className='write-story-title' placeholder='title...' onBlur={this.handleTitleChange} disabled={false} readonly={false}/>
            <TextArea className='write-story-story' placeholder='share your story...' onBlur={this.handleStoryChange} disabled={false} readonly={false}/>
            <MessageList className='write-story-messages' msgs={this.state.msgs_submit}/>
            <Button className='write-story-button' value='SUBMIT' onClick={this.handleButtonClick} disabled={false}/>
        </div>
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
