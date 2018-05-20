import React from 'react'
import { register } from '../../services/Register.services'
import {ToastContainer, style} from 'react-toastify'
import {notify} from '../../notifications/notifications'
import {Redirect} from 'react-router-dom'
import './register.styles.css'

export default class RegisterPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isRegistered: false,
      emailValue: ''
    }
  }

  signUp () {
    const query = new URLSearchParams(window.location.search)
    const email = query.get('email')
    const code = query.get('code')
    const hasParams = (email !== null && code !== null && this.firstname.value !== '' && this.lastname.value !== '')
    const payload = {
      firstname: this.firstname.value,
      lastname: this.lastname.value,
      email: this.email.value,
      password: this.passwordA.value,
      code: code
    }
    if(this.checkForm() && hasParams){
      register(payload).then((res) => {
        this.setState({
          isRegistered: true
        })
      }).catch(err => {
        console.log(err)
        notify('ERROR', 'Inviation not found or user already exists')
      })
    } else {
      notify('ERROR','Please match the registration requirements. The password must at least contain 1 uppercase letter, 1 digit character, 1 special character(!,@,#,$,%,^,&,*,?,_,~) and be 6-character long')
    }
  }
  checkParams() {
    const query = new URLSearchParams(window.location.search)
    const email = query.get('email')
    const code = query.get('code')
    return (email !== null && code !== null)
  }

  checkPasswordMatch () {
    let passwordA = this.passwordA.value
    let passwordB = this.passwordB.value
    return passwordA === passwordB
  }

  checkPasswordStrength() {
    let upperCase = 0
    let specialChar = 0
    let digitChar = 0
    const password = this.passwordA.value
    for(let i=0; i<password.length; i++){
      if (password[i].match(/[A-Z]/g)) upperCase++
      if (password[i].match(/[0-9]/g)) digitChar++
      if (password[i].match(/(.*[!,@,#,$,%,^,&,*,?,_,~])/)) specialChar++
    }
    return (password.length >= 6) && (upperCase > 0) && (specialChar > 0) && (digitChar > 0)
  }

  checkEmail() {
    return this.email.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  }

  checkForm(){
    return this.checkEmail() && this.checkPasswordMatch() && this.checkPasswordStrength() && this.checkParams()
  }

  render() {
    if(this.state.isRegistered) {
      return(
        <Redirect to={'/login'} />
      )
    }
    return(
      <div style={{
        width:'400px', 
        height:'600px', 
        backgroundColor:'#4285f4', 
        marginLeft:'35%', 
        marginRight:'35%',
        marginTop:'10%',
        borderRadius:'10px'}}>
        <ToastContainer />
        <div style={{color:'white', fontSize:'20px'}}>
          <p style={{marginLeft:'20%'}}>Firstname:</p>
          <input type='text' style={{width:'250px', margin:'0 auto'}} className='form-control' placeholder='John'ref={ (e) => {this.firstname = e}}/>
        </div>
        <div style={{color:'white', fontSize:'20px'}}>
          <p style={{marginLeft:'20%'}}>Lastname:</p>
          <input type='text' style={{width:'250px', margin:'0 auto'}} className='form-control' placeholder='Snow'ref={ (e) => {this.lastname = e}}/>
        </div>
        <div style={{color:'white', fontSize:'20px'}}>
          <p style={{marginLeft:'20%'}}>Email:</p>
          <input type='email' style={{width:'250px', margin:'0 auto'}} className='form-control' placeholder='example@domain.com'ref={ (e) => {this.email = e}}/>
        </div>
        <div style={{color:'white', fontSize:'20px', marginTop:'20px'}}>
          <p style={{marginLeft:'20%'}}>Password:</p>
          <input type='password' title='Password length is a least 6 characters and it should contain at least one uppercase letter & one number' style={{width:'250px', margin:'0 auto'}} className='form-control' placeholder='password'ref={ (e) => {this.passwordA = e}}/>
        </div>
        <div style={{color:'white', fontSize:'20px', marginTop:'20px'}}>
          <p style={{marginLeft:'20%'}}>Confirm Password:</p>
          <input type='password' style={{width:'250px', margin:'0 auto'}} className='form-control' placeholder='password'ref={ (e) => {this.passwordB = e}}/>
        </div>
        <div style={{marginLeft:'20%', marginTop:'5%'}}>
          <button className='btn btn-warning'  ref={e => {this.password = e}} onClick={this.signUp.bind(this)}>Register</button>
        </div>
      </div>
    )
  }
}