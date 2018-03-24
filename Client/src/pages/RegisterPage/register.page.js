import React from 'react'
import register from '../../services/Register.services'
import './register.styles.css'
import {Form, FormGroup, Col, ControlLabel, FormControl, Checkbox, Button} from 'react-bootstrap'

export default class RegisterPage extends React.Component {
  signUp () {
    const payload = {
      firstname: this.firstname.value,
      lastname: this.lastname.value,
      email: this.email.value,
      password: this.passwordA.value
    }
    if(this.checkForm()){
      register(payload)
    }
  }

  checkPasswordMatch () {
    let passwordA = this.passwordA.value
    let passwordB = this.passwordB.value
    return passwordA === passwordB
  }

  checkPasswordStrength() {
    return this.passwordA.value.length >= 6
  }

  checkEmail() {
    return this.email.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  }

  checkForm(){
    return this.checkEmail() && this.checkPasswordMatch() && this.checkPasswordStrength()
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
          <FormControl type="text" placeholder="Lastname" inputRef={ (e) => {this.lastname = e}}/>
        </Col>
      </FormGroup>
      
      <FormGroup controlId="formHorizontalEmail">
        <Col componentClass={ControlLabel} sm={2}>
          Email
        </Col>
        <Col sm={2}>
          <FormControl type="email" placeholder="Email" inputRef={ (e) => {this.email = e}}/>
        </Col>
      </FormGroup>
    
      <FormGroup controlId="formHorizontalPassword">
        <Col componentClass={ControlLabel} sm={2}>
          Password
        </Col>
        <Col sm={2}>
          <FormControl type="password" placeholder="Password" inputRef={e => {this.passwordA = e}}/>
        </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalPassword">
        <Col componentClass={ControlLabel} sm={2}>
         Confirm Password
        </Col>
        <Col sm={2}>
          <FormControl type="password" placeholder="Confirm Password" inputRef={e => {this.passwordB = e}}/>
        </Col>
      </FormGroup>
    
      <FormGroup>
        <Col smOffset={2} sm={2}>
          <Button bsStyle="primary" onClick={this.signUp.bind(this)}>Sign up</Button>
        </Col>
      </FormGroup>
    </Form>
    )
  }
}