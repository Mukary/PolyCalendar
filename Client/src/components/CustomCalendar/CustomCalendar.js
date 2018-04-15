import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

export default class CustomCalendar extends React.Component {
  render(){
    const styles={
      height: '800px',
      width: '1200px',
      borderStyle: 'solid',
      borderWidth: '2px',
      borderColor:'#fff',
      float: 'left'
    }

    return(
        <BigCalendar
          style={styles}
          selectable
          events={this.props.events}
          defaultView="month"
          scrollToTime={new Date('1970-1-1')}
          defaultDate={new Date('2018-4-15')}
          onSelectEvent={event => alert(event.title)}
      />
    )
  }
}