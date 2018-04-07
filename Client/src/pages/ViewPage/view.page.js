import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import autoBind from 'react-autobind'
import {userIsLogged} from '../../services/Auth.services'
import {getUserCalendars} from '../../services/Calendars.services'
import {getView} from '../../services/Views.service'
import {fetchCurrentView, fetchCalendars} from '../../actions/index'
import PNavbar from '../../components/Navbar/Navbar'
import View from '../../components/View/View'

class ViewPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLogged: false
    }
    autoBind(this)
  }

  componentWillMount() {
    getView(this.props.match.params.id).then(view => {
      fetchCurrentView(view)
    }).catch(err => {
      console.log(err)
    })
    getUserCalendars().then(calendars => {
      fetchCalendars(calendars)
    }).catch(err => {
      console.log(err)
    })
    this.viewEvents = new Set()
    this.viewId = this.props.match.params.id
    this.viewCalendars = this.props.currentView.calendars
    if(userIsLogged()){
      this.setState({
        isLogged: true
      })
    }
  }

  render() {
    if(this.state.isLogged){
      return(
        <div>
        <PNavbar/>
        <View  id={this.viewId} currentView={this.props.currentView} calendars={this.props.calendars}/>
        </div>
      )
    } else {
      return(
        <Redirect to={'/login'} />
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    currentView: state.items.currentView,
    calendars: state.items.calendars
  }
}


export default connect(mapStateToProps)(ViewPage)