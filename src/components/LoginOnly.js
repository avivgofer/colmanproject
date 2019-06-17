import React, { Component } from 'react'
import { Intent } from '@blueprintjs/core'
import { app } from '../base'
import '../css/LoginOnly.css'
import {message } from 'antd';
import axios from 'axios';

class LoginOnly extends Component {
  constructor(props) {
    super(props);
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
    this.state = { redirect: false , toRegister: false }
  }



  register(event){ 
    event.preventDefault()

    const requestOptions = {
      method: 'POST',
      url: '/users',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        firstName: this.firstNameInput.value,
        lastName: this.lastNameInput.value,
        identityNumber: this.idInput.value,
        password: this.passwordInput.value,
        email: this.emailInput.value
      }
  }
    
      axios(requestOptions).then(res => {
        if(res.data.success){
          this.setState({toRegister:false})
        }
      })
      .catch(err => {//TODO something with result after deadline 
          debugger
      })
  }





   
 
  authWithIdAndPassword(event){ 
    event.preventDefault()
    const IDNumber = this.idInput.value
    const password = this.passwordInput.value

    const requestOptions = {
      method: 'POST',
      url: '/users/signin',
      // 'Content-Type': 'application/json',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        identityNumber: IDNumber,
        password: password 
      }
  }
    
      axios(requestOptions).then(res => {
        if(res.status == 200 && res.data.token){
          console.log(res);
          localStorage.setItem('token', JSON.stringify(res.data.token));
          localStorage.setItem('permission', JSON.stringify(res.data.permission));
           window.location.reload();
        }
      })
      .catch(err => {//TODO something with result after deadline 
          debugger
      })
  }

 
  
  authWithEmailPassword(event) {
    event.preventDefault()
    const email = this.emailInput.value
    const password = this.passwordInput.value

    app.auth().fetchSignInMethodsForEmail(email)
      .then((providers) => {
        if (providers.length === 0) {
          // create user
        //   return app.auth().createUserWithEmailAndPassword(email, password).then(res => {
            message.error(`wrong password/email ! `);
        } else if (providers.indexOf("password") === -1) {
          // they used facebook
          message.error(`something went wrong ! `);
        } else {
          // sign user in
       
         return app.auth().signInWithEmailAndPassword(email, password)
        }
      })
      .then((user) => {
        if (user && user.email) {
          this.loginForm.reset()
          this.setState({redirect: true , user: user})
          this.props.history.push('/')
          console.log(this.state);
       
        }
      })
      .catch((error) => {
        this.toaster.show({ intent: Intent.DANGER, message: error.message })
      })
  }

  render() {
    return (
      (!this.state.toRegister)
       ?
      <div className='loginContainer'>
        <div className="login-page">
        <div className="form">
                <form className="login-form" onSubmit={(event) => { this.authWithIdAndPassword(event) }} 
                ref={(form) => { this.loginForm = form }}>
                <input name="id" type="number" ref={(input) => { this.idInput = input }} placeholder="ID Number"/>
                <input name="password" type="password" ref={(input) => { this.passwordInput = input }} placeholder="Password"/>
                <button type='submit'>login</button>
                <button type='button' onClick={() => this.setState({toRegister : true})}>register</button>
            </form>
        </div>
        </div>
      </div>
      :
      <div className='loginContainer'>
        <div className="login-page">
        <div className="form">
                <form className="login-form" onSubmit={(event) => { this.register(event) }} 
                ref={(form) => { this.loginForm = form }}>
                <input name="firstName" type="string" ref={(input) => { this.firstNameInput = input }} placeholder="first name"/>
                <input name="lastName" type="string" ref={(input) => { this.lastNameInput = input }} placeholder="last name"/>
                <input name="id" type="number" ref={(input) => { this.idInput = input }} placeholder="ID Number"/>
                <input name="email" type="email" ref={(input) => { this.emailInput = input }} placeholder="email"/>
                <input name="password" type="password" ref={(input) => { this.passwordInput = input }} placeholder="password"/>
                <input name="passwordValid" type="password" ref={(input) => { this.passwordValidInput = input }} placeholder="password validation"/>
                <button type='submit'>register</button>
                <button type='button' onClick={() => this.setState({toRegister : false})}>login</button>
            </form>
        </div>
        </div>
      </div>
    )
  }
}

    export default LoginOnly;

























