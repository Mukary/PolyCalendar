import React from 'react'

export default class Item extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    return(
      <div>{this.props.value}</div>
    )
  }
}