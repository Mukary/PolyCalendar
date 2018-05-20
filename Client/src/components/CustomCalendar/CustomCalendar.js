import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

export default class CustomCalendar extends React.Component {
  render(){
    const styles={
      height: this.props.height ? this.props.height : '750px',
      width: this.props.width ? this.props.width : '1200px',
      borderStyle: 'solid',
      borderWidth: '2px',
      borderColor:'#fff',
      float: 'left'
    }


function Event({ event }) {
  return (
    <span>
      <span>
        <strong>{event.title}</strong>
      </span>
      <br/>
      <span>
        <strong>Description:</strong>
        {' '+event.desc}
      </span>
      <br />
    </span>
  )
}

    return(
        <BigCalendar
          style={styles}
          components={{
            event: Event
          }}
          popup
          events={this.props.events}
          defaultView="month"
          scrollToTime={new Date('1970-1-1')}
          defaultDate={new Date('2018-4-15')}
      />
    )
  }
}