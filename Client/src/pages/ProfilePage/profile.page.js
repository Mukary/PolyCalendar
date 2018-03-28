import React from 'react'
import {Redirect} from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import {userIsLogged} from '../../services/Auth.services'

export default class ProfilePage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLogged: false
    }
  }

  componentWillMount(){
    if(userIsLogged()){
      this.setState({
        isLogged: true
      })
    }
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
      Welcome
      </div>
    )
  }
}