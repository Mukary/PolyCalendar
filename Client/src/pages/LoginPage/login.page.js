import React from 'react'
import {login, setToken, setProfile, userIsLogged, loginWithGoogle} from '../../services/Auth.services'
import {Redirect, Link} from 'react-router-dom'
import GoogleLogin from 'react-google-login'
import {ToastContainer, style} from 'react-toastify'
import {notify} from '../../notifications/notifications'

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
      setProfile(data._id, data.googleEmail)
      this.setState({
        isLogged: true
      })
    }).catch(err => {
      notify('ERROR','Wrong email or password')
    })
  }

  googleLogin(response) {
    loginWithGoogle(response.code).then(data => {
      setToken(data.token)
      setProfile(data._id, data.googleEmail)
      this.setState({
        isLogged: true
      })
    }).catch(err => {
      console.log(err)
      notify('ERROR', 'No user found with this google account')
    })
  }

  render() {
    if(this.state.isLogged) {
      return(
        <Redirect to={'/profile'} />
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
        <ToastContainer />
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
          <GoogleLogin 
          className="btn btn-danger"
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText='Sign in with Google'
          responseType='code'
          scope='profile'
          onSuccess={this.googleLogin.bind(this)}
        />
          <Link to={'/invite'}>
            <button className='btn btn-warning' style={{marginLeft:'20px'}}>Sign up</button>
          </Link>
        </div>
      </div>
    )
  }
}