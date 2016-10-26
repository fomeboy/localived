import React from 'react'
import InputText from '../components/InputText.jsx'
import TextArea from '../components/TextArea.jsx'
import Button from '../components/Button.jsx'
import { Link } from 'react-router'

class TextBox extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className={this.props.className}>
        <div className='stories-feed-stories-story-title-box'>
          <p className='stories-feed-stories-story-title-box-title' disabled={true} readonly={true}>{this.props.resizedTitle}</p>
        </div>
        <div className='stories-feed-stories-story-text'>{this.props.resizedStory}</div>
        <div className='stories-feed-stories-story-footer'>
          <div className='stories-feed-stories-story-footer-context'>{this.props.context}</div>
          <Link className='stories-feed-stories-story-footer-read' to={`/detail/${this.props.title}/${this.props.story}/${this.props.author}`}>READ</Link>
        </div>
      </div>
    )
  }
}

TextBox.propTypes = {
  className: React.PropTypes.string,
  author: React.PropTypes.string,
  title: React.PropTypes.string,
  resizedTitle: React.PropTypes.string,
  story: React.PropTypes.string,
  resizedStory: React.PropTypes.string,
  date: React.PropTypes.string,
  location: React.PropTypes.string,
  country: React.PropTypes.string,
  context: React.PropTypes.string
}

TextBox.defaultProps = {}

export default TextBox
