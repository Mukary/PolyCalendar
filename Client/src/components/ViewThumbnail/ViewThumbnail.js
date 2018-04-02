import React from 'react'
import autoBind from 'react-autobind'
import style from './ViewThumbnail.css'

export default class ViewThumbnail extends React.Component {
  constructor(props) {
    super(props)
    autoBind(this)
  }
  onDeleteView () {
    this.props.onDeleteView(this.props.id)
  }
  render() {
    return(
      <div>
      <div className='view-thumbnail' style={{backgroundColor: this.props.color, float: 'left'}}>
        {this.props.title}
      </div>
      <div style={{float: 'left'}}><button onClick={this.onDeleteView}>X</button></div>
      </div>
    )
  }
}