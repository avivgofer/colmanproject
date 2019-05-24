import React, { Component } from 'react';
import { Upload, Icon, message, Button } from 'antd';
 import '../css/AddCourse.css';
import { Input } from 'antd';



class AddCourse extends Component {
     constructor(props){
        super(props)
        this.state = {
          courseName: '',
          coursePathName: '',
          taskFile: '',
          taskCheckFile: '',
          tasks:[]
        };
        this.addCourse = this.addCourse.bind(this);
     }

     handleTask(evt){
        const tempTasks = [];
        tempTasks.push(evt.target.value);
        this.setState({
          tasks:tempTasks
        });
     }


     addCourse(){
       if(this.state.courseName && this.state.coursePathName)
       {
        var a = JSON.parse(localStorage.getItem('myData'));
        if(!a){
          a = [];
        }
        a.push(this.state);
        localStorage.setItem('myData', JSON.stringify(a));
        console.log(this.state);
        debugger;
        this.props.history.push('/admin')
       }
       else{
        message.error(`חסר נתונים!`);
       }
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
              console.log(`${info.file}`);
              message.success(`${info.file.name} file uploaded successfully.`);
              myThis.setState({
                taskFile:info.file
            });
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
        <span>שם הקורס בעברית</span>
        <div>
        
        <Input className='my-inputs' onChange={(evt) => { this.setState( {courseName:evt.target.value}) }} />
        </div>
        <span>שם הקורס באנגלית עבור הכתובת</span>
        <div>
        
        <Input className='my-inputs' onChange={(evt) => { this.setState( {coursePathName:evt.target.value}) }} />
        </div>
       
        <span>הוסף מטלה</span>
        <Dragger {...props} className='my-inputs'>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">הוסף מטלה</p>
              <p className="ant-upload-hint">ניתן לגרור לכאן</p>
            </Dragger>
            <span>שם המטלה</span>
        <div>
        
        <Input className='my-inputs' onChange={(evt) => { this.handleTask(evt) }} />
        </div>
        <span>הוסף בדיקה למטלה</span>
        <Dragger {...propsForCheckFile} className='my-inputs'>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">הוסף בדיקה למטלה</p>
              <p className="ant-upload-hint">ניתן לגרור לכאן</p>
            </Dragger>
            {/* <Link to='/admin'> */}
              <Button onClick={this.addCourse}>הוסף קורס</Button>
            {/* </Link> */}
            
        </div>
        );
      }
    }
    
    export default AddCourse;
