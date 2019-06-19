import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import { Select ,Spin } from 'antd';
import { Button } from 'antd';
import '../css/CoursePage.css';
import NewExample from './NewExample'
import { Input } from 'antd';
import axios from 'axios';




// function pasteGrade() {
//   var t = document.getElementById("gradeArea").textContent;
//   var y = document.createTextNode("This just got added");
  
//   t.appendChild(y);
// }


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

function form(mode,filesArray) {
    let data = new FormData()
    data.append('mode',mode)
    filesArray.map(file => data.append('solution_files', file))
    return data
}

class Coursepage extends Component {
     constructor(props){
        super(props)
        this.state = {
          tasks: [],
          isSent : false,
          course: getCourse(),
          selectedTask : '',
          filesArray : [],
          file : '',
          studentID: '',
          output: '',
          mode: '',
          isWaiting: false
        };
        this.submission = this.submission.bind(this);
     }

     componentDidMount() {
      this.getTasks();
     }

     setResult = (output) => {
       this.setState({output})
     }



     beforeUpload = (file) => {
      const newFiles = this.state.filesArray
      newFiles.push(file)
      this.setState({filesArray: newFiles})
  }
     submission(mode) {

      this.setState({
        mode:mode
      });
      console.log(this.state)
   
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


        const data = form(mode,this.state.filesArray);
        const selectedTaskId = this.state.selectedTask
        const requestOptions = {
          method: 'POST',
          url: '/tasks/'+ selectedTaskId +'/submissions',
          data,
          'Content-Type': 'multipart/form-data',
          headers: {
              authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDb2xtYW5TdWJTeXN0ZW0iLCJzdWIiOiI1Y2ZlYmU4MzQwNDVhMTNiNGM0ODlkOWIiLCJpYXQiOjE1NjAyMzQ3NjcxNTcsImV4cCI6MTU2MDMyMTE2NzE1N30.rJvK9y7F5pXa1EEbxwSDWJPBfrNulPsiHIRmxfG0FDs'
          }
      }
      console.log(this.state)

      
          this.setState({isSent: true})
          this.setState({isWaiting:true});
          axios(requestOptions).then(res => {
            this.setState({isWaiting:false});
              this.setResult(`${res.data.output}! grade:${res.data.grade}`)
          })
          .catch(err => {//TODO something with result after deadline 
            this.setState({isWaiting:false});
            this.setResult(`something went wrong with your request!`)
          })
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
        const fileName = data.name
        this.saveData(data, fileName);
      } 
  }

  debuggerFunc = () => {
    console.log(this);
    debugger
  }

  getTasks = () => {
    var self = this;
    const auth = JSON.parse(localStorage.getItem('token')).replace('"','');
    const tempAuth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDb2xtYW5TdWJTeXN0ZW0iLCJzdWIiOiI1Y2ZlYmU4MzQwNDVhMTNiNGM0ODlkOWIiLCJpYXQiOjE1NjA2NjU1NDcyMzgsImV4cCI6MTU2MDc1MTk0NzIzOH0.vGquvDnwfDV4vKUZHRSJWUiPod5QXmlI9Q24yXyvBS0";
    const header = {
      headers: {
        authorization: tempAuth
      }
  }// + this.props.location.state.course.tasks
    axios
        .get("http://localhost:3000/tasks/", {headers: {authorization: auth}})
        .then((response) => {
          response.data.map((task) => {
            if(task.course == this.props.location.state.course._id){
              var tempTasks = self.state.tasks;
              tempTasks.push(task);
              self.setState({tasks:tempTasks});
            }
          });
        })
        .catch(err => {
            console.log(err);
            return null;
        });
 };
    
  render() {
    function handleChange(value) {
      myThis.setState({
        selectedTask : value
      });
      console.log(`selected ${value}`);
    }

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
            <span>שם הקורס: </span>
               {this.props.location.state.course.title}
             </div>
            </th>
            <th>
            <div className='gradeTitle'>
            {
              (this.state.isWaiting) ? <Spin tip="Waiting..." direction='rtl' > 
              </Spin> : ' תוצאה:'
            }
             
            </div>
            </th>
          </tr>
        </tbody>
        </table>
            <TextArea value={this.state.output} id="gradeArea"/>
            
            <div className="chooseTask">
                <span className='chooseSpan'>בחר מטלה :  </span>
                <Select defaultValue="בחר מטלה"  onChange={handleChange}>
                {
                   (this.state.tasks) ?  this.state.tasks.map((task,idx) =>   
                    <Option  key = {idx} value = {task._id}>{task.title}</Option> ) 
                    : ''
                }       
                </Select>
                <br/>
                <br/>

                <Button type="primary" onClick={this.download}> הורד קבצים</Button>
                <Button type="primary" onClick={this.debuggerFunc}> פתרון כללי</Button>
                <Button type="primary"> פתרון שלי</Button>
            </div>
            <Dragger beforeUpload={this.beforeUpload} {...props} name='file'>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text"> גרור קבצים לכאן </p>
              <p className="ant-upload-hint">או לחץ להעלות קבצים</p>
            </Dragger>
            <div className="submissionBtn"> 
              <Button onClick={() => this.submission('practice')} type="primary">  הגשה במוד אימון</Button>
              <Button  onClick={() => this.submission('final')} type="primary"> הגשה סופית </Button>
            </div>
            {/* <NewExample setResult={this.setResult} /> */}
           
        </div>
        );
      }
    }
    
    export default Coursepage;
