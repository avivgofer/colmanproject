import React, { Component } from 'react';
import  Coursebox  from './Coursebox';
import { Link } from 'react-router-dom'
import '../css/CoursesT.css';
import { Button ,Icon} from 'antd';




class CoursesT extends Component {
     constructor(props){
        super(props)
        this.state = {
            courses: this.getCoursesT()
        };
        this.deleteCourse = this.deleteCourse.bind(this);
       // this.getCoursesT = getCoursesT.bind(this);
        
     }
     componentDidMount() {
        this.checkUser();
     }
      checkUser() {
       
      }
      deleteCourse(value){
            var a = JSON.parse(localStorage.getItem('myData'));
            a = a.filter((e) => e.coursePathName !== value.coursePathName);
            localStorage.setItem('myData', JSON.stringify(a));
            this.setState({courses:this.getCoursesT()});
        }
      getCoursesT() {
        return JSON.parse(localStorage.getItem('myData'));
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
            {
              this.state.courses ?
                this.state.courses.map(
                (course , idx) =>  
                  (
                    <div key={idx+2}>
                      <Icon value={course} onClick={() => {if(window.confirm('Are you sure? Delete item?')) {this.deleteCourse(course)}}}
                       type="delete" key={idx+1} />
                       <Link to={'/admin/'+course.coursePathName} key= {course.courseName}> 
                      <Coursebox onClick={this.handleClick} course = {course} key = {idx} />
                      </Link>
                    </div>
                  )
                )   
                : ''                                                 
            }
        </div>
        </div>
        );
      }
    }
    
    export default CoursesT;