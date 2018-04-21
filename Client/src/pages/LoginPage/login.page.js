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
      console.log(data)
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
          <input type='email' style={{width:'250px', margin:'0 auto'}} className='form-control' placeholder='example@domain.com' ref={e => {this.email = e}}/>
        </div>
        <div style={{color:'white', fontSize:'20px', marginTop:'20px'}}>
          <p style={{marginLeft:'20%'}}>Password:</p>
          <input type='password' style={{width:'250px', margin:'0 auto'}} className='form-control' placeholder='password' ref={e => {this.password = e}}/>
        </div>
        <div style={{marginLeft:'20%', marginTop:'5%'}}>
          <button className='btn btn-success' onClick={this.signIn.bind(this)}>Sign in</button>
          <Link to={'/invite'}>
            <button className='btn btn-warning' style={{marginLeft:'20px'}}>Sign up</button>
          </Link>
        </div>
      </div>
    )
  }
}