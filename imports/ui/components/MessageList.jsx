import React from 'react'

class MessageList extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className={this.props.className}>
      {this.props.msgs.map((msg, i) => { return <div key={i}><p>{msg}</p></div> })}
      </div>
    )
  }
}

MessageList.propTypes = {
  className: React.PropTypes.string,
  msgs: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
}

MessageList.defaultProps = {}

export default MessageList
