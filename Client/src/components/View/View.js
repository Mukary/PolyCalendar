import React from 'react'
import autoBind from 'react-autobind'
import CheckboxCalendar from '../CheckboxCalendar/CheckboxCalendar'
import CalendarItem from '../CalendarItem/CalendarItem'
import CustomCalendar from '../CustomCalendar/CustomCalendar'
import {updateViewDistant} from '../../services/Views.service'
import {updateView} from '../../actions/index'
import './View.css'

export default class View extends React.Component {
  constructor(props) {
    super(props)
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

  onDeleteCalendar(calId){
    let newCalendars = [{cal: calId}]
    updateViewDistant(this.props.id, newCalendars, 'REMOVE_CALENDAR').then(view => {
      updateView(view)
    })

  }

  render(){
    const currentView = this.props.currentView
    const calendars = this.props.calendars
    let calEvents = []
    this.props.currentView.calendars.map(calendar => {
      calendar.cal.events.map(e => {
        console.log(e['summary'])
        if(!calendar.visible){
          e['summary'] = "Busy"
          calEvents.push({
            title: e['summary'],
            allDay: false,
            start: new Date(e['start']),
            end: new Date(e['end']),
            desc:'DESC'
          })
        }
        else{
          calEvents.push({
            title: e['summary'],
            allDay: false,
            start: new Date(e['start']),
            end: new Date(e['end']),
            desc: 'DESC'
          })
        }
      })
    })
    return(
      <div>
        <div className='page-header'>
          <h1>{this.props.currentView.title}</h1>
        </div>
        <CustomCalendar events={calEvents}/>
        <div style={{
          float: 'left', 
          height:'800px',
          width:'400px',
          marginLeft:'5%'
          }}
          className="panel panel-info">
          <p class="panel-heading" style={{fontSize: '25px'}}>Settings</p>
          <div className="panel-body">
          <div className='scrollable' style={{marginBottom:'5px'}}>
        {
          this.props.calendars.map(c => {
            return(
              <CheckboxCalendar calName={c.title} id={c._id} addCalendar={this.addCalendar} removeCalendar={this.removeCalendar}/>
            )
          })
        }
        </div>
        <button className='btn btn-success' onClick={this.addCalendarToView}>Add Calendars</button>
        <h4>List of calendars</h4>
        {
          currentView.calendars.map(c => {return(<CalendarItem onDeleteCalendar={this.onDeleteCalendar} onUpdateMode={this.updateCalendarMode} calName={c.cal.title} mode={c.visible} id={c.cal._id}/>)})
        }
        </div>
        </div>
      </div>
    )
  }
}