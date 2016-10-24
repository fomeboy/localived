import React from 'react'
import InputText from '../components/InputText.jsx'
import TextArea from '../components/TextArea.jsx'
import Button from '../components/Button.jsx'

class TextBox extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.handleReadButton = this.handleReadButton.bind(this)
  }

  handleReadButton () {
    console.log('carreguei man...')
  }

  render () {
    return (
      <div className={this.props.className}>
        <div className='stories-feed-stories-story-title-box'>
          <p className='stories-feed-stories-story-title-box-title' disabled={true} readonly={true}>{this.props.title}</p>
        </div>
        <div className='stories-feed-stories-story-text'>{this.props.story}</div>
        <div className='stories-feed-stories-story-footer'>
          <div className='stories-feed-stories-story-footer-context'>{this.props.context}</div>
          <Button className='stories-feed-stories-story-footer-read' value='READ' disabled={false} onClick={this.handleReadButton} />
        </div>
      </div>
    )
  }
}

TextBox.propTypes = {
  className: React.PropTypes.string,
  title: React.PropTypes.string,
  story: React.PropTypes.string,
  date: React.PropTypes.string,
  location: React.PropTypes.string,
  country: React.PropTypes.string
}

TextBox.defaultProps = {}

export default TextBox
