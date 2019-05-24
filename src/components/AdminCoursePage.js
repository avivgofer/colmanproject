import React, { Component } from 'react';
import { Upload, Icon, message, Button } from 'antd';
 import '../css/AddCourse.css';
import { Input } from 'antd';
import { Link } from 'react-router-dom'




class AdminCoursePage extends Component {
     constructor(props){
        super(props)
        this.state = {
            course: getCourse(),
            taskFile: '',
            taskCheckFile: '',
            taskName:''
        };
        this.addCourse = this.addCourse.bind(this);
        
     }
     handleClick() {
        console.log('this is:', this);
      }
      addCourse(){
          console.log(this.state);
          debugger;
        // if(this.state.taskName)
        // {
        //  var a = JSON.parse(localStorage.getItem('myData'));
        // var  res = JSON.search( a, [tasks="aviv"]);

        // console.log( res[0] );
        //  debugger
        // //  a.push(this.state)
        // //  localStorage.setItem('myData', JSON.stringify(a));
        // //  this.props.history.push('/admin')
        // }
        // else{
        //  message.error(`חסר נתונים!`);
        // }
     }
  render() {
    const Dragger = Upload.Dragger;
    const myThis = this;
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
        //    console.log(`${info.file}`);
           myThis.setState({
               taskFile:info.file
           });
        //    console.log(myThis.state);
           message.success(`${info.file.name} file uploaded successfully.`);
         } else if (status === 'error') {
           message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    const propsForCheckFile = {
        name: 'file',
        multiple: true,
        action: '//jsonplaceholder.typicode.com/posts/',
        onChange(info) {
          const status = info.file.status;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            // console.log(`${info.file}`);
            myThis.setState({
                taskCheckFile:info.file
            });
            // console.log(myThis.state);
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
        <span>שם המטלה</span>
        <div>
        <Input className='my-inputs' onChange={(evt) => { this.setState( {taskName:evt.target.value}) }} />
        </div>
        <span>הוסף מטלה</span>
        <Dragger {...props} className='my-inputs'>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">הוסף מטלה</p>
              <p className="ant-upload-hint">ניתן לגרור לכאן</p>
        </Dragger>
         
        <span>הוסף בדיקה למטלה</span>
        <Dragger {...propsForCheckFile} className='my-inputs'>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">הוסף בדיקה למטלה</p>
              <p className="ant-upload-hint">ניתן לגרור לכאן</p>
            </Dragger>
            <Link to='/admin'>
              <Button onClick={this.addCourse}>הוסף מטלה</Button>
            </Link>
            
        </div>
        );
      }
    }
    
    export default AdminCoursePage;



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
    const r = {courseName :  'אביב' ,coursePathName : 'aviv', numberOfDoneTasks : 5 , numberOfTasks : 9,tasks: tasks} ;   
    const coursesTemp = [a,b,c,r] ;
  
    var x = '';
    coursesTemp.forEach(function(course){
        if(course.coursePathName === nameFromUrl){
            debugger
          x = course;
        }
    });
    return x;
}