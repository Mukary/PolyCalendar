import React from 'react'
import autoBind from 'react-autobind'
import ical from 'ical'
import CalendarThumbnail from '../CalendarThumbnail/CalendarThumbnail'
import {createCalendarDistant, deleteCalendarDistant} from '../../services/Calendars.services'
import {addCalendar, deleteCalendar} from '../../actions/index'
import Dropzone from 'react-dropzone'

export default class Calendars extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLogged: false,
      displayCalendarForm: false,
      uploadMode: 'URL',
      fileContent: '',
      uploadedFile: false
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
    const fileContent = this.state.fileContent
    const isFile = (this.state.uploadMode === 'File' && this.state.uploadedFile)
    console.log("IS FILE")
    console.log(isFile)
    createCalendarDistant({
      title: title,
      url: url,
      fileContent: this.state.fileContent,
      isFile: isFile
    }).then(calendar => {
      addCalendar(calendar)
      this.setState({
        uploadedFile: false,
        fileContent: ''
      })
    })
  }

  onDeleteCalendar(calId){
    deleteCalendarDistant(calId).then(res => {
      deleteCalendar(calId)
    }).catch(err => {
      console.log(err)
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
    })
  }

  render() {
    return(
      <div>
        <div>
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
        <div>
        {
          this.props.calendars.map(x =>{
            return(<CalendarThumbnail id={x._id} title={x.title} color={x.color} onDeleteCalendar={this.onDeleteCalendar}/>)
          })
        }
        </div>
      </div>
    )
  }
}