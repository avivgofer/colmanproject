import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import { Select } from 'antd';
import { Button } from 'antd';
import '../css/CoursePage.css';
import { Input } from 'antd';
//window.location.pathname.split('/')[2]

function getCourse()
{
    const nameFromUrl = window.location.pathname.split('/')[2];
    const task1 = {taskName:'מטלה 1 ',taskNumber:1}
    const task2 = {taskName:'מטלה 2 ',taskNumber:2}
    const task3 = {taskName:'מטלה 3 ',taskNumber:3}
    const task4 = {taskName:'מטלה 4 ',taskNumber:4}
    const tasks = [task1,task2,task3,task4];
    const a = {courseName : 'מבוא למדעי המחשב',coursePathName : 'mavo' , numberOfDoneTasks : 6 , numberOfTasks : 6,tasks: tasks}; 
    const b = {courseName : 'פיתוח תוכנה מתקדם' ,coursePathName : 'pitoh', numberOfDoneTasks : 5 , numberOfTasks : 7,tasks: tasks} ;
    const c = {courseName : 'אלגוריתמים 2' ,coursePathName : 'algo2', numberOfDoneTasks : 5 , numberOfTasks : 9,tasks: tasks} ;  
    const coursesTemp = [a,b,c] ;
  
    var x = '';
    coursesTemp.forEach(function(course){
        if(course.coursePathName === nameFromUrl){
          x = course;
        }
    });
    return x;
}

class Coursepage extends Component {
     constructor(props){
        super(props)
        this.state = {
          course: getCourse()
        };
     }

  render() {
    function handleChange(value) {
      console.log(`selected ${value}`);
    }
    
     const defaultTaskValue= this.state.course ? this.state.course.tasks[0].taskName : 'אין מטלות';
     const { TextArea } = Input;
     const Option = Select.Option;
     const Dragger = Upload.Dragger;
     const props = {
        name: 'file',
        multiple: true,
        action: '//jsonplaceholder.typicode.com/posts/',
        onChange(info) {
          const status = info.file.status;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
         }
       },
     };

    return (
        <div className='Container'>
            <div className="coureseTitle">
               {this.state.course.courseName}
            </div>
            <div className="chooseTask">
                <span className='chooseSpan'>בחר מטלה :  </span>
                <Select defaultValue={defaultTaskValue}  onChange={handleChange}>
                {
                   (this.state.course.tasks) ?  this.state.course.tasks.map((task,idx) =>   
                    <Option  key = {idx} value = {task.taskNumber}>{task.taskName}</Option> ) 
                    : ''
                }       
                </Select>
                <br/>
                   <Button type="primary"> הורד קבצים</Button>
                   <Button type="primary"> פתרון כללי</Button>
                   <Button type="primary"> פתרון שלי</Button>
            
            </div>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
            </Dragger>
            <Button type="primary">  הגשה במוד אימון</Button>
            <Button type="primary"> הגשה סופית </Button>
            <TextArea />
        </div>
        );
      }
    }
    
    export default Coursepage;
