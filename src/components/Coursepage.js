import React, { Component } from 'react';
//import  Coursebox  from './Coursebox';
import { Select } from 'antd';
import '../css/CoursePage.css';

const Option = Select.Option;



class Coursepage extends Component {
     constructor(props){
        super(props)
        this.state = {
          course: props.course
        };
     }

     
     
  render() {
    function handleChange(value) {
      console.log(`selected ${value}`);
    }
    
    return (
        <div className='Container'>
            <div className="coureseTitle">
               {this.state.course.courseName}
            </div>
            <div className="chooseTask">
                <Select defaultValue="lucy"  onChange={handleChange}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>Disabled</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
            </div>
            
        </div>
        );
      }
    }
    
    export default Coursepage;
