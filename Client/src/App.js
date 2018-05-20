import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage/login.page'
import RegisterPage from './pages/RegisterPage/register.page'
import ProfilePage from './pages/ProfilePage/profile.page'
import InvitePage from './pages/InvitePage/invite.page'
import ViewPage from './pages/ViewPage/view.page'
import CalendarPage from './pages/CalendarPage/calendar.page'
import SharedViewPage from './pages/SharedViewPage/shared-view.page'
import './bootstrap/bootstrap.css'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <Route exact path='/' component ={HomePage} />
        <Route path='/profile' component ={ProfilePage} />
        <Route path='/login' component={LoginPage}/>
        <Route path='/register' component={RegisterPage}/>
        <Route path='/invite' component ={InvitePage} />
        <Route path='/views/:id' component ={ViewPage} />
        <Route path='/calendars/:id' component ={CalendarPage} />
        <Route path='/share/view/:id' component={SharedViewPage} />
        </div>
      </Router>      
    );
  }
}

export default App;
