// import React, { Component } from 'react';
// import '../css/Coursebox.css';
// import '../css/Login.css';
// import {  Button, Input } from 'antd';
// import { Link } from 'react-router-dom'
// // import 'bootstrap/dist/css/bootstrap.css';
// // import '//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js'
// // import '//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'


// class Login extends Component {
//         constructor(props){
//             super(props)
//             this.state = {
//                 course: ''
//             }  
//             // const {
//             //   user,
//             //   signOut,
//             //   signInWithGoogle,
//             // } = this.props; 
//             // this.deleteCourse = this.deleteCourse.bind(this);
//         }
//         // deleteCourse(){
//         //     var a = JSON.parse(localStorage.getItem('myData'));
//         //     a = a.filter((e) => e.coursePathName !== this.props.course.coursePathName);
//         //     localStorage.setItem('myData', JSON.stringify(a));
            
//         // }
     
//         // getProgress() {
//         //     return parseInt((100 * (this.props.course.numberOfDoneTasks/this.props.course.numberOfTasks)).toFixed(0))
//         // }
        
     
//   render() {
//     return (
//       <div className='Container-login'>
//       {/* <span>איימיל</span> */}
//       <div>
//       <Input className='loginInput' defaultValue='email' onChange={(evt) => { this.setState( {courseName:evt.target.value}) }} />
//       </div>
//       {/* <span>סיסמא</span> */}
//       <div>
      
//       <Input className='loginInput' defaultValue='password' onChange={(evt) => { this.setState( {coursePathName:evt.target.value}) }} />
//       </div>
//       <div>
//         <Link to='/admin'>
//               <Button className='btn-login' onClick={this.addCourse}> התחבר</Button>
//         </Link>
//       </div>
          
          
//       </div>
      
//         );
//       }
//     }


import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Toaster, Intent } from '@blueprintjs/core'
import { app } from '../base'

const loginStyles = {
  width: "90%",
  maxWidth: "315px",
  margin: "20px auto",
  border: "1px solid #ddd",
  borderRadius: "5px",
  padding: "10px"
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
    this.state = {
      redirect: false
    }
  }

  
  authWithEmailPassword(event) {
    event.preventDefault()

    const email = this.emailInput.value
    const password = this.passwordInput.value

    app.auth().fetchSignInMethodsForEmail(email)
      .then((providers) => {
        if (providers.length === 0) {
          // create user
          return app.auth().createUserWithEmailAndPassword(email, password).then(res => {
            console.log(res)
      
          })
          .catch(err => {
            console.log(err)

          })
        } else if (providers.indexOf("password") === -1) {
          // they used facebook
          this.loginForm.reset()
          this.toaster.show({ intent: Intent.WARNING, message: "Try alternative login." })
        } else {
          // sign user in
       
         return app.auth().signInWithEmailAndPassword(email, password)
        }
      })
      .then((user) => {
        if (user && user.email) {
          this.loginForm.reset()
          this.setState({redirect: true , user: user})
          console.log(this.state);
          debugger
        }
      })
      .catch((error) => {
        this.toaster.show({ intent: Intent.DANGER, message: error.message })
      })
  }

  render() {
    if (this.state.redirect === true && this.state.user.email === "admin@gmail.com") {
      return <Redirect to='/admin' />
    }
    if (this.state.redirect === true) {
      return <Redirect to='/' />
    }

    return (
      <div style={loginStyles}>
      {
        
      }
        <Toaster ref={(element) => { this.toaster = element }} />

        <hr style={{marginTop: "10px", marginBottom: "10px"}}/>
        <form onSubmit={(event) => { this.authWithEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
          <div style={{marginBottom: "10px"}} className="pt-callout pt-icon-info-sign">
            <h5>Note</h5>
            If you don't have an account already, this form will create your account.
          </div>
          <label className="pt-label">
            Email
            <input style={{width: "100%"}} className="pt-input" name="email" type="email" ref={(input) => { this.emailInput = input }} placeholder="Email"></input>
          </label>
          <label className="pt-label">
            Password
            <input style={{width: "100%"}} className="pt-input" name="password" type="password" ref={(input) => { this.passwordInput = input }} placeholder="Password"></input>
          </label>
          <input style={{width: "100%"}} type="submit" className="pt-button pt-intent-primary" value="Log In"></input>
        </form>
      </div>
    )
  }
}

    export default Login;



















