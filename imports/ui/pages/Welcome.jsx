import '../stylesheets/welcome.scss'
import { Meteor } from 'meteor/meteor'
import React from 'react'
import { Link } from 'react-router'
import TextArea from '../components/TextArea.jsx'

class Welcome extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.message = `\n\n\n\n\nOur daily rituals, social interactions, joys and disappointments take place in a village, community or neighbourhood.\nLife occurs locally.\nThese combined experiences shape our individual identity and that of our communities.\nStories old and new connect us to one another and tell us what it means to be human.\n\n\nlocalived . local stories worth sharing`
  }

  componentWillMount () {
    console.log(Meteor.userId())
  }

  render () {
    let shareLink = Meteor.userId() ? <Link className='welcome-options-write' to='/write'>SHARE</Link> : <Link className='welcome-options-write' to='/login'>SHARE</Link>
    return (
      <div className='welcome'>
        <TextArea className='welcome-introduction' readonly={true} disabled={true} value={this.message}/>
        <div className='welcome-options'>
          <Link className='welcome-options-read' to='/read'>READ</Link>
          {shareLink}
        </div>
      </div>
    )
  }
}

export default Welcome
