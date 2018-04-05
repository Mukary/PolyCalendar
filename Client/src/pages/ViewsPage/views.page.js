import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import autoBind from 'react-autobind'
import PNavbar from '../../components/Navbar/Navbar'
import CheckboxCalendar from '../../components/CheckboxCalendar/CheckboxCalendar'
import ViewThumbnail from '../../components/ViewThumbnail/ViewThumbnail'
import {getUserViews, addViewDistant, deleteViewDistant} from '../../services/User.services'
import {getUserCalendars} from '../../services/Calendars.services'
import {fetchViews, addView, deleteView, fetchCalendars} from '../../actions/index'

class ViewsPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLogged: false,
      displayViewForm: false
    }
    autoBind(this)
  }

  componentWillMount() {
    const token = window.localStorage.getItem('pcal_token')
    this.calendarsToAttach = new Set()
    if(token){
      this.setState({
        isLogged: true
      })
      getUserViews().then(views => {
        fetchViews(views)
      })
      getUserCalendars().then(calendars =>  {
        fetchCalendars(calendars)
      })
    }
  }

  addCalendar(calendar){
    this.calendarsToAttach.add(calendar)
  }

  removeCalendar(calendar){
    this.calendarsToAttach.forEach(c => {
      if(c.cal === calendar.cal)
        this.calendarsToAttach.delete(c)
    })
  }

  displayViewForm(){
    this.calendarsToAttach = new Set()
    this.setState({
      displayViewForm: !this.state.displayViewForm
    })
  }

  addView() {
    let arr = []
    this.calendarsToAttach.forEach(e => arr.push(e))
    const title = this.title.value
    const color = this.color.value
    addViewDistant({
      title: title,
      color: color,
      calendars: arr
    }).then(view => {
      console.log("VIEW OBJECT")
      console.log(view)
      addView(view)
    }).catch(err => {
      console.log(err)
    })
  }

  onDeleteView(viewId) {
    deleteViewDistant(viewId).then(res => {
      let newViews = this.props.views.slice().filter(view => {return view._id !== viewId})
      deleteView(newViews)
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    if(this.state.isLogged){
      return(
        <div>
        <PNavbar/>
        <button onClick={this.displayViewForm}>Add View</button>
        {
          this.state.displayViewForm 
          ?
          <div>
           <input ref={e => {this.title = e}}></input>
           <input ref={e => {this.color = e}}></input>
           {
             this.props.calendars.map(c => {
               return(
                 <CheckboxCalendar calName={c.title} id={c._id} addCalendar={this.addCalendar} removeCalendar={this.removeCalendar}/>
               )
             })
           }
           <button onClick={this.addView}>Create</button>
          </div> : null
        }
        {
          this.props.views.map(view => {
            console.log("=== VIEW ID ===")
            console.log(view._id)
            return(
              <ViewThumbnail onDeleteView={this.onDeleteView} id={view._id} title={view.title} color={view.color} />
            )
          })
        }
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
    views: state.items.views,
    calendars: state.items.calendars
  }
}


export default connect(mapStateToProps)(ViewsPage)