import React from 'react'
import autoBind from 'react-autobind'
import CustomCalendar from '../CustomCalendar/CustomCalendar'

export default class SharedView extends React.Component {
  constructor(props) {
    super(props)
    autoBind(this)
  }

  render(){
    const currentView = this.props.currentView
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
        <CustomCalendar width='100%' events={calEvents}/>
      </div>
    )
  }
}