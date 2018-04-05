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
        <div>
          <input type="checkbox" onChange={this.handleChange}/> {this.props.calName}
          <select onChange={this.handleModeChange}>
            <option>details</option>
            <option>busy</option>
          </select>
        </div>
      )
    }
}