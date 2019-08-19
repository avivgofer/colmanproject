import { Form, Select, Radio, Button, Upload, Icon, Input } from "antd";
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
      selectedTask: "",
      title: "",
      compilationLine: "",
      description: "",
      type: "", //value="exe" or value="io", change it
      uploaded: [],
      showInputOutout: false,
      showExe: false,
    };
  }

  componentDidMount() {
    this.getTasks();
  }

  setTasksOptions = () => {
    console.log("set tasks");
    var x = document.getElementById("tasks");
    console.log("xxxx", x);
    var option = document.createElement("option");
     option.text = "Generic";
    console.log("option", option);
   // x.add(option);
    var tempTasks = this.state.tasks;
    tempTasks.forEach(task => {
      var option = document.createElement("option");
      option.text = task;
      x.add(option);
    });
  };

  getTasks = () => {
    const token = JSON.parse(localStorage.getItem('token')).replace('"','');
    
    const requestOptions = {
      //change to setItem or getItem of token
      method: "GET",
      url: "/tasks",
      "Content-Type": "application/json",
      headers: {
        authorization:
        token
      }
    };
    axios(requestOptions)
      .then(res => {
        var tasksList = res.data;
        console.log("res data", res.data);
        console.log("tests data from axios", tasksList);
        var tempTasks = [];
        tasksList.map(task => {
          tempTasks.push(task.title);
        });
        console.log("please", tempTasks);
        this.setState({ tasks: tempTasks });
        this.setTasksOptions();
      })
      .catch(err => {
        console.log(err);
      });
  };

  onTypeChange = event => {
    this.setState({ type: event.target.value });
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
  };
  onCompilationChange = event => {
    this.setState({ compilationLine: event.target.value });
  };
  onDescriptionChange = event => {
    this.setState({ description: event.target.value });
  };
  onSelectTask = event => {
    this.setState({ selectedTask: event.target.value });
  };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       console.log("Received values of form: ", values);
  //     }
  //   });

  //   const data = form(mode,this.state.filesArray);
  //   const selectedTaskId = this.state.selectedTask
  //   const requestOptions = {
  //     method: 'POST',
  //     url: ''/uploads/testUnit,
  //     data,
  //     'Content-Type': 'multipart/form-data',
  //     headers: {
  //         authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDb2xtYW5TdWJTeXN0ZW0iLCJzdWIiOiI1Y2ZlYmU4MzQwNDVhMTNiNGM0ODlkOWIiLCJpYXQiOjE1NjAyMzQ3NjcxNTcsImV4cCI6MTU2MDMyMTE2NzE1N30.rJvK9y7F5pXa1EEbxwSDWJPBfrNulPsiHIRmxfG0FDs'
  //     }
  // }
  // axios(requestOptions).then(res => {
  //   this.setState({isWaiting:false});
  // })
  // .catch(err => {//TODO something with result after deadline 
  //   this.setState({isWaiting:false});
  //   this.setResult(`something went wrong with your request!`)
  // })


  // };

  normFile = e => {
    this.setState({uploaded:e.fileList})
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
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
              <Form.Item label="Test:">
                {getFieldDecorator("title", {
                  rules: [{ required: true, message: "Please input a name!" }]
                })(
                  <Input
                    onChange={e => this.onTestTitleChange(e)}
                    style={{ width: "150%" }}
                  />
                )}
              </Form.Item>
              <Form.Item label="Task" hasFeedback style={{ marginLeft: 18 }}>
                <select
                  id="tasks" defaultValue="Generic" 
                  onChange={e => this.onSelectTask(e)}
                  style={{ width: 200, height: 30 }}
                ><option>
                  Generic
                </option>
                </select>
              </Form.Item>
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
                  <Radio value="io">main test</Radio>
                  <Radio value="exe">input-output test</Radio>
                </Radio.Group>
              )}
            </Form.Item>

            <Form.Item style={{ right: 65, height: 40 }} label="Upload">
              {getFieldDecorator("files", {
                valuePropName: "fileList",
                getValueFromEvent: this.normFile
              })(
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button>
                    <Icon type="upload" /> Upload Test
                  </Button>
                </Upload>
              )}
            </Form.Item>
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
