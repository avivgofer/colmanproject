import React, { Component } from 'react'
import { Intent } from '@blueprintjs/core'
import { app } from '../base'
import '../css/LoginOnly.css'
import {message } from 'antd';



class LoginOnly extends Component {
  constructor(props) {
    super(props)
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
    this.state = {
      redirect: false
    }
   
  }
  componentDidMount() {
 
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
    // if (this.state.redirect === true && this.state.user.email === "admin@gmail.com") {
    //   return <Redirect to='/admin' />
    // }
    // if (this.state.redirect === true) {
    //   return <Redirect to='/' />
    // }

    return (
      <div className='loginContainer'>
        <div className="login-page">
        <div className="form">
                <form className="login-form" onSubmit={(event) => { this.authWithEmailPassword(event) }} 
                ref={(form) => { this.loginForm = form }}>
                <input name="email" type="email" ref={(input) => { this.emailInput = input }} placeholder="Email"/>
                <input name="password" type="password" ref={(input) => { this.passwordInput = input }} placeholder="Password"/>
                <button type='submit'>login</button>
            </form>
        </div>
        </div>
      </div>
    )
  }
}

    export default LoginOnly;

























