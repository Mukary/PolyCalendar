import React from 'react'
import {Redirect} from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import {userIsLogged} from '../../services/Auth.services'
import {getUserProfile} from '../../services/User.services'
import {connect} from 'react-redux'
import {fetchUserProfile} from '../../actions/index'

class ProfilePage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLogged: false
    }
  }

  componentWillMount(){
    const pcal_profile = JSON.parse(window.localStorage.getItem('pcal_profile'))
    getUserProfile(pcal_profile._id).then(profile => {
      fetchUserProfile(profile.data)
    }).catch(err => {
      console.log(err)
    })
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
        <div>{this.props.user.userProfile.firstname}</div>
        <div>{this.props.user.userProfile.lastname}</div>
        <div>{this.props.user.userProfile.email}</div>
        <div>{this.props.user.userProfile.accountCreation}</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.items
  }
}


export default connect(mapStateToProps)(ProfilePage)