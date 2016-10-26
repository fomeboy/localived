/* eslint no-unneeded-ternary:0 */

import '../stylesheets/read.scss'
import React from 'react'
import TextBox from '../components/TextBox.jsx'
import Button from '../components/Button.jsx'
import { Session } from 'meteor/session'

class ReadStories extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.handleNext = this.handleNext.bind(this)
    this.handlePrevious = this.handlePrevious.bind(this)
    this.nrCols = 4
  }

  handleNext () {
    var curr = Session.get('docSkip')
    curr = curr + this.nrCols
    Session.set('docSkip', curr)
  }

  handlePrevious () {
    var curr = Session.get('docSkip')
    curr = curr - this.nrCols
    Session.set('docSkip', curr)
  }

  resizeTitle (title) {
    var titleMaxLength = 50
    return title.length > titleMaxLength ? title.substr(0, title.substr(0, titleMaxLength).lastIndexOf(' ')) + '...' : title
  }

  resizeContext (country, location, date) {
    var context = country + location + date
    var contextLength = context.length
    var contextMaxLength = 35
    return contextLength > contextMaxLength ? location.substr(0, location.substr(0, contextMaxLength -
           (country.length + date.length)).lastIndexOf(' ')) + '... [' + country + '], ' +
           date : location + ' [' + country + '], ' + date
  }

  resizeStory (story) {
    var storyMaxLength = 400
    var segInit = 0
    var pos

    if (story.indexOf('\n') > storyMaxLength) {
      return story.substr(0, story.substr(0, storyMaxLength).lastIndexOf(' ')) + ' ...'
    }

    if (story.indexOf('\n') === -1) {
      if (story.length > storyMaxLength) {
        return story.substr(0, story.substr(0, storyMaxLength).lastIndexOf(' ')) + ' ...'
      }
    }

    for (var i = 0; i < 5; i++) {
      pos = story.indexOf('\n', segInit)
      if (pos === -1) {
        pos = story.length
      }
      if (pos > storyMaxLength) {
        return story.substr(0, story.substr(0, storyMaxLength).lastIndexOf(' ')) + ' ...'
      } else {
        segInit = pos + 1
      }
    }
    return (pos === story.length ? story.substr(0, pos) : story.substr(0, pos) + ' ...')
  }

  render () {
    return (
      <div className= 'stories-feed'>
        <div className='stories-feed-header'>
          <p className='stories-feed-header-title' disable={true} readonly={true}>STORIES FEED</p>
        </div>
        <div className='stories-feed-stories'>
        {this.props.stories.map((story, i) => {
          if (i < this.nrCols) {
            return <TextBox key={i} className='stories-feed-stories-story' title={story.title} resizedTitle={this.resizeTitle(story.title)} context={this.resizeContext(story.country, story.location, story.date)} resizedStory={this.resizeStory(story.story)} story={story.story} date={story.date} country={story.country} location={story.location} author={story.username}/>
          }
        })
          }
        </div>
        <div className='stories-feed-footer'>
          <Button className='stories-feed-footer-previous' value='PREVIOUS' onClick={this.handlePrevious} disabled={Session.get('docSkip') === 0 ? true : false }/>
          <Button className='stories-feed-footer-next' value='NEXT' onClick={this.handleNext} disabled={this.props.stories.length === Session.get('docLimit') ? false : true}/>
        </div>
      </div>
    )
  }
}

ReadStories.propTypes = {
  stories: React.PropTypes.array
}

ReadStories.defaultProps = {
    // selectedLanguage: 'English',
}

export default ReadStories
