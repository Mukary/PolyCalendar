import React from 'react'
import {Redirect} from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import {userIsLogged} from '../../services/Auth.services'
import {connect} from 'react-redux'
import Item from '../../components/Item'
import { resetWeek } from '../../actions/index'

class ProfilePage extends React.Component {
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
    const calendars = this.props.days.calendars
    const views = this.props.days.views
    console.log(views)
    if(!this.state.isLogged) {
      return(
        <Redirect to={'/login'} />
      )
    }
    return(
      <div>
        <Navbar />
        {
          calendars.map(d => {return(<Item value={d} />)})
        }
      <button onClick={resetWeek}>Reset</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    days: state.items
  }
}


export default connect(mapStateToProps)(ProfilePage)