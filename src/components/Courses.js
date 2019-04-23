import React, { Component } from 'react';
import  Coursebox  from './Coursebox';
import { Link } from 'react-router-dom'
import '../css/Courses.css';




class Courses extends Component {
     constructor(props){
        super(props)
        this.state = {
            courses: props.courses
        };
        
     }
     handleClick() {
        console.log('this is:', this);
      }
  render() {
    
    return (
        <div className='coursesContainer'>
          
            {
                this.state.courses.map((course , idx) =>  
                 <Link to={'/course/'+course.coursePathName} key= {idx}> 
                    <Coursebox onClick={this.handleClick} course = {course} key = {idx} />
                     </Link> )                                                          
            }
        </div>
        );
      }
    }
    
    export default Courses;
