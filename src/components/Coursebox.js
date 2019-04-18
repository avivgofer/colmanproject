import React, { Component } from 'react';

import '../css/Coursebox.css';
import { Progress } from 'antd';

class Coursebox extends Component {
        constructor(props){
            super(props)
            this.state = {
                courseName: props.courseName,
                numberOfTasks: props.numberOfTasks,
                numberOfDoneTasks: props.numberOfDoneTasks
            }   
        }
     
      getProgress() {
        return parseInt((100 * (this.state.numberOfDoneTasks/this.state.numberOfTasks)).toFixed(0))
     }
     
  render() {
    return (
        <div className='courseContainer'>
            <div className='courseBox'>
                <div className='courseName'>{(this.state.courseName) ? this.state.courseName : 'dddd'}</div>
            </div>
            <div className='progressBox'>
                <Progress percent={this.getProgress()} />
            </div>
        </div>
        );
      }
    }
    
    export default Coursebox;

