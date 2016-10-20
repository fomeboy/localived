import '../stylesheets/read.scss'
import React from 'react'
import TextBox from '../components/TextBox.jsx'

class ReadStories extends React.Component {

  render () {
    return (
      <div className= 'stories-feed'>
        <div className='stories-feed-header'>
          <p className='stories-feed-header-title' disable={true} readonly={true}>Stories Feed</p>
        </div>
        <div className='stories-feed-stories'>
          <TextBox className='stories-feed-stories-story'/>
          <TextBox className='stories-feed-stories-story'/>
          <TextBox className='stories-feed-stories-story'/>
          <TextBox className='stories-feed-stories-story'/>
          <TextBox className='stories-feed-stories-story'/>
        </div>
        <div className='stories-feed-footer'>NEXT</div>
      </div>
    )
  }
}

export default ReadStories
