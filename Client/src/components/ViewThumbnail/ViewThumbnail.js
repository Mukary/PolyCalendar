import React from 'react'
import {Link} from 'react-router-dom'
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
    const numberOfCalendars = this.props.calendars.length
    return(
      <div className="row" style={{width:'1000px'}}>
        <div className="col-sm-6 col-md-4">
          <div className="thumbnail">
            <div className="caption">
              <h3>{this.props.title}</h3>
              <span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>{numberOfCalendars}
              <p><Link to={`/views/${this.props.id}`}><p className="btn btn-primary" role="button">Details</p></Link> <p className="btn btn-danger" role="button" onClick={this.onDeleteView}>Delete</p></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}