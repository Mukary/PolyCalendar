import React from 'react'
import autoBind from 'react-autobind'
import CheckboxCalendar from '../../components/CheckboxCalendar/CheckboxCalendar'
import ViewThumbnail from '../../components/ViewThumbnail/ViewThumbnail'
import {addViewDistant, deleteViewDistant} from '../../services/User.services'
import {addView, deleteView} from '../../actions/index'
import {ToastContainer, style} from 'react-toastify'
import {notify} from '../../notifications/notifications'
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
      notify('SUCCESS', 'The view has been created!')
    }).catch(err => {
      console.log(err)
      notify('ERROR', 'Error happened while adding view.')
    })
  }

  onDeleteView(viewId) {
    deleteViewDistant(viewId).then(res => {
      let newViews = this.props.views.slice().filter(view => {return view._id !== viewId})
      deleteView(newViews)
      notify('SUCCESS', 'The view has been removed!')
    }).catch(err => {
      console.log(err)
      notify('ERROR', 'Error happened while removing view.')
    })
  }

  render() {
      return(
        <div>
          <ToastContainer />
        <button style={{marginBottom: '10px'}} className='btn btn-warning' onClick={this.displayViewForm} >{this.state.addButton}</button>
        {
          this.state.displayViewForm 
          ?
          <div>
           <input className='form-control' style={{width:'200px'}} ref={e => {this.title = e}} placeholder='Title'/>
           <div className='scrollable' style={{marginTop:'10px', width:'350px', height:'100px'}}>
           {
             this.props.calendars.map((c, index) => {
               return(
                 <CheckboxCalendar key={index} calName={c.title} id={c._id} addCalendar={this.addCalendar} removeCalendar={this.removeCalendar}/>
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
               <ViewThumbnail key={index} onDeleteView={this.onDeleteView} id={view._id} title={view.title} color={view.color} calendars={view.calendars}/>
            )
          })
        }
        </ul>
        </div>
      )    
  }
}