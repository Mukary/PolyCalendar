import React from 'react'
import {invite} from '../../services/Auth.services'

export default class InvitePage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isInvited: false,
      userExists: false
    }
  }

  invite() {
    const email = this.email.value
    invite(email).then(res => {
      alert(`An email with inviation link has been sent at ${email}`)
    }).catch(err => {
      alert("User already exists, please use another email")
      console.log(err)
    })
  }

  render() {

    return(
      <div style={{
        width:'400px', 
        height:'150px', 
        backgroundColor:'#4285f4', 
        marginLeft:'35%', 
        marginRight:'35%',
        marginTop:'10%',
        borderRadius:'10px'}}>
        <div style={{color:'white', fontSize:'20px'}}>
          <p style={{marginLeft:'20%'}}>Email:</p>
          <input type='email' style={{width:'250px', margin:'0 auto'}} className='form-control' placeholder='example@domain.com' ref={e => {this.email = e}}/>
        </div>
        <div style={{marginLeft:'20%', marginTop:'5%'}}>
          <button className='btn btn-success' onClick={this.invite.bind(this)}>Send</button>
        </div>
      </div>
    )
  }
}