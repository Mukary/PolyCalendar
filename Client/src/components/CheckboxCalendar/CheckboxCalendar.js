import React from 'react'
import autoBind from 'react-autobind'

export default class CheckboxCalendar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      mode: 'details'
    }
    autoBind(this)
  }

  addCalendar(){
    let mode = this.state.mode === 'details'
    this.props.addCalendar({
      visible: mode,
      cal: this.props.id 
    })
  }

  removeCalendar() {
    let mode = this.state.mode === 'details'
    this.props.removeCalendar({
      visible: mode,
      cal: this.props.id
    })
  }

  handleChange(event){
    if(event.target.checked){
      this.addCalendar()
    } else {
      this.removeCalendar()
    }
  }

  handleModeChange(event) {
    this.setState({
      mode: event.target.value
    })
  }

    render(){
      return(
        <div style={{width:'300px', marginBottom:'10px'}}>
          <input type="checkbox" onChange={this.handleChange}/>
          <p className="label label-info" style={{fontSize: '15px', marginLeft:'5px'}}>{this.props.calName}</p>
          <select style={{width: '100px', marginLeft:'10px'}}onChange={this.handleModeChange}>
            <option>details</option>
            <option>busy</option>
          </select>
        </div>
      )
    }
}