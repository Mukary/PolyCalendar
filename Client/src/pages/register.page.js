import React from 'react'
import {Form, FormGroup, Col, ControlLabel, FormControl, Checkbox, Button} from 'react-bootstrap'

export default class RegisterPage extends React.Component {

  getFirstname () {
    let firstname = this.firstname.value
    alert(firstname);
  }

  render() {
    return(
      <Form horizontal>
      
      <FormGroup controlId="formHorizontalEmail">
        <Col componentClass={ControlLabel} sm={2}>
          Firstname
        </Col>
        <Col sm={2}>
          <FormControl type="text" placeholder="Firstname" inputRef={ (e) => {this.firstname = e}}/>
        </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalEmail">
        <Col componentClass={ControlLabel} sm={2}>
          Lastname
        </Col>
        <Col sm={2}>
          <FormControl type="email" placeholder="Lastname" />
        </Col>
      </FormGroup>
      
      <FormGroup controlId="formHorizontalEmail">
        <Col componentClass={ControlLabel} sm={2}>
          Email
        </Col>
        <Col sm={2}>
          <FormControl type="email" placeholder="Email" />
        </Col>
      </FormGroup>
    
      <FormGroup controlId="formHorizontalPassword">
        <Col componentClass={ControlLabel} sm={2}>
          Password
        </Col>
        <Col sm={2}>
          <FormControl type="password" placeholder="Password" />
        </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalPassword">
        <Col componentClass={ControlLabel} sm={2}>
         Confirm Password
        </Col>
        <Col sm={2}>
          <FormControl type="password" placeholder="Confirm Password" />
        </Col>
      </FormGroup>
    
      <FormGroup>
        <Col smOffset={2} sm={2}>
          <Button type="submit" onClick={this.getFirstname.bind(this)}>Register</Button>
        </Col>
      </FormGroup>
    </Form>
    )
  }
}