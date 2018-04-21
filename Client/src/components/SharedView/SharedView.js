import React from 'react'
import autoBind from 'react-autobind'
import CustomCalendar from '../CustomCalendar/CustomCalendar'

export default class SharedView extends React.Component {
  constructor(props) {
    super(props)
    autoBind(this)
  }

  render(){
    let calEvents = []
    this.props.currentView.calendars.forEach(calendar => {
      calendar.cal.events.forEach(e => {
        console.log(e['summary'])
        if(!calendar.visible){
          e['summary'] = "Busy"
          calEvents.push({
            title: e['summary'],
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
        <div className='page-header'>
          <h1>{this.props.currentView.title}</h1>
        </div>
        <CustomCalendar width='100%' events={calEvents}/>
      </div>
    )
  }
}