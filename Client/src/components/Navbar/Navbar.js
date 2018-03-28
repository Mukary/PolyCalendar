import React from 'react'
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
      <ul>
        <li><a className="active" href="/">Home</a></li>
        <li><a href="/login">Views</a></li>
        <li><a href="/invite">Calendars</a></li>
        <li><a href="/profile">Profile</a></li>
        <li><a href="" onClick={this.logout}>Log out</a></li>
      </ul>
    )
  }
}