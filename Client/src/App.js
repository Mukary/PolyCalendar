import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage/login.page'
import RegisterPage from './pages/RegisterPage/register.page'
import InvitePage from './pages/InvitePage/invite.page'
import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <Route path='/' component ={HomePage} />
        <Route path='/login' component={LoginPage}/>
        <Route path='/register' component={RegisterPage}/>
        <Route path='/invite' component ={InvitePage} />
        </div>
      </Router>      
    );
  }
}

export default App;
