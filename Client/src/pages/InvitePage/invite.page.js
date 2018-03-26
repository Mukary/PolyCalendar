import React from 'react'
import {invite, setToken} from '../../services/Auth.services'
import {Redirect} from 'react-router-dom'
import {Form, FormGroup, Col, ControlLabel, FormControl, Checkbox, Button} from 'react-bootstrap'

export default class InvitePage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isInvited: false
    }
  }

  invite() {
    const email = this.email.value
    invite(email)
  }

  render() {
    return(
      <Form horizontal>
      <FormGroup controlId="formHorizontalEmail">
        <Col componentClass={ControlLabel} sm={2}>
          Email
        </Col>
        <Col sm={2}>
          <FormControl type="email" placeholder="Email" inputRef={e => {this.email = e}}/>
        </Col>
      </FormGroup>
    
      <FormGroup>
      <Col smOffset={2} sm={2}>
        <Button bsStyle="primary" onClick={this.invite.bind(this)}>Send invite</Button>
      </Col>
    </FormGroup>
    </Form>
    )
  }
}