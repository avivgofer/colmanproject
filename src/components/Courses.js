import React, { Component } from 'react';
import  Coursebox  from './Coursebox';
import '../css/Courses.css';
import { Link } from 'react-router-dom'




class Courses extends Component {
     constructor(props){
        super(props)
        this.state = {
            // courses: props.courses
        };
        
     }
     handleClick() {
        console.log('this is:', this);
      }
  render() {
    
    return (
        <div className='coursesContainer'>
          
            {
                this.props.courses.map((course , idx) =>  
                <Link to={'/course/'+course.coursePathName} key= {course.courseName}> 
                    <Coursebox onClick={this.handleClick} course = {course} key = {idx} />
                    </Link>
                     )                                                          
            }
        </div>
        );
      }
    }
    
    export default Courses;
