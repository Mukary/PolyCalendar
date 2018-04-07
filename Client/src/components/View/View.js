import React from 'react'
import autoBind from 'react-autobind'
import CheckboxCalendar from '../CheckboxCalendar/CheckboxCalendar'
import {updateView} from '../../services/Views.service'

export default class View extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events:[]
    }
    autoBind(this)
  }

  componentWillMount(){
    this.calendarsToAttach = new Set()
  }

  addCalendar(calendar){
    this.calendarsToAttach.add(calendar)
  }

  removeCalendar(calendar){
    this.calendarsToAttach.forEach(c => {
      if(c.cal === calendar.cal)
        this.calendarsToAttach.delete(c)
    })
  }

  addCalendarToView(){
    let newCalendars = []
    this.calendarsToAttach.forEach(c => newCalendars.push(c))
    updateView(this.props.id, newCalendars,'ADD_CALENDARS').then(view => {
      console.log("VIEW UPDATED")
      console.log(view)
    }).catch(err => {
      console.log(err)
    })
  }

  render(){
    const currentView = this.props.currentView
    const calendars = this.props.calendars
    let newEvents = []
    this.props.currentView.calendars.map(calendar => {
      calendar.cal.events.map(e => {
        if(!calendar.visible)
          newEvents.push("BUSY"+e)
        else newEvents.push(e)
      })
    })
    return(
      <div>
        {
          this.props.calendars.map(c => {
            return(
              <CheckboxCalendar calName={c.title} id={c._id} addCalendar={this.addCalendar} removeCalendar={this.removeCalendar}/>
            )
          })
        }
        <button onClick={this.addCalendarToView}>Update View</button>
        {
          currentView.calendars.map(c => {return(<div>{c.cal.title}</div>)})
        }
        {
          newEvents.map(e => {return(<div>{e}</div>)})
        }
      </div>
    )
  }
}