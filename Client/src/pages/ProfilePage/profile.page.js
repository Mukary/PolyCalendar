import React from 'react'
import autoBind from 'react-autobind'
import {Redirect} from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import {userIsLogged} from '../../services/Auth.services'
import {getUserProfile} from '../../services/User.services'
import {createCalendarDistant} from '../../services/Calendars.services'
import {connect} from 'react-redux'
import {fetchUserProfile, addCalendar} from '../../actions/index'

class ProfilePage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLogged: false
    }
    autoBind(this)
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

  addCalendar() {
    let title = this.title.value
    let color = this.color.value
    createCalendarDistant({
      title: title,
      color: color
    }).then(calendar => {
      addCalendar(calendar)
    })
  }


  render() {
    const accountCreation = Date.parse(this.props.user.accountCreation)
    console.log(accountCreation)
    if(!this.state.isLogged) {
      return(
        <Redirect to={'/login'} />
      )
    }
    return(
      <div>
        <Navbar />
        <div className="label label-primary">Firstname: {this.props.user.userProfile.firstname}</div>
        <div>Lastname: {this.props.user.userProfile.lastname}</div>
        <div>Email: {this.props.user.userProfile.email}</div>
        <div>Account date creation: {this.props.user.userProfile.accountCreation}</div>
        <div>
           <input className="form-control" ref={e => {this.title = e}}></input>
           <input ref={e => {this.color = e}}></input>
           <button className="btn btn-default" onClick={this.addCalendar}>
           <span class="glyphicon glyphicon-star" aria-hidden="true"></span>Create
           </button>
          </div>
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