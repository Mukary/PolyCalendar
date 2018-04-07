import React from 'react'
import autoBind from 'react-autobind'
import {createCalendarDistant} from '../../services/Calendars.services'
import {addCalendar} from '../../actions/index'

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
    createCalendarDistant({
      title: title,
      color: color
    }).then(calendar => {
      addCalendar(calendar)
    })
  }

  render() {
    return(
      <div>
        <button onClick={this.displayCalendarForm}>Add Calendar</button>
        {
          this.state.displayCalendarForm
          ?
          <div>
           <input className="form-control" ref={e => {this.title = e}}></input>
           <input ref={e => {this.color = e}}></input>
           <button className="btn btn-default" onClick={this.addCalendar}>
           <span class="glyphicon glyphicon-star" aria-hidden="true"></span>Create
           </button>
          </div> : null
        }
      </div>
    )
  }
}