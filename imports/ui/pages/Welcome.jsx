import '../stylesheets/welcome.scss'
import { Meteor } from 'meteor/meteor'
import React from 'react'
import { Link } from 'react-router'
import TextArea from '../components/TextArea.jsx'

class Welcome extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.message = `Our daily rituals, social interactions, joys and disappointments take place in a village, community or neighbourhood. Life occurs locally.\n\nThese combined experiences shape our individual identity and that of our communities.\n\nStories old and new connect us to one another and tell us what it means to be human.`
  }

  componentWillMount () {
    console.log(Meteor.userId())
  }

  render () {
    let shareLink = Meteor.userId() ? <Link className='welcome-options-write' to='/write'>SHARE</Link> : <Link className='welcome-options-write' to='/login'>SHARE</Link>
    return (
      <div className='welcome'>
        <div className='welcome-about'>
          <p className='welcome-about-title'>MODERN BARD</p>
          <p className='welcome-about-subtitle'>Local Stories Worth Saving</p>
        </div>
        <div className='welcome-introduction'>
          <div contenteditable className='welcome-introduction-text'>{this.message}</div>
        </div>
        <div className='welcome-options'>
          <Link className='welcome-options-read' to='/read'>READ</Link>
          {shareLink}
        </div>
      </div>
    )
  }
}

export default Welcome
