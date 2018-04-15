import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import autoBind from 'react-autobind'
import {userIsLogged} from '../../services/Auth.services'
import {getUserCalendar} from '../../services/Calendars.services'
import {fetchCurrentCalendar} from '../../actions/index'
import PNavbar from '../../components/Navbar/Navbar'
import CustomCalendar from '../../components/CustomCalendar/CustomCalendar'
//import Calendar from '../../components/Calendar/Calendar'

class CalendarPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLogged: false
    }
    autoBind(this)
  }

  componentWillMount() {
    getUserCalendar(this.props.match.params.id).then(calendar => {
      fetchCurrentCalendar(calendar)
    }).catch(err => {
      console.log(err)
    })
    if(userIsLogged()){
      this.setState({
        isLogged: true
      })
    }
  }

  render() {
    console.log("CALENDAR PAGE")
    console.log(this.props.currentCalendar)
    let events = []
    this.props.currentCalendar.events.map(e => {
        console.log(e['summary'])
          events.push({
            title: e['summary'],
            allDay: false,
            start: new Date(e['start']),
            end: new Date(e['end']),
            desc: 'DESC'
          })
      
    })
    if(this.state.isLogged){
      return(
        <div>
        <PNavbar/>
        <div className='page-header'>
          <h1>{this.props.currentCalendar.title}</h1>
        </div>
        <CustomCalendar events={events} />
        </div>
      )
    } else {
      return(
        <Redirect to={'/login'} />
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    currentCalendar: state.items.currentCalendar
  }
}


export default connect(mapStateToProps)(CalendarPage)