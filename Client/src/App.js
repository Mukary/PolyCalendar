import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage/login.page'
import RegisterPage from './pages/RegisterPage/register.page'
import ProfilePage from './pages/ProfilePage/profile.page'
import InvitePage from './pages/InvitePage/invite.page'
import ViewsPage from './pages/ViewsPage/views.page'
import './bootstrap/bootstrap.css'
import './App.css'

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
        <Route path='/views' component ={ViewsPage} />
        </div>
      </Router>      
    );
  }
}

export default App;
