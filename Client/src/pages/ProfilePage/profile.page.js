import React from 'react'
import autoBind from 'react-autobind'
import {Redirect} from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Views from '../../components/Views/Views'
import Calendars from '../../components/Calendars/Calendars'
import GoogleLogin from 'react-google-login'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import {userIsLogged, resetCredentials, linkGoogleAccount} from '../../services/Auth.services'
import {getUserProfile,getUserViews} from '../../services/User.services'
import {getUserCalendars} from '../../services/Calendars.services'
import {connect} from 'react-redux'
import {fetchUserProfile, fetchCalendars, fetchViews} from '../../actions/index'
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
    getUserViews().then(views => {
      fetchViews(views)
    })
    getUserCalendars().then(calendars =>  {
      fetchCalendars(calendars)
    })
    if(userIsLogged()){
      this.setState({
        isLogged: true
      })
    }
  }

  logout(){
    resetCredentials()
    this.setState({
      isLogged: false
    })
  }

  googleLogin(response) {
    linkGoogleAccount(response.code).then(res => {
      console.log(res)
      //get new calendars then add them to the current state, retrive the accessToken to store in localstorage
      window.location.reload()
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
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
    <div className="row">
  <div className="col-sm-6 col-md-4">
    <div className="thumbnail">
      <div className="caption">
        <p>Firstname: {this.props.user.userProfile.firstname}</p>
        <p>Lastname: {this.props.user.userProfile.lastname}</p>
        <p>Email: {this.props.user.userProfile.email}</p>
        <p>Account date creation: {new Date(this.props.user.userProfile.accountCreation).toString()}</p>
        <p>Last connection: {new Date(this.props.user.userProfile.lastConnection).toString()}</p>
        <p className="btn btn-danger" role="button" onClick={this.logout}>Log out</p>
        <GoogleLogin 
          clientId='493629080447-g3rop2h6jpbjrgfiur7f87quls5p8v3l.apps.googleusercontent.com'
          buttonText='Link google account'
          responseType='code'
          scope='https://www.googleapis.com/auth/calendar.readonly'
          onSuccess={this.googleLogin}
        />
      </div>
    </div>
  </div>
</div>
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