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
        <h1> Stories with context</h1>
        <Link to='/read'> READ</Link>
        <Link to='/write'> WRITE</Link>
      </div>
    )
  }
}

export default Welcome
