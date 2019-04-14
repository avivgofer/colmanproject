import React, { Component } from 'react';

import '../css/Coursebox.css';
import { Progress } from 'antd';

class Coursebox extends Component {
        constructor(props,courseName,numberOfTest,numberOfDoneTest){
            super(props)
            this.state = {
                courseName: props.courseName || courseName,
                numberOfTest: props.numberOfTest || numberOfTest ,
                numberOfDoneTest: props.numberOfDoneTest || numberOfDoneTest 
            }
        }
     
      getProgress() {
        return parseInt((100 * (this.state.numberOfDoneTest/this.state.numberOfTest)).toFixed(0))
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

