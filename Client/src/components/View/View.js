import React from 'react'
import autoBind from 'react-autobind'
import CheckboxCalendar from '../CheckboxCalendar/CheckboxCalendar'
import CalendarItem from '../CalendarItem/CalendarItem'
import {updateViewDistant} from '../../services/Views.service'
import {updateView} from '../../actions/index'

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
    updateViewDistant(this.props.id, newCalendars,'ADD_CALENDARS').then(view => {
      console.log("VIEW UPDATED")
      console.log(view)
      updateView(view)
    }).catch(err => {
      console.log(err)
    })
  }

  updateCalendarMode(calId, mode){
    let visible = (mode === 'details')
    let newCalendars = [{cal: calId, visible: visible}]
    console.log("UPDATE MODE")
    console.log(newCalendars)
    updateViewDistant(this.props.id, newCalendars, 'UPDATE_CALENDAR_MODE').then(view => {
      console.log("VIEW UPDATED")
      console.log(view)
      updateView(view)
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
        <button onClick={this.addCalendarToView}>Add Calendars</button>
        {
          currentView.calendars.map(c => {return(<CalendarItem onUpdateMode={this.updateCalendarMode} calName={c.cal.title} mode={c.visible} id={c.cal._id}/>)})
        }
        {
          newEvents.map(e => {return(<div>{e}</div>)})
        }
      </div>
    )
  }
}