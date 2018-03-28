import React from 'react'
import './Navbar.styles.css'

export default class Navbar extends React.Component {
  render(){
    return(
      <ul>
        <li><a class="active" href="/">Home</a></li>
        <li><a href="/login">Views</a></li>
        <li><a href="/invite">Calendars</a></li>
        <li><a href="/profile">Profile</a></li>
      </ul>
    )
  }
}