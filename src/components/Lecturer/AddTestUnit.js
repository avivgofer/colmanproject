import {Col, Row, Form, Select, Radio, Button, Upload, Icon, Input } from "antd";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../css/AddTestUnit.css";
import axios from "axios";

const { Option } = Select;

class AddTestUnit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      selectedTask: "5cfeba9681b1f1212c0e47d5",
      title: "",
      compilationLine: "",
      description: "",
      type: "", //value="exe" or value="io", change it
      filesArray: [],
      showInputOutout: false,
      showExe: false,
    };
  }

  componentDidMount() {
    this.getTasks();
   // this.setTasksOptions();
  }


  //for tasks
  setTasksOptions = () => {
    console.log("set tasks");
    var x = document.getElementById("tasks");
    console.log("xxxx", x);
    var option = document.createElement("option");
     option.text = "Generic";
    console.log("option", option);
   // x.add(option);
    var tempTasks = this.state.tasks;
    console.log('temps tasls:' , tempTasks[0]);
    var option = document.createElement("option");
    option.text = tempTasks[0];
    x.add(option);
    console.log('x', x);

    // tempTasks.forEach(task => {
    //   console.log('foreach')
    //   console.log('one task: ', task);
    //   var option = document.createElement("option");
    //   option.text = task;
    //   x.add(option);
    //   console.log("tasks option: ", this.state.tasks);
    // });
    console.log('finished')
    
  };

  form = ( filesArray,title,description, compilationLine, task, type) => {
    let data = new FormData()
    data.append('test_file', filesArray[0]);
    data.append('title',title);
    data.append('description', description);
    data.append('compilationLine', compilationLine);
    data.append('task', task);
    data.append('type', type);
    
    return data;
  }


  getTasks = () => {
    var self = this;
    const auth = JSON.parse(localStorage.getItem('token'));
    if(auth){
      auth.replace('"','');
    }
    const tempAuth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDb2xtYW5TdWJTeXN0ZW0iLCJzdWIiOiI1Y2ZlYmU4MzQwNDVhMTNiNGM0ODlkOWIiLCJpYXQiOjE1NjA2NjU1NDcyMzgsImV4cCI6MTU2MDc1MTk0NzIzOH0.vGquvDnwfDV4vKUZHRSJWUiPod5QXmlI9Q24yXyvBS0";
    const header = {
      headers: {
        authorization: auth
      }
  }// + this.props.location.state.course.tasks
    axios
        .get("http://localhost:3000/tasks/", {headers: {authorization: auth}})
        .then((response) => {
          response.data.map((task) => {
              var tempTasks = self.state.tasks;
              tempTasks.push(task);
              self.setState({tasks:tempTasks});
          });
        })
        .catch(err => {
            console.log(err);
            return null;
        });
 };


//   getTasks = () => {
//     console.log('GET TASKS');
//     const auth = JSON.parse(localStorage.getItem('token')).replace('"','');
//     const tempAuth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDb2xtYW5TdWJTeXN0ZW0iLCJzdWIiOiI1Y2ZlYmU4MzQwNDVhMTNiNGM0ODlkOWIiLCJpYXQiOjE1NjA2NjU1NDcyMzgsImV4cCI6MTU2MDc1MTk0NzIzOH0.vGquvDnwfDV4vKUZHRSJWUiPod5QXmlI9Q24yXyvBS0";
//     const header = {
//       headers: {
//         authorization: auth
//       }
//   }
//     axios
//         .get("/tasks", {headers: {authorization: auth}})
//         .then((response) => {
//           var tempTasks = this.state.tasks;

//           response.data.map((task) => {
//               // var tempTasks = this.state.tasks;
//               tempTasks.push(task.title);
//               console.log('tsmp tasks', tempTasks);
//               // return tempTasks;
//           });
//           this.setState({tasks:tempTasks});
//           console.log('state', this.state.tasks);
//         })
//         .catch(err => {
//             console.log(err);
//             return null;
//         });
//  };

  //
  onTypeChange = event => {
    this.setState({ type: event.target.value });
    console.log('type: ', this.state.type);
    // if(event.target.value==='input-output'){ //change input-output
    //   this.setState({showInputOutout:true});
    //   this.setState({showExe:false});
    // }else if(event.target.value==='exe'){
    //   this.setState({showExe:true})
    //   this.setState({showInputOutout:false});
    // }
  };
  onTestTitleChange = event => {
    this.setState({ title: event.target.value });
    console.log('tilte changed: ', this.state.title);

  };
  onCompilationChange = event => {
    this.setState({ compilationLine: event.target.value });
    console.log('compilation changed: ', this.state.compilationLine);

  };
  onDescriptionChange = event => {
    this.setState({ description: event.target.value });
    console.log('decription changed: ', this.state.description);
  };
  onSelectTask = event => {
    this.setState({ selectedTask: event.target.value });
  };

  handleSubmit = e => {
    console.log("handle sumbit")
    const data = this.form(this.state.filesArray, this.state.title, this.state.description, this.state.compilationLine
      ,"5cfeba9681b1f1212c0e47d5", this.state.type);
    const requestOptions = {
      method: 'POST',
      url: '/testUnit/uploads/testUnit',
      data,
      'Content-Type': 'multipart/form-data',
      headers: {
          authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDb2xtYW5TdWJTeXN0ZW0iLCJzdWIiOiI1Y2ZlYmU4MzQwNDVhMTNiNGM0ODlkOWIiLCJpYXQiOjE1NjAyMzQ3NjcxNTcsImV4cCI6MTU2MDMyMTE2NzE1N30.rJvK9y7F5pXa1EEbxwSDWJPBfrNulPsiHIRmxfG0FDs'
       }
      }
      console.log('axios');
      axios(requestOptions).then(res => {
      console.log(res);
      })
      .catch(err => {//TODO something with result after deadline 
        console.log(err);
      })
  };

  beforeUpload = (file) => {
    const newFiles = this.state.filesArray
    newFiles.push(file)
    this.setState({filesArray: newFiles})
}

  // normFile = e => {
  //   this.setState({uploaded:e.fileList[0]}) //e.fileList
  //   console.log("Upload event:", e.fileList[0]);
  //   console.log("state: ", this.state);
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e && e.fileList;
  // };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    const myThis = this;

    function handleChange(value) {
      myThis.setState({
        selectedTask : value
      });
      console.log(`selected ${value}`);
    }

    const Dragger = Upload.Dragger;
    const props = {
       name: 'file',
       multiple: true,
       action: '//jsonplaceholder.typicode.com/posts/'
      };
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Form.Item style={{ float: "center", textAlign: "center" }}>
              <span
                className="ant-form-text"
                id="Course"
                style={{ fontWeight: "bold", fontSize: 22 }}
              >
                Upload Unit Test
              </span>
            </Form.Item>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Col>
              <Form.Item label="Test:">
                {getFieldDecorator("title", {
                  rules: [{ required: true, message: "Please input a name!" }]
                })(
                  <Input
                    onChange={e => this.onTestTitleChange(e)}
                    style={{ width: "150%"}}
                  />
                )}
              </Form.Item>
              </Col>
              <Col>
              <Form.Item  style={{marginLeft:40}}>
              <Select defaultValue="Choose task"  onChange={handleChange} style={{marginLeft:7}}>
                {
                   (this.state.tasks) ?  this.state.tasks.map((task,idx) =>   
                    <Option  key = {idx} value = {task._id}>{task.title}</Option> ) 
                    : ''
                }       
                </Select>
                </Form.Item>
                </Col>
              {/* <Form.Item label="Task" hasFeedback style={{ marginLeft: 18 }}>
                <select
                  id="tasks" defaultValue="Generic" 
                  onChange={e => this.onSelectTask(e)}
                  style={{ width: 200, height: 30 }}
                ><option>
                  Generic
                </option>
                </select>
              </Form.Item> */}
            </div>
            <div style={{ float: "left" }}>
              <Form.Item style={{ right: 65 }} label="Compilation: ">
                {getFieldDecorator("compilationLine   ", {
                  rules: [
                    {
                      required: true,
                      message: "Please input compilation line!"
                    }
                  ]
                })(
                  <Input
                    onChange={e => this.onCompilationChange(e)}
                    style={{ width: "160%" }}
                  />
                )}
              </Form.Item>
            </div>

            <Form.Item style={{ right: 65 }} label="Description:">
              {getFieldDecorator("description")(
                <Input
                  onChange={e => this.onDescriptionChange(e)}
                  style={{ width: "160%" }}
                />
              )}
            </Form.Item>
            <Form.Item style={{ right: 65 }} label="Type">
              {getFieldDecorator("type", {
                rules: [{ required: true, message: "Please select type!" }]
              })(
                <Radio.Group onChange={event => this.onTypeChange(event)}>
                  <Radio value="mainTestUnit">main test</Radio>
                  <Radio value="ioTestUnit">input-output test</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          
            <Dragger beforeUpload={this.beforeUpload} {...props} name='file'>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text"> גרור קבצי בדיקה לכאן </p>
              <p className="ant-upload-hint">או לחץ להעלות קבצים</p>
            </Dragger>
            
            <div className="form-group" style={{marginTop:79,width:"100%"}}>
              {this.state.showInputOutout ? (
                <parent>
                  <div style={{flexDirection:"row", flex:"right"}}>
                <Upload >
                  <Button style={{ fontWeight: "bold", width: "48", margin:4}}>
                    <Icon type="upload" /> input הוסף קבצי 
                  </Button>
                </Upload>
                <Upload>
                  <Button style={{ fontWeight: "bold", width: "48", marginTop:2 }}>
                    <Icon type="upload" /> expected output הוסף קבצי
                  </Button>
                </Upload>
                    </div>
                </parent>
              ) : null}

              {this.state.showExe ? (
                <Upload>
                  <Button style={{ fontWeight: "bold", width: "60", float:"right"}}>
                    <Icon type="upload" /> exe הוסף קבצי
                  </Button>
                </Upload>
              ) : null}

            </div>
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    );
  }
}

const WrappedAddTestUnit = Form.create({ name: "validate_other" })(AddTestUnit);

ReactDOM.render(<WrappedAddTestUnit />, document.getElementById("root"));

export default WrappedAddTestUnit;

// import React, { Component } from "react";
// import {
//   Form,
//   Input,
//   Tooltip,
//   Icon,
//   Cascader,
//   Select,
//   Row,
//   Col,
//   Checkbox,
//   Button,
//   AutoComplete,
//   Radio,
//   Upload
// } from "antd";
// import ReactDOM from "react-dom";
// import "../../css/AddTest.css";
// import { wrap } from "module";

// // test_file:
// // title:String
// // description:String
// // compilationLine:String
// // task:taskId
// // type:'practice'/'final'

// class AddTestUnit extends Component {
//   constructor(props) {
//     super(props);
//     console.log("props", this.props);
//     this.state = {
//       title: "",
//       description: "",
//       compilationLine: "",
//       task: "",
//       type: "", //practice/final
//       files: "",
//       points: "" //remove?
//     };

//     // this.props.addedComponents.push(this); //for sumbitting form values from father
//   }

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.form.validateFieldsAndScroll((err, values) => {
//       if (!err) {
//         console.log("Received values of form: ", values);
//       }
//     });
//   };

//   render() {
//     function onChange(value) {
//       console.log(`selected ${value}`);
//     }

//     function onBlur() {
//       console.log('blur');
//     }

//     function onFocus() {
//       console.log('focus');
//     }

//     function onSearch(val) {
//       console.log('search:', val);
//     }
//     const { Option } = Select;
//     const { getFieldDecorator } = this.props.form;

//     const formItemLayout = {
//       labelCol: {
//         xs: { span: 24 },
//         sm: { span: 8 }
//       },
//       wrapperCol: {
//         xs: { span: 24 },
//         sm: { span: 16 }
//       }
//     };
//     const tailFormItemLayout = {
//       wrapperCol: {
//         xs: {
//           span: 24,
//           offset: 0
//         },
//         sm: {
//           span: 16,
//           offset: 8
//         }
//       }
//     };

//     return (
//       <parent>
//         <div className="formDiv">
//           <Form layout="inline"
//             {...formItemLayout}
//             onSubmit={this.handleSubmit}
//             style={{ width: "70%"}}
//           >
//             <Form.Item label="Compilation: " style={{marginLeft:12}}>
//               {getFieldDecorator("compilationLine", {
//                 rules: [
//                   {
//                     required: true,
//                     message: "Please input compilation line!"
//                   }
//                 ]
//               })(<Input style={{margin:2, width:"225%"}}/>)}
//             </Form.Item>

//             <div style={{ flexDirection: "row"}}>
//               <Form.Item
//                 label="Test name"
//                 style={{ width: "46%", marginRight:20}}
//               >
//                 {getFieldDecorator("title", {
//                   rules: [
//                     {
//                       required: true,
//                       message: "Please input the name of the test!"
//                     }
//                   ]
//                 })(<Input />)}
//               </Form.Item>

//               <Form.Item style={{ width: "45%"}}>
//                 <Select
//                   showSearch
//                   style={{ width: 200 }}
//                   placeholder="Select a task"
//                   optionFilterProp="children"
//                   onChange={onChange}
//                   onFocus={onFocus}
//                   onBlur={onBlur}
//                   onSearch={onSearch}
//                   filterOption={(input, option) =>
//                     option.props.children
//                       .toLowerCase()
//                       .indexOf(input.toLowerCase()) >= 0
//                   }
//                 >
//                   <Option value="generic">Generic</Option>
//                 </Select>
//               </Form.Item>
//               <Form.Item label="Description: " style={{marginLeft:15}}>
//               {getFieldDecorator("compilationLine", {
//                 rules: [
//                   {
//                   }
//                 ]
//               })(<Input style={{margin:2, width:"240%"}}/>)}
//             </Form.Item>
//             </div>
//             <div>
//               <Form.Item
//                 label="Type"
//                 style={{ width: "50%", display: "inline-block", float:"left"}}
//               >
//                 {getFieldDecorator("radio-group",{rules: [
//                     {
//                       required: true,
//                       message: "Please input the type!"
//                     }
//                   ]})(
//                   <Radio.Group>
//                     <Radio value="a"> exe </Radio>
//                     <Radio value="b"> input-output</Radio>
//                   </Radio.Group>
//                 )}
//               </Form.Item>
//               <div style={{display:"inline-block"}}>
//               <Form.Item>
//                 <Upload>
//                   <Button style={{ width: "48", margin: 4 }}>
//                     <Icon type="upload" /> upload files
//                   </Button>
//                 </Upload>
//               </Form.Item>
//               </div>
//               <div>
//               <Form.Item {...tailFormItemLayout}>
//               <Button type="primary" htmlType="submit">
//                 Register
//               </Button>
//             </Form.Item>
//                     </div>

//             </div>
//           </Form>
//         </div>
//       </parent>
//     );
//   }
// }
// const WrappedAddTestUnit = Form.create({ name: "register" })(AddTestUnit);

// ReactDOM.render(<WrappedAddTestUnit />, document.getElementById("root"));

// export default WrappedAddTestUnit;
