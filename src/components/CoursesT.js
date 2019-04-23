import React, { Component } from 'react';
import  Coursebox  from './Coursebox';
import { Link } from 'react-router-dom'
import '../css/CoursesT.css';
import { Button } from 'antd';




class CoursesT extends Component {
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
        <div className='Container'>
        <div>
        <Link to='/admin/addCourse'>
        <Button >הוסף קורס</Button>
        </Link>
        </div>
        
        <div className='courses'>
{/*             
            <div className='addBtn'>
            <Button>הוסף קורס</Button>
            </div>
            */}
            {
                this.state.courses.map((course , idx) =>  
                 <Link to={'/course/'+course.coursePathName} key= {idx}> 
                    <Coursebox onClick={this.handleClick} course = {course} key = {idx} />
                     </Link> )                                                          
            }
        </div>
        </div>
        );
      }
    }
    
    export default CoursesT;