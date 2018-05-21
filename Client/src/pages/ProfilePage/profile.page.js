import React from 'react'
import autoBind from 'react-autobind'
import {Redirect} from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Views from '../../components/Views/Views'
import Calendars from '../../components/Calendars/Calendars'
import GoogleLogin from 'react-google-login'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import {userIsLogged, setProfile, getProfile, unlinkGoogleAccount ,userHasLinkedGoogle, resetCredentials, linkGoogleAccount} from '../../services/Auth.services'
import {getUserProfile,getUserViews} from '../../services/User.services'
import {getUserCalendars} from '../../services/Calendars.services'
import {connect} from 'react-redux'
import {fetchUserProfile, fetchCalendars, fetchViews} from '../../actions/index'
import {ToastContainer, style} from 'react-toastify'
import {notify} from '../../notifications/notifications'
import 'react-tabs/style/react-tabs.css'
import './profile.page.css'

class ProfilePage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLogged: false,
      hasLinkedGoogle: false
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
    }).catch(err => {
        console.log(err)
    })
    if(userIsLogged()){
      this.setState({
        isLogged: true
      })
    }
    if(userHasLinkedGoogle()) {
      this.setState({
        hasLinkedGoogle: true
      })
    }
  }

  logout(){
    resetCredentials()
    this.setState({
      isLogged: false
    })
  }

  linkGoogle(response) {
    linkGoogleAccount(response.code).then(res => {
      const oldProfile = getProfile()
      setProfile(oldProfile._id, res.data.email)
      this.setState({
        hasLinkedGoogle: true
      })
      notify('DEFAULT', 'Your Google account has been linked!')
      getUserCalendars().then(calendars =>  {
        fetchCalendars(calendars)
      }).catch(err => {
          console.log(err)
      })
    }).catch(err => {
      console.log(err)
      notify('ERROR', 'Error encoutered with this Google account. It might have been linked already?')
    })
  }

  logoutGoogle() {
    unlinkGoogleAccount().then(res => {
      const oldProfile = getProfile()
      setProfile(oldProfile._id, '')
      this.setState({
        hasLinkedGoogle: false
      })
      const googleCookie = window.gapi.auth2.getAuthInstance()
      console.log(googleCookie)
      if (googleCookie != null) {
        googleCookie.signOut().then(
            googleCookie.disconnect()
        )
    }
      notify('DEFAULT', 'Google account unlinked!')
    }).catch(err => {
      console.log(err)
      notify('ERROR', 'Error encoutered when unlinking your Google account.')
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
        <ToastContainer />
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
                      <p style={{marginRight:'10px'}} className="btn btn-danger" role="button" onClick={this.logout}>Log out</p>
                      {
                        this.state.hasLinkedGoogle
                        ?
                        <p className="btn btn-danger" role="button" onClick={this.logoutGoogle}>Google Log out</p>
                        :
                        <GoogleLogin 
                        className="btn btn-primary"
                        clientId={process.env.GOOGLE_CLIENT_ID}
                        buttonText='Link google account'
                        responseType='code'
                        scope='profile https://www.googleapis.com/auth/calendar.readonly'
                        onSuccess={this.linkGoogle}
                      />
                      }
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