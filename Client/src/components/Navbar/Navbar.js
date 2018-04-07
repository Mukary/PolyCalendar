import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.styles.css'

export default class Navbar extends React.Component {
  constructor(props){
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout() {
    window.localStorage.removeItem('pcal_token')
  }

  render(){
    return(
      <div className="topnav">
        <Link to={'/'} className="active">Home</Link>
        <Link to={'/profile'} >Profile</Link>
        <Link to={'/calendars'} >Calendars</Link>
      </div>
    )
  }
}