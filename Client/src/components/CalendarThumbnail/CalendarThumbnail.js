import React from 'react'
import {Link} from 'react-router-dom'
import autoBind from 'react-autobind'
import style from './CalendarThumbnail.css'

export default class CalendarThumbnail extends React.Component {
  constructor(props) {
    super(props)
    autoBind(this)
  }
  onDeleteCalendar () {
    this.props.onDeleteCalendar(this.props.id)
  }
  render() {
    return(
      <div>
      <div className='calendar-thumbnail' style={{backgroundColor: this.props.color, float: 'left'}}>
        {this.props.title}
      </div>
      <div style={{float: 'left'}}><button onClick={this.onDeleteCalendar}>X</button></div>
      </div>
    )
  }
}