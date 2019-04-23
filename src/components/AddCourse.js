import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
 import '../css/AddCourse.css';
import { Input } from 'antd';
//window.location.pathname.split('/')[2]



class AddCourse extends Component {
     constructor(props){
        super(props)
        this.state = {
          course: ''
        };
     }

  render() {
  
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
        <span>שם הקורס בעברית</span>
        <div>
        
        <Input className='my-inputs'/>
        </div>
        <span>שם הקורס באנגלית עבור הכתובת</span>
        <div>
        
        <Input className='my-inputs'/>
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
        
        <Input className='my-inputs'/>
        </div>
        <span>הוסף בדיקה למטלה</span>
        <Dragger {...props} className='my-inputs'>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">הוסף בדיקה למטלה</p>
              <p className="ant-upload-hint">ניתן לגרור לכאן</p>
            </Dragger>
         
        </div>
        );
      }
    }
    
    export default AddCourse;
