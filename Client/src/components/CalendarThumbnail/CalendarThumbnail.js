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
  /*render() {
    return(
      <div>
      <Link to={`/calendars/${this.props.id}`}>
      <div className='calendar-thumbnail' style={{backgroundColor: this.props.color, float: 'left'}}>
        {this.props.title}
      </div>
      </Link>
      <div style={{float: 'left'}}><button onClick={this.onDeleteCalendar}>X</button></div>
      </div>
    )
  }*/
  render() {
    return(
      <div className="row" style={{width:'1000px', float:'left'}}>
        <div className="col-sm-6 col-md-4">
          <div className="thumbnail">
            <div className="caption">
              <h3>{this.props.title}</h3>
              <p><Link to={`/calendars/${this.props.id}`}><p className="btn btn-primary" role="button">Details</p></Link> <p className="btn btn-danger" role="button" onClick={this.onDeleteCalendar}>Delete</p></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}