import React from 'react'
import {login, setToken} from '../../services/Auth.services'
import {Redirect, Link} from 'react-router-dom'
import {Form, FormGroup, Col, ControlLabel, FormControl, Checkbox, Button} from 'react-bootstrap'

export default class LoginPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLogged: false
    }
  }

  signIn() {
    const email = this.email.value
    const password = this.password.value
    login(email, password).then(token => {
      setToken(token)
      this.setState({
        isLogged: true
      })
    })
  }

  render() {
    if(this.state.isLogged) {
      return(
        <Redirect to={'/'} />
      )
    }
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
    
      <FormGroup controlId="formHorizontalPassword">
        <Col componentClass={ControlLabel} sm={2}>
          Password
        </Col>
        <Col sm={2}>
          <FormControl type="password" placeholder="Password" inputRef={e => {this.password = e}}/>
        </Col>
      </FormGroup>
    
      <FormGroup>
      <Col smOffset={2} sm={2}>
        <Button bsStyle="primary" onClick={this.signIn.bind(this)}>Sign in</Button>
      </Col>
    </FormGroup>
    <FormGroup>
      <Col smOffset={2} sm={2}>
      <Link to={`/invite`} activeClassName="active">
        <Button bsStyle="secondary">Get invite</Button>
        </Link>
      </Col>
    </FormGroup>
    </Form>
    )
  }
}