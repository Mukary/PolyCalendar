import React from 'react'
import style from './ViewThumbnail.css'

export default class ViewThumbnail extends React.Component {
  render() {
    return(
      <div className='view-thumbnail' style={{backgroundColor: this.props.color}}>
        {this.props.title}
      </div>
    )
  }
}