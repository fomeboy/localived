import { Meteor } from 'meteor/meteor'
import React from 'react'
import { Link } from 'react-router'

class Welcome extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div>
        <h1>Stories with context</h1>
        <Link to='/read'> READ</Link>
        <Link to='/write'> SHARE</Link>
        {/* {Meteor.userId ? (<Link to='/write'>SHARE</Link>) : (<Link to='/login'>SHARE</Link>)}  */}
      </div>
    )
  }
}

export default Welcome
