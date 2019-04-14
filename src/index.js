import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from '../src/components/Header'
import Courses from '../src/components/Courses'
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import Coursebox from './components/Coursebox';

var b = <Coursebox courseName = 'מבוא למדעי המחשב' numberOfDoneTest = {6} numberOfTest = {6}/> 
var c = <Coursebox courseName = 'פיתוח תוכנה מתקדם' numberOfDoneTest = {5} numberOfTest = {7}/> 
var a = <Coursebox courseName = 'אלגוריתמים 2' numberOfDoneTest = {5} numberOfTest = {9}/> 
var gg = new Coursebox(1,'javascript',3,3);
const d = [b,c,a] ;
console.log(d);
class Body extends Component {
    render() {
        return (
            <div>
                <Header />
                <Courses courses={d}/>
            
            </div>
        );
    }
}

ReactDOM.render(<Body />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
