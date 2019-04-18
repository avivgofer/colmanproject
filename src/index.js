import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from '../src/components/Header'
import Courses from '../src/components/Courses'
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import Coursebox from './components/Coursebox';
import Coursepage from './components/Coursepage';

const a = {courseName : 'מבוא למדעי המחשב' , numberOfDoneTasks : 6 , numberOfTasks : 6} 
const b = {courseName : 'פיתוח תוכנה מתקדם' , numberOfDoneTasks : 5 , numberOfTasks : 7} 
const c = {courseName : 'אלגוריתמים 2' , numberOfDoneTasks : 5 , numberOfTasks : 9} 
const d = new Coursebox(4,'javascript',3,3);
const allCourses = [c,a,b] ;
console.log(d);
class Body extends Component {
    render() {
        return (
            <div>
                <Header />
                {/* <Courses courses={allCourses}/> */}
                <Coursepage course={a}/>
            </div> 
        );
    }
}

ReactDOM.render(<Body />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
