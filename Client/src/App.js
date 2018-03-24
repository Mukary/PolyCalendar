import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoginPage from './pages/login.page';
import RegisterPage from './pages/RegisterPage/register.page';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <Route path='/login' component={LoginPage}/>
        <Route path='/register' component={RegisterPage}/>
        <Route path='/invite' component ={RegisterPage} />
        </div>
      </Router>      
    );
  }
}

export default App;
