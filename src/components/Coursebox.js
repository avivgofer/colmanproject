import React, { Component } from 'react';
import '../css/Coursebox.css';
import { Progress } from 'antd';
import { Link } from 'react-router-dom'

class Coursebox extends Component {
        constructor(props){
            super(props)
            this.state = {
                course: ''
            }   
            this.deleteCourse = this.deleteCourse.bind(this);
        }
        deleteCourse(){
            var a = JSON.parse(localStorage.getItem('myData'));
            a = a.filter((e) => e.coursePathName !== this.props.course.coursePathName);
            localStorage.setItem('myData', JSON.stringify(a));
            
        }
     
        getProgress() {
            return parseInt((100 * (this.props.course.numberOfDoneTasks/this.props.course.numberOfTasks)).toFixed(0))
        }
     
  render() {
    return (
        <div className='courseContainer'>
            
            <div className='courseBox'>
                <div className='courseName'>{(this.props.course.courseName) ? this.props.course.courseName : 'dddd'}</div>
            </div>
            
            <div className='progressBox'>
                {
                    this.props.course.numberOfDoneTasks ?  <Progress percent={this.getProgress()} /> : ''
                }
            </div>
        </div>
        );
      }
    }
    
    export default Coursebox;

