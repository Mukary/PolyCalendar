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
    addViewDistant({
      title: title,
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
        <button style={{marginBottom: '10px'}} className='btn btn-warning' onClick={this.displayViewForm} >{this.state.addButton}</button>
        {
          this.state.displayViewForm 
          ?
          <div>
           <input className='form-control' style={{width:'200px'}} ref={e => {this.title = e}} placeholder='Title'/>
           <div className='scrollable' style={{marginTop:'10px', width:'350px', height:'100px'}}>
           {
             this.props.calendars.map(c => {
               return(
                 <CheckboxCalendar calName={c.title} id={c._id} addCalendar={this.addCalendar} removeCalendar={this.removeCalendar}/>
               )
             })
           }
           </div>
           <button className='btn btn-success' onClick={this.addView}>Create</button>
          </div> : null
        }
        <ul>
        {
          this.props.views.map((view, index) => {
            return(
               <ViewThumbnail onDeleteView={this.onDeleteView} id={view._id} title={view.title} color={view.color} calendars={view.calendars}/>
            )
          })
        }
        </ul>
        </div>
      )    
  }
}