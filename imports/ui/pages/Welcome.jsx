import { Meteor } from 'meteor/meteor'
import React from 'react'
import { Link } from 'react-router'

class Welcome extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    console.log(Meteor.userId())
  }

  render () {
    return (
      <div>
        <h1>Stories with context {Meteor.userId}</h1>
        <Link to='/read'> READ</Link>
        {Meteor.userId() ? (<Link to='/write'>SHARE</Link>) : (<Link to='/login'>SHARE</Link>)}
      </div>
    )
  }
}

export default Welcome
