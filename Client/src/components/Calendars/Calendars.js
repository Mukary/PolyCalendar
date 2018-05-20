import React from 'react'
import autoBind from 'react-autobind'
import CalendarThumbnail from '../CalendarThumbnail/CalendarThumbnail'
import {createCalendarDistant, deleteCalendarDistant} from '../../services/Calendars.services'
import {addCalendar, deleteCalendar} from '../../actions/index'
import {ToastContainer, style} from 'react-toastify'
import {notify} from '../../notifications/notifications'
import Dropzone from 'react-dropzone'
import Modal from 'react-responsive-modal'
import './Calendars.css'

export default class Calendars extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLogged: false,
      displayCalendarForm: false,
      uploadMode: 'URL',
      fileContent: '',
      uploadedFile: false,
      deleteConfirmation: false,
      calendarId: ''
    }
    autoBind(this)
  }

  displayCalendarForm(){
    this.setState({
      displayCalendarForm: !this.state.displayCalendarForm
    })
  }

  changeUploadMode(event){
    const form = event.target.value
    this.setState({
      uploadMode: form
    })
  }

  addCalendar() {
    const title = this.title.value
    const url = this.url.value
    const isFile = (this.state.uploadMode === 'File' && this.state.uploadedFile)
    createCalendarDistant({
      title: title,
      url: url,
      fileContent: this.state.fileContent,
      isFile: isFile
    }).then(calendar => {
      addCalendar(calendar)
      notify('SUCCESS', 'Calendar has been added!')
      this.setState({
        uploadedFile: false,
        fileContent: ''
      })
    }).catch(err => {
      notify('ERROR', 'An error happened when adding a new calendar.')
    })
  }

  onDeleteCalendar(){
    const calId = this.state.calendarId
    this.setState({
      deleteConfirmation: false,
      calendarId: ''
    })
    deleteCalendarDistant(calId).then(res => {
      deleteCalendar(calId)
      notify('SUCCESS', 'Calendar has been deleted!')
    }).catch(err => {
      console.log(err)
      notify('ERROR', 'An error happened when deleting this calendar.')
    })
  }

  onDrop(files){
    const calendarFile = files[0]
    const blobURL = calendarFile.preview
    this.fetchCalendarFile(blobURL)
  }

  fetchCalendarFile(blobURL){
    return fetch(blobURL)
    .then((response) => {
      return response.text()
    })
    .catch((error) => {
      console.log(error)
    })
    .then((content) => {
      this.setState({
        fileContent: content,
        uploadedFile: true
      })
      notify('SUCCESS', 'You uploaded a calendar file!')
    })
  }

  onCloseModal() {
    this.setState({
      deleteConfirmation: false,
      calendarId: ''
    })
  }

  confirmDelete(calId) {
    this.setState({
      deleteConfirmation: true,
      calendarId: calId
    })
  }

  render() {
    return(
      <div>
        <Modal open={this.state.deleteConfirmation} onClose={this.onCloseModal} center>
          <p>If you delete this calendar it won't be available in views that are using it.</p>
          <p>Are you sure ?</p>
          <button style={{marginRight:'10px'}} className="btn btn-success" onClick={this.onDeleteCalendar}>Yes</button>
          <button className="btn btn-danger" onClick={this.onCloseModal}>No</button>
        </Modal>
        <ToastContainer />
        <div className='calendarForm'>
        <button style={{marginBottom:'10px'}} className={this.state.displayCalendarForm ? 'btn btn-danger' : 'btn btn-primary'} onClick={this.displayCalendarForm}>{this.state.displayCalendarForm ? 'Close' : 'Add Calendar'}</button>
        {
          this.state.displayCalendarForm
          ?
          <div>
            <div>
              <input type='radio' name='type' value='URL' ref={e => {this.fileURL}} onChange={this.changeUploadMode}/> URL
              <input type='radio' name='type' value='File'ref={e => {this.file}} onChange={this.changeUploadMode}/> File
            </div>
            <input style={{width: '200px'}} className="form-control" ref={e => {this.title = e}} placeholder='Title'/>
            <input style={{width: '200px', marginTop:'10px', marginBottom:'10px'}} className="form-control" ref={e => {this.url = e}} placeholder='URL'></input>
            <Dropzone style={{height:'100px', width:'100px', borderStyle:'solid', borderWidth:'1px'}} onDrop={this.onDrop} accept='text/calendar'>
              <p>Drop calendar file or click here to select one</p>
            </Dropzone>
            <button className="btn btn-success" onClick={this.addCalendar}>Create</button>
          </div> : null
        }
        </div>
        <div className='calendarsList'>
        {
          this.props.calendars.map(x =>{
            return(<CalendarThumbnail id={x._id} title={x.title} color={x.color} onDeleteCalendar={this.confirmDelete}/>)
          })
        }
        </div>
      </div>
    )
  }
}