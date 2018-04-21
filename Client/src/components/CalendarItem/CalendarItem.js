import React from 'react'
import {Link} from 'react-router-dom'
import autoBind from 'react-autobind'

export default class CalendarItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      mode: this.props.mode
    }
    autoBind(this)
  }

  componentWillMount(){
    let a = this.props.mode ? 'details' : 'busy'
    this.setState({
      mode: a
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

  onDeleteCalendar() {
    this.props.onDeleteCalendar(this.props.id)
  }

    render(){
      return(
        <div style={{marginBottom:'10px'}}>
          <div>
          <Link to={`/calendars/${this.props.id}`}>
            <p className="label label-info" style={{fontSize: '15px'}}>{this.props.calName}</p>
          </Link>
          <select style={{marginLeft: '10px', width:'100px', textAlign:'center'}} onChange={this.handleModeChange} value={this.state.mode}>
            <option>details</option>
            <option>busy</option>
          </select>
          <button style={{marginLeft: '10px'}} className="btn btn-danger btn-xs" onClick={this.onDeleteCalendar}><span className="glyphicon glyphicon-trash"/></button>
          </div>
        </div>
      )
    }
}