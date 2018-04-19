import React from 'react'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import autoBind from 'react-autobind'
import {userIsLogged} from '../../services/Auth.services'
import {getUserCalendar, updateCalendarTitle} from '../../services/Calendars.services'
import {getUserViews} from '../../services/User.services'
import {fetchCurrentCalendar, fetchViews, updateCalendar} from '../../actions/index'
import PNavbar from '../../components/Navbar/Navbar'
import CustomCalendar from '../../components/CustomCalendar/CustomCalendar'

class CalendarPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLogged: false,
      showTitleInput: false
    }
    autoBind(this)
  }

  componentWillMount() {
    getUserCalendar(this.props.match.params.id).then(calendar => {
      fetchCurrentCalendar(calendar)
    }).catch(err => {
      console.log(err)
    })
    getUserViews().then(views => {
      fetchViews(views)
    }).catch(err => {
      console.log(err)
    })
    if(userIsLogged()){
      this.setState({
        isLogged: true
      })
    }
  }

  showTitleInput(){
    this.setState({
      showTitleInput: !this.state.showTitleInput
    })
  }

  updateTitle(){
    console.log(this.title.value)
    updateCalendarTitle(this.props.match.params.id,this.title.value).then(calendar => {
      updateCalendar(calendar)
      this.setState({
        showTitleInput: !this.state.showTitleInput
      })
    }).catch(err => {
      alert('Couldnt update title')
    })
  }

  render() {
    let calendarViews = []
    this.props.views.map(view => {
      view.calendars.map(c => {
        if(c.cal === this.props.match.params.id) calendarViews.push({
          id: view._id,
          title: view.title
        })
      })
    })
    console.log(this.props.currentCalendar)
    let events = []
    this.props.currentCalendar.events.map(e => {
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
              {
                this.state.showTitleInput
                ? 
                <div>
                  <input type='text' className='form-control' style={{width:'150px', marginBottom:'10px', float:'left'}} ref={e => {this.title = e}}/>
                  <button style={{marginLeft: '10px'}} className="btn btn-success btn-xs" onClick={this.updateTitle}><span className="glyphicon glyphicon-ok"/></button>
                </div>
                : null
              }
              <button style={{marginLeft: '10px'}} className="btn btn-primary btn-xs" onClick={this.showTitleInput}><span className="glyphicon glyphicon-pencil"/></button>
        </div>
        <CustomCalendar events={events} />
        <div style={{
          float: 'left', 
          height:'400px',
          width:'400px',
          marginLeft:'5%'
          }}
          className="panel panel-info">
          <p class="panel-heading" style={{fontSize: '25px'}}>Views using this calendar</p>
          <div className="panel-body">
          <div className='scrollable' style={{marginBottom:'5px'}}>
        {
          calendarViews.map(v => {
            return(
              <Link to={`/views/${v.id}`}>
              <div style={{float:'left', width:'300px', marginBottom:'10px'}}>
                <p className="label label-info" style={{fontSize:'15px'}}>{v.title}</p>
              </div>
              </Link>
            )
          })
        }
        </div>
        </div>
        </div>
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
    currentCalendar: state.items.currentCalendar,
    views: state.items.views
  }
}


export default connect(mapStateToProps)(CalendarPage)