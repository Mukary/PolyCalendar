import React from 'react'
import {Redirect} from 'react-router-dom'

export default class HomePage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLogged: false
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('pcal_token')
    if(token){
      this.setState({
        isLogged: true
      })
    }
  }

  render() {
    if(this.state.isLogged){
      return(
        <div>
      </div>
      )
    } else {
      return(
        <Redirect to={'/login'} />
      )
    }
  }
}