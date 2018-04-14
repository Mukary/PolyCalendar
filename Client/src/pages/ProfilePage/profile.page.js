import React from 'react'
import autoBind from 'react-autobind'
import {Redirect} from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Views from '../../components/Views/Views'
import Calendars from '../../components/Calendars/Calendars'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import {userIsLogged} from '../../services/Auth.services'
import {getUserProfile,getUserViews} from '../../services/User.services'
import {createCalendarDistant, getUserCalendars} from '../../services/Calendars.services'
import {connect} from 'react-redux'
import {fetchUserProfile, addCalendar, fetchCalendars, fetchViews} from '../../actions/index'
import 'react-tabs/style/react-tabs.css'

class ProfilePage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLogged: false
    }
    autoBind(this)
  }

  componentWillMount(){
    const pcal_profile = JSON.parse(window.localStorage.getItem('pcal_profile'))
    getUserProfile(pcal_profile._id).then(profile => {
      fetchUserProfile(profile.data)
    }).catch(err => {
      console.log(err)
    })
    if(userIsLogged()){
      this.setState({
        isLogged: true
      })
    }
  }

  componentDidMount() {
    getUserViews().then(views => {
      fetchViews(views)
    })
    getUserCalendars().then(calendars =>  {
      fetchCalendars(calendars)
    })
  }

  render() {
    const accountCreation = Date.parse(this.props.user.accountCreation)
    console.log(accountCreation)
    if(!this.state.isLogged) {
      return(
        <Redirect to={'/login'} />
      )
    }
    return(
      <div>
        <Navbar />
        <Tabs>
    <TabList>
      <Tab>My Information</Tab>
      <Tab>My Views</Tab>
      <Tab>My Calendars</Tab>
    </TabList>

    <TabPanel>
    <div className="label label-primary">Firstname: {this.props.user.userProfile.firstname}</div>
      <div>Lastname: {this.props.user.userProfile.lastname}</div>
      <div>Email: {this.props.user.userProfile.email}</div>
    <div>Account date creation: {this.props.user.userProfile.accountCreation}</div>
    </TabPanel>
    
    <TabPanel>
      <Views calendars={this.props.calendars} views={this.props.views}/>
    </TabPanel>
    
    <TabPanel>
    <Calendars calendars={this.props.calendars} />
    </TabPanel>
  </Tabs>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.items,
    views: state.items.views,
    calendars: state.items.calendars
  }
}


export default connect(mapStateToProps)(ProfilePage)