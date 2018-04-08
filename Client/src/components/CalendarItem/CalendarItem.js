import React from 'react'
import autoBind from 'react-autobind'

export default class CalendarItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      mode: 'details'
    }
    autoBind(this)
  }

  componentWillMount(){
    let mode = ''
    if(this.props.mode)
      mode = 'details'
    else mode = 'busy'
    this.setState({
      mode: this.props.mode
    })
  }

  removeCalendar() {
    let mode = this.state.mode === 'details'
    this.props.removeCalendar({
      visible: mode,
      cal: this.props.id
    })
  }

  handleModeChange(event) {
    this.setState({
      mode: event.target.value
    }, () => {
      this.props.onUpdateMode(this.props.id, this.state.mode)
    })
  }

    render(){
      return(
        <div>
          <p>{this.props.calName}</p>
          <select onChange={this.handleModeChange} value={this.state.mode}>
            <option>details</option>
            <option>busy</option>
          </select>
        </div>
      )
    }
}