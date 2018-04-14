import React from 'react'
import autoBind from 'react-autobind'
import ical from 'ical'
import CalendarThumbnail from '../CalendarThumbnail/CalendarThumbnail'
import {createCalendarDistant, deleteCalendarDistant} from '../../services/Calendars.services'
import {addCalendar, deleteCalendar} from '../../actions/index'

export default class Calendars extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLogged: false,
      displayCalendarForm: false
    }
    autoBind(this)
  }

  displayCalendarForm(){
    this.setState({
      displayCalendarForm: !this.state.displayCalendarForm
    })
  }

  addCalendar() {
    let title = this.title.value
    let color = this.color.value
    let url = this.url.value
    createCalendarDistant({
      title: title,
      color: color,
      url: url
    }).then(calendar => {
      addCalendar(calendar)
    })
  }

  onDeleteCalendar(calId){
    deleteCalendarDistant(calId).then(res => {
      deleteCalendar(calId)
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    console.log(this.props.calendars)
    return(
      <div>
        <button onClick={this.displayCalendarForm}>Add Calendar</button>
        {
          this.state.displayCalendarForm
          ?
          <div>
           <input className="form-control" ref={e => {this.title = e}}></input>
           <input ref={e => {this.color = e}}></input>
           <input ref={e => {this.url = e}}></input>
           <button className="btn btn-default" onClick={this.addCalendar}>
           <span class="glyphicon glyphicon-star" aria-hidden="true"></span>Create
           </button>
          </div> : null
        }
        {
          this.props.calendars.map(x =>{
            return(<CalendarThumbnail id={x._id} title={x.title} color={x.color} onDeleteCalendar={this.onDeleteCalendar}/>)
          })
        }
      </div>
    )
  }
}