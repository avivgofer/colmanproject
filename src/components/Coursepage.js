import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import { Select ,Spin } from 'antd';
import { Button } from 'antd';
import '../css/CoursePage.css';
import { Input } from 'antd';
import axios from 'axios';
//window.location.pathname.split('/')[2]




function pasteGrade() {
  var t = document.getElementById("gradeArea").textContent;
  var y = document.createTextNode("This just got added");
  
  t.appendChild(y);
}


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
          course: getCourse(),
          selectedTask : '',
          filesArray : '',
          file : '',
          studentID: ''
        };
        this.submission = this.submission.bind(this);
     }
     submission() {
       console.log(!this.state.selectedTask);
     
      if(!this.state.selectedTask){
        console.log(this)

        this.setState({
          selectedTask : this.defaultTaskValue
        });
        console.log(this.state);
      }
      console.log(this.state);
      if(!this.state.file)
      {
        // message.error(`no file uploaded.`);
      }

      let formData = new FormData();
      formData.append("mode", 'practice');
      console.log(this.state.filesArray);
       debugger;
         formData.append("solution_files", this.state.filesArray);


  // for( var i = 0; i < this.state.filesArray.length; i++ ){
  //   let file = this.state.filesArray[i];
  
  //   formData.append('solution_files[' + i + ']', file.originFileObj);
  // }

      var conetentType = { headers: { "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDb2xtYW5TdWJTeXN0ZW0iLCJzdWIiOiI1Y2ZlYmU4MzQwNDVhMTNiNGM0ODlkOWIiLCJpYXQiOjE1NjAyMzQ3NjcxNTcsImV4cCI6MTU2MDMyMTE2NzE1N30.rJvK9y7F5pXa1EEbxwSDWJPBfrNulPsiHIRmxfG0FDs" } };
      axios.post("/tasks/5cfeba9681b1f1212c0e47d5/submissions", formData, conetentType)
        .then(res => document.getElementById("gradeArea").value ="your grade is: "+ res.data.grade)
        .then(res =>
          // this.document.getElementById("gradeArea").contentWindow.document.write(res.data)
          // document.getElementById("gradeArea").value = 
          console.log()
        );
     
    }






    saveData = (function () {
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      return function (data, fileName) {
          var json = JSON.stringify(data),
              blob = new Blob([json], {type: "octet/stream"}),
              url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = fileName;
          a.click();
          window.URL.revokeObjectURL(url);
      };
  }());
  
  download = () => {
      if(this.state.file)
      {
        var data = this.state.file.originFileObj;
        console.log(data);
        debugger;
        const fileName = data.name
        this.saveData(data, fileName);
      } 
  }
    
  render() {
    function handleChange(value) {
      myThis.setState({
        selectedTask : value
      });
      console.log(`selected ${value}`);
    }

   
    
    //  const defaultTaskValue = this.state.course ? this.state.course.tasks[0].taskName : 'אין מטלות';
     const { TextArea } = Input;
     const Option = Select.Option;
     const Dragger = Upload.Dragger;
     const myThis = this;
     const props = {
        name: 'file',
        multiple: true,
        action: '//jsonplaceholder.typicode.com/posts/',
        onChange(info) {
          const status = info.file.status;
          if (status !== 'uploading') {
            // console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
            console.log(info.file);
          
            myThis.setState(prevState => ({
              filesArray: [...prevState.filesArray, info.file]
            }))

            // myThis.setState({
            //   filesArray: info.filesArray
            //   // file: info.file
            // });
           
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
         }
       },
     };

    
    return (
        <div className='Container'>
        <table>
        <tbody>
          <tr>
            <th>
            <div className="coureseTitle">
               {this.state.course.courseName}
             </div>
            </th>
            <th>
            <div className='gradeTitle'>
              ציון:
            </div>
            </th>
          </tr>
        </tbody>
        </table>
            <TextArea id="gradeArea"/>
            {/* <Spin tip="Loading..." delay="3"> */}
            {/* </Spin> */}
            <div className="chooseTask">
                <span className='chooseSpan'>בחר מטלה :  </span>
                <Select defaultValue="בחר מטלה"  onChange={handleChange}>
                {
                   (this.state.course.tasks) ?  this.state.course.tasks.map((task,idx) =>   
                    <Option  key = {idx} value = {task.taskNumber}>{task.taskName}</Option> ) 
                    : ''
                }       
                </Select>
                <br/>
                <br/>
                
                <span className='chooseSpan'>הכנס תעודת זהות :  </span>
                <br/>
                <div>
                <Input className='my-inputs' onChange={(evt) => { this.setState( {studentID:evt.target.value}) }} />
                </div>
                <br/>

                <Button type="primary" onClick={this.download}> הורד קבצים</Button>
                <Button type="primary"> פתרון כללי</Button>
                <Button type="primary"> פתרון שלי</Button>
            </div>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text"> גרור קבצים לכאן </p>
              <p className="ant-upload-hint">או לחץ להעלות קבצים</p>
            </Dragger>
            <div className="submissionBtn"> 
              <Button type="primary">  הגשה במוד אימון</Button>
              <Button onClick={this.submission } type="primary"> הגשה סופית </Button>
            </div>
           
        </div>
        );
      }
    }
    
    export default Coursepage;
