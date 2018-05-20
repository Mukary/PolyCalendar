import React from 'react'
import autoBind from 'react-autobind'
import CheckboxCalendar from '../CheckboxCalendar/CheckboxCalendar'
import CalendarItem from '../CalendarItem/CalendarItem'
import CustomCalendar from '../CustomCalendar/CustomCalendar'
import {updateViewDistant} from '../../services/Views.service'
import {updateView} from '../../actions/index'
import icalToolkit from 'ical-toolkit'
import {ToastContainer, style} from 'react-toastify'
import {notify} from '../../notifications/notifications'
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
      console.log(view)
      updateView(view)
      notify('SUCCESS', 'The view has been updated!')
    }).catch(err => {
      console.log(err)
      notify('ERROR', 'An error happened while updating the view.')
    })
  }

  updateCalendarMode(calId, mode){
    let visible = (mode === 'details')
    let newCalendars = [{cal: calId, visible: visible}]
    updateViewDistant(this.props.id, newCalendars, 'UPDATE_CALENDAR_MODE').then(view => {
      updateView(view)
      notify('SUCCESS', 'The view has been updated!')
    }).catch(err => {
        console.log(err)
        notify('ERROR', 'An error happened while updating the view.')
    })
  }

  onDeleteCalendar(calId){
    let newCalendars = [{cal: calId}]
    updateViewDistant(this.props.id, newCalendars, 'REMOVE_CALENDAR').then(view => {
      updateView(view)
      notify('SUCCESS', 'The calendar has been removed from this view!')
    }).catch(err => {
      notify('ERROR', 'An error happened while removing this calendar from the view.')
    })

  }

  exportView() {
    let builder = icalToolkit.createIcsFileBuilder()
    builder.spacers = false //Add space in ICS file, better human reading. Default: true
    builder.NEWLINE_CHAR = '\r\n' //Newline char to use.
    builder.throwError = false //If true throws errors, else returns error when you do .toString() to generate the file contents.
    builder.ignoreTZIDMismatch = true

    builder.calname = this.props.currentView.title;
    builder.timezone = 'america/new_york';
    builder.tzid = 'america/new_york';
    builder.method = 'REQUEST';

    this.props.currentView.calendars.forEach(calendar => {
      calendar.cal.events.forEach(e => {
        let eventTransparency = 'OPAQUE' //default value
        if(calendar.visible) eventTransparency = 'TRANSPARENT'
        builder.events.push({
          summary: e['summary'],
          start: new Date(e['start']),
          end: new Date(e['end']),
          description: e['description'],
          transp: eventTransparency
        })
      })
    })
    
    let element = document.createElement('a')
    let icalFile = new Blob([builder.toString()], {type: 'text/calendar'})
    element.href = URL.createObjectURL(icalFile)
    element.download = this.props.currentView.title+'.ics'
    element.click()
    notify('', 'Downloading file...')
  }

  render(){
    const currentView = this.props.currentView
    const calendars = this.props.calendars
    let availableCalendars = []
    calendars.forEach(c => {
      this.props.currentView.calendars.forEach(c2 => {
        if(c._id !== c2.cal._id) availableCalendars.push(c)
      })
    })
    let calEvents = []
    this.props.currentView.calendars.forEach(calendar => {
      calendar.cal.events.forEach(e => {
        if(!calendar.visible){
          let eventSummary = "Busy"
          calEvents.push({
            title: eventSummary,
            allDay: false,
            start: new Date(e['start']),
            end: new Date(e['end']),
            desc:e['description']
          })
        }
        else{
          calEvents.push({
            title: e['summary'],
            allDay: false,
            start: new Date(e['start']),
            end: new Date(e['end']),
            desc: e['description']
          })
        }
      })
    })
    return(
      <div>
        <ToastContainer className='toast'/>
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
          <p className="panel-heading" style={{fontSize: '25px'}}>Settings</p>
          <div className="panel-body">
          <h4>Export & Share</h4>
          <p>Public URL: <input className='form-control' defaultValue={`${window.location.origin}/share/view/${this.props.id}`} type='text'/></p>
          <p>Export URL: <input className='form-control' defaultValue={`${process.env.REACT_APP_API_URL}/views/${this.props.id}/export`} type='text'/></p>
          <button className='btn btn-success' onClick={this.exportView}>Export file</button>
          <h4>List of calendars to add</h4>
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