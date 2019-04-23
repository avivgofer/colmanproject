import React, { Component } from 'react';
import '../css/Task.css';

class Task extends Component {
        constructor(props){
            super(props)
            this.state = {
                taskName: props.taskName,
                taskNumber: props.taskNumber,
                taskFile: props.taskFile,
                taskSolution: props.taskSolution
            }   
        }
     
     
     
  render() {
    return (
        <div className='taskContainer'>
            
        </div>
        );
      }
    }
    
    export default Task;