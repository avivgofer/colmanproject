import React, { Component } from 'react';
import ReactDOM  from 'react-dom';
import './index.css';
import Header from '../src/components/Header'
import Courses from '../src/components/Courses'
import AddCourse from '../src/components/AddCourse'
import CoursesT from '../src/components/CoursesT'
import Login from '../src/components/Login'
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import {Icon} from 'antd'
import Coursepage from './components/Coursepage';
import { BrowserRouter as Router, Route ,Switch } from 'react-router-dom';
import ErrorNotFound from './ErrorNotFound';
import { app } from './base'
import AdminCoursePage from './components/AdminCoursePage';



const task1 = {taskName:'מטלה 1 ',taskNumber:1}
    const task2 = {taskName:'מטלה 2 ',taskNumber:2}
    const task3 = {taskName:'מטלה 3 ',taskNumber:3}
    const task4 = {taskName:'מטלה 4 ',taskNumber:4}
    const tasks = [task1,task2,task3,task4];
    const a = {courseName : 'מבוא למדעי המחשב',coursePathName : 'mavo' , numberOfDoneTasks : 6 , numberOfTasks : 6,tasks: tasks}; 
    const b = {courseName : 'פיתוח תוכנה מתקדם' ,coursePathName : 'pitoh', numberOfDoneTasks : 5 , numberOfTasks : 7} ;
    const c = {courseName : 'אלגוריתמים 2' ,coursePathName : 'algo2', numberOfDoneTasks : 5 , numberOfTasks : 9,tasks: tasks} ;  
    const coursesTemp = [a,b,c,b,c] ;



class Body extends Component {
    constructor(props){
        super(props)
        this.state = {
            log: '',
            httpRequests: 0,
            initial : ''
        }
        this.checkLog = this.checkLog.bind(this);
        this.checkLog()
       // this.getCoursesT = getCoursesT.bind(this);  
      
     }

    //  getDataFromServer = async () => {
    //    // imp 1)
    //    axios.post('http://biba.com/getdata', {userId: 123}).then(res => {
    //      console.log(res)
    //    })
    //    // imp 2)
    //    const res = await axios.post('http://biba.com/getdata')
    //    console.log(res)
    //  }

     componentDidMount() {
       this.checkLog()
       this.setState({initial: false})
       fetch('https://jsonplaceholder.typicode.com/todos/2')
  .then(response => response.json())
  .then(json => console.log(json))
     }

    //  login = async () => {
    //    try {
    //      const loggedInUser = await app.auth().onAuthStateChanged()
    //    } catch(err) {
    //      console.log(err)
    //    }
    //  }
     checkLog() {
       
      //  this.setState({httpRequests: this.state.httpRequests + 1})
      this.state.httpRequests = this.state.httpRequests + 1;
      app.auth().onAuthStateChanged((user) => {
 
          this.setState({user}, () => {
           
            this.setState({user})
            this.setState({httpRequests: this.state.httpRequests - 1})
          })
      })
    }

    isUserExist = () => !!this.state.user
        
     
    render() {
        return (
          this.state.httpRequests > 0 
          ? <div style={{width: '100%', height: '100%', opacity: '0.5', justifyContent: 'center'}}>  
          <Icon style={{marginLeft: '50%'}} type="loading" /></div>
          : 
          <Router>
             
          <Header />
             <Route exact={true} path="/login" component={Login} />
          { !this.isUserExist()
            ? <Login />
            : <div>
             <Switch>
                <Route
                path='/'
                exact = {true}
                render={() => (<Courses courses = {coursesTemp} isAuthed={true} />)}
                />
                <Route
                path='/admin'
                exact = {true}
                render={() => (<CoursesT isAuthed={true} />)}
                />
                <Route  path="/course" component={Coursepage} />
                {/* <Route exact={true} path="/404" component={Page404} /> */}
                <Route exact={true} path="/admin/addCourse" component={AddCourse} /> 
                <Route exact={false} path="/admin/" component={AdminCoursePage} />
                <Route exact={true} path="/login"  />
                <Route path="*" component={ErrorNotFound} />    
                </Switch>           
            </div> 
          }
         
            </Router>
        );
    }
}

ReactDOM.render(<Body />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
