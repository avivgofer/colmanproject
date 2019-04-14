import React, { Component } from 'react';
import  Coursebox  from './Coursebox';

import '../css/Courses.css';

class Courses extends Component {
     constructor(props){
        super(props)
        this.state = {
            courses : props.courses
        }
     }
     
  render() {
    return (
        <div className='coursesContainer'>
            {
                this.state.courses.map((courseBox) => <Coursebox key = {courseBox.props.courseName } courseName = {courseBox.props.courseName} numberOfDoneTest = {courseBox.props.numberOfDoneTest} numberOfTest = {courseBox.props.numberOfTest}/> )
            }
        </div>
        );
      }
    }
    
    export default Courses;
