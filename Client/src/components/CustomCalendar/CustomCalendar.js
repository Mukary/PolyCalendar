import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import Modal from 'react-responsive-modal'
import autoBind from 'react-autobind'
import 'react-big-calendar/lib/css/react-big-calendar.css'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

export default class CustomCalendar extends React.Component {
  constructor(props){
    super(props)
    this.state={
      showEvent: false,
      currentEvent: null
    }
    autoBind(this)
  }

  showEvent(event){
    this.setState({
      showEvent: true,
      currentEvent: event
    })
  }

  onCloseModal() {
    this.setState({
      showEvent: false,
      currentEvent: null
    })
  }


  render(){
    const styles={
      height: this.props.height ? this.props.height : '750px',
      width: this.props.width ? this.props.width : '1200px',
      borderStyle: 'solid',
      borderWidth: '2px',
      borderColor:'#fff',
      float: 'left'
    }

    return(
      <div>
        <Modal open={this.state.showEvent} onClose={this.onCloseModal} center>
          {
            this.state.currentEvent
            ?
            <div>
              <h1>Event details</h1>
              <p>Title: {this.state.currentEvent.title}</p>
              <p>Description: {this.state.currentEvent.description} </p>
              <p>Start: {new Date(this.state.currentEvent.start).toString()}</p>
              <p>End: {new Date(this.state.currentEvent.end).toString()}</p>
            </div>
            :
            null
          }
        </Modal>
        <BigCalendar
          style={styles}
          popup
          events={this.props.events}
          defaultView="month"
          scrollToTime={new Date('1970-1-1')}
          defaultDate={new Date('2018-4-15')}
          onSelectEvent={(event) => this.showEvent(event)}
      />
      </div>
    )
  }
}