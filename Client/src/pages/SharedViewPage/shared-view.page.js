import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import autoBind from 'react-autobind'
import {getUserCalendars} from '../../services/Calendars.services'
import {getSharedView} from '../../services/Views.service'
import {fetchCurrentView, fetchCalendars} from '../../actions/index'
import PNavbar from '../../components/Navbar/Navbar'
import SharedView from '../../components/SharedView/SharedView'

class SharedViewPage extends React.Component {
  constructor(props){
    super(props)
    autoBind(this)
  }

  componentWillMount() {
    getSharedView(this.props.match.params.id).then(view => {
      fetchCurrentView(view)
    }).catch(err => {
      console.log(err)
    })
    getUserCalendars().then(calendars => {
      fetchCalendars(calendars)
    }).catch(err => {
      console.log(err)
    })
    this.viewId = this.props.match.params.id
    this.viewCalendars = this.props.currentView.calendars
  }

  render() {
      console.log("CURRENT SHARED VIEW")
      console.log(this.props.currentView)
      return(
        <div>
        <SharedView  id={this.viewId} currentView={this.props.currentView} calendars={this.props.calendars}/>
        </div>
      )
  }
}

function mapStateToProps(state) {
  return {
    currentView: state.items.currentView,
    calendars: state.items.calendars
  }
}


export default connect(mapStateToProps)(SharedViewPage)