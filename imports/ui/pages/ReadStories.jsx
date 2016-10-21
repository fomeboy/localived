import '../stylesheets/read.scss'
import React from 'react'
import TextBox from '../components/TextBox.jsx'
import Button from '../components/Button.jsx'

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
        <div className='stories-feed-footer'>
          <Button className='stories-feed-footer-previous' value='PREVIOUS' disabled={false}/>
          <Button className='stories-feed-footer-next' value='NEXT' disabled={false}/>
        </div>
      </div>
    )
  }
}

export default ReadStories
