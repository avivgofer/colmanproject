import React, { Component } from 'react';
import '../css/Coursebox.css';
import { Progress } from 'antd';

class Coursebox extends Component {
        constructor(props){
            super(props)
            this.state = {
                course: props.course
            }   
        }
     
      getProgress() {
        return parseInt((100 * (this.state.course.numberOfDoneTasks/this.state.course.numberOfTasks)).toFixed(0))
     }
     
  render() {
    return (
        <div className='courseContainer'>
        
            <div className='courseBox'>
                <div className='courseName'>{(this.state.course.courseName) ? this.state.course.courseName : 'dddd'}</div>
            </div>
            <div className='progressBox'>
                <Progress percent={this.getProgress()} />
            </div>
        
        </div>
        );
      }
    }
    
    export default Coursebox;

