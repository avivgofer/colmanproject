import React, { Component } from 'react';
import  Coursebox  from './Coursebox';

import '../css/Courses.css';

class Courses extends Component {
     constructor(props){
        super(props)
        this.state = {
            courses : props.courses
        };
     }
     
  render() {
    return (
        <div className='coursesContainer'>
            <div className="rightBanner">
            {/* white space right side */}
            </div>
            {
                this.state.courses.map((courseBox) =>   
                    <Coursebox key = {courseBox.courseName } 
                               courseName = {courseBox.courseName}
                               numberOfDoneTasks = {courseBox.numberOfDoneTasks}
                               numberOfTasks = {courseBox.numberOfTasks}/> )                                                          
            }
        </div>
        );
      }
    }
    
    export default Courses;
