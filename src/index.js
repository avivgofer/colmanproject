import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from '../src/components/Header'
import Courses from '../src/components/Courses'
import AddCourse from '../src/components/AddCourse'
import CoursesT from '../src/components/CoursesT'
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import Coursepage from './components/Coursepage';
import { BrowserRouter as Router, Route } from 'react-router-dom';


const task1 = {taskName:'מטלה 1 ',taskNumber:1}
    const task2 = {taskName:'מטלה 2 ',taskNumber:2}
    const task3 = {taskName:'מטלה 3 ',taskNumber:3}
    const task4 = {taskName:'מטלה 4 ',taskNumber:4}
    const tasks = [task1,task2,task3,task4];
    const a = {courseName : 'מבוא למדעי המחשב',coursePathName : 'mavo' , numberOfDoneTasks : 6 , numberOfTasks : 6,tasks: tasks}; 
    const b = {courseName : 'פיתוח תוכנה מתקדם' ,coursePathName : 'pitoh', numberOfDoneTasks : 5 , numberOfTasks : 7} ;
    const c = {courseName : 'אלגוריתמים 2' ,coursePathName : 'algo2', numberOfDoneTasks : 5 , numberOfTasks : 9,tasks: tasks} ;  
    const coursesTemp = [a,b,c,b,c] ;
    const Page404 = ({ location }) => (
        <div>
           <h2>No match found!</h2>
        </div>
     );

class Body extends Component {
    
    render() {
        return (
            <Router>
            <div>
                <Header />
                <Route
                path='/'
                exact = {true}
                render={() => (<Courses courses = {coursesTemp} isAuthed={true} />)}
                />
                <Route
                path='/admin'
                exact = {true}
                render={() => (<CoursesT courses = {coursesTemp} isAuthed={true} />)}
                />
                <Route  path="/course" component={Coursepage} />
                <Route exact={true} path="/404" component={Page404} />
                <Route exact={true} path="/admin/addCourse" component={AddCourse} />
                
            </div> 
            </Router>
        );
    }
}

ReactDOM.render(<Body />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
