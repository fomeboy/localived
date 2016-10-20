import '../stylesheets/write.scss'
import { Meteor } from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'
import { buildErrorMsg } from '../../api/utils.js'
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
import { ValidationError } from 'meteor/mdg:validation-error'
import { Locations, Stories } from '../../api/writestories/collections.js'

class WriteStories extends React.Component {

  constructor (props) {
    super(props)
    this.state = {title: ''}
    this.handleLanguageChange = this.handleLanguageChange.bind(this)
    this.handleCountryChange = this.handleCountryChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleStoryChange = this.handleStoryChange.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.clearInputs = this.clearInputs.bind(this)
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

  clearInputs () {
    this.setState({date: ''}, () => {
      this.refs.inputDate.state.value = ''
    })

    this.setState({language: ''}, () => {
      this.refs.inputLanguage.state.value = ''
    })

    this.setState({country: ''}, () => {
      this.refs.inputCountry.state.value = ''
    })

    this.setState({location: ''}, () => {
      this.refs.inputLoc.state.value = ''
    })

    this.setState({title: ''}, () => {
      this.refs.inputTitle.state.value = ''
    })

    this.setState({story: ''}, () => {
      this.refs.inputStory.state.value = ''
    })
  }

  handleButtonClick (e) {
    this.msgs_submit = []
    this.setState({msgs_submit: []})
    required(this.state.date, this.msgs_submit, 'Date')
    required(this.state.language, this.msgs_submit, 'Language')
    required(this.state.country, this.msgs_submit, 'Country')
    required(this.state.location, this.msgs_submit, 'Village/Neighbourhood')
    required(this.state.title, this.msgs_submit, 'Title')
    required(this.state.story, this.msgs_submit, 'Story')

    if (this.msgs_submit.length > 0) {
      this.setState({msgs_submit: buildErrorMsg(this.msgs_submit)})
    } else {
      if (Stories.find({date: this.state.date,
                       language: this.state.language,
                       country: this.state.country,
                       location: this.state.location,
                       title: this.state.title
      }).count() > 0) {
        this.setState({msgs_submit: this.msgs_submit.concat('Story already exists. To edit it please use your account area...')})
      } else {
        publishStory.call({
          language: this.state.language,
          country: this.state.country,
          location: this.state.location,
          date: this.state.date,
          title: this.state.title,
          story: this.state.story
        }, (err, res) => {
          if (err) {
            if (ValidationError.is(err)) {
              this.setState({msgs_submit: this.msgs_submit.concat('Field validation error: ' + err.reason)})
            } else {
              this.setState({msgs_submit: this.msgs_submit.concat('Story submission error: ' + err.reason)})
            }
          } else {
            this.clearInputs()
            this.setState({msgs_submit: this.msgs_submit.concat('Story submitted! Please wait for approval...')})
          }
        })
      }
    }
  }

  render () {
    return (
      <div className='write'>
        <div className='write-context'>
            <p className='write-context-header'>Context</p>
            <DropDownList ref='inputDate' className='write-context-date' placeholder='Date' options={this.props.dates} onBlur={this.handleDateChange}/>
            <DropDownList ref='inputLanguage' className='write-context-language' placeholder='Language' defaultValue={this.props.selectedLanguage} options={this.props.languages} onBlur={this.handleLanguageChange}/>
            <DropDownList ref='inputCountry' className='write-context-country' placeholder='Country' defaultValue={this.props.selectedCountry} options={this.props.countries} onBlur={this.handleCountryChange}/>
            <InputAutoComplete ref='inputLoc' className='write-context-location' placeholder='Village/Neighbourhood' options={this.props.locations} onBlur={this.handleLocationChange}/>
        </div>
        <div className='write-story'>
            <p className='write-story-header'>Story</p>
            <InputText ref='inputTitle' className='write-story-title' placeholder='Title' onBlur={this.handleTitleChange} disabled={false} readonly={false}/>
            <TextArea ref='inputStory' className='write-story-story' placeholder='Story' onBlur={this.handleStoryChange} disabled={false} readonly={false}/>
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
}

export default WriteStories
