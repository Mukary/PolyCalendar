import React from 'react'
import {Redirect, Link} from 'react-router-dom'
import autoBind from 'react-autobind'
import CheckboxCalendar from '../../components/CheckboxCalendar/CheckboxCalendar'
import ViewThumbnail from '../../components/ViewThumbnail/ViewThumbnail'
import {getUserViews, addViewDistant, deleteViewDistant} from '../../services/User.services'
import {getUserCalendars} from '../../services/Calendars.services'
import {fetchViews, addView, deleteView, fetchCalendars} from '../../actions/index'
import './Views.css'

export default class Views extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLogged: false,
      displayViewForm: false,
      addButton: 'Add View'
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
    let addButtonLabel = this.state.displayViewForm ? 'Add View' : 'Cancel'
    this.setState({
      displayViewForm: !this.state.displayViewForm,
      addButton: addButtonLabel
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
      return(
        <div>
        <button className='btn btn-warning' onClick={this.displayViewForm} >{this.state.addButton}</button>
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
        <ul class='views'>
        {
          this.props.views.map((view, index) => {
            return(
               <ViewThumbnail style={{float:'left'}} onDeleteView={this.onDeleteView} id={view._id} title={view.title} color={view.color} calendars={view.calendars}/>
            )
          })
        }
        </ul>
        </div>
      )    
  }
}