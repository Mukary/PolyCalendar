import React from 'react'
import {Link} from 'react-router-dom'
import autoBind from 'react-autobind'

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
      <div className="row" style={{marginRight:'50px',float:'left'}}>
        <div className="col-sm-0 col-md-0">
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