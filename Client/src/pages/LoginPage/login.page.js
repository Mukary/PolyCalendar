import React from 'react'
import {login, setToken, setProfile, userIsLogged, verifyUser} from '../../services/Auth.services'
import {Redirect, Link} from 'react-router-dom'
import {Form, FormGroup, Col, ControlLabel, FormControl, Button} from 'react-bootstrap'

export default class LoginPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLogged: false
    }
  }

  componentWillMount() {
    if(userIsLogged()){
      this.setState({
        isLogged: true
      })
    }
  }

  signIn() {
    const email = this.email.value
    const password = this.password.value
    login(email, password).then(data => {
      setToken(data.token)
      setProfile(data._id)
      this.setState({
        isLogged: true
      })
    }).catch(err => {
      alert('Wrong email or password')
    })
  }

  render() {
    if(this.state.isLogged) {
      return(
        <Redirect to={'/'} />
      )
    }
    /*return(
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
    )*/
    return(
      <div style={{
        width:'400px', 
        height:'250px', 
        backgroundColor:'#4285f4', 
        marginLeft:'35%', 
        marginRight:'35%',
        marginTop:'10%',
        borderRadius:'10px'}}>
        <div style={{color:'white', fontSize:'20px'}}>
          <p style={{marginLeft:'20%'}}>Email:</p>
          <input type='email' style={{width:'250px', margin:'0 auto'}} className='form-control' placeholder='example@domain.com'/>
        </div>
        <div style={{color:'white', fontSize:'20px', marginTop:'20px'}}>
          <p style={{marginLeft:'20%'}}>Password:</p>
          <input type='password' style={{width:'250px', margin:'0 auto'}} className='form-control'/>
        </div>
        <div style={{marginLeft:'20%', marginTop:'5%'}}>
          <button className='btn btn-success' onClick={this.signIn.bind(this)} ref={e => {this.email = e}}>Sign in</button>
          <button className='btn btn-warning' style={{marginLeft:'20px'}} ref={e => {this.password = e}}>Sign up</button>
        </div>
      </div>
    )
  }
}