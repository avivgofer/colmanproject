import React, { Component } from "react";
import { Table, Button } from "antd";
import ReactDOM from "react-dom";
import TestTable from "./TestTable";
import TransferTests from "./TransferTests";
import { FORK } from "@blueprintjs/icons/lib/esm/generated/iconNames";
import axios from "axios";
import { templateElement } from "babel-types";
import { Select ,Spin } from 'antd';


class TestComposition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allListedChildren:[],
      test: "test test 1", //testUnitTitle
      selectedTest: [],
      tasks:[],
      selectedTask:'',
      mode:'',
      inputFilesArray: [],
      outputFilesArrat: [],
    };
  }

  
  componentDidMount() {
     this.getTasks();
  }



  getTasks = () => {
    var self = this;
    const auth = JSON.parse(localStorage.getItem('token')).replace('"','');
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

 form = ( ioTests, mainTests) => {
  let data = new FormData()
  if(mainTests!=null){
    
  data.append('mainTests', JSON.stringify(mainTests));
  }
  if(ioTests!=null) {
  data.append('ioTests', JSON.stringify(ioTests));
  }

  data.append('taskId', this.state.selectedTask)
  data.append('mode', this.state.mode);
  if(this.state.allListedChildren[0].inputArrayFiles.length != 0) {
    
    data.append('input_files', this.state.allListedChildren[0].inputArrayFiles);
     data.append('output_files', this.state.allListedChildren[0].outputArrayFiles);
    }
  // if(this.state.allListedChildren[0].inputArrayFiles!= undefined )
  // {
  //   data.append('input_files', this.state.allListedChildren[0].inputArrayFiles);
  //   data.append('output_files', this.state.allListedChildren[0].outputArrayFiles);
  // }



  return data;
}

  onClickSubmitForm = () => {

    var mainTests = [];
    var ioTests = [];
    var tempMainTest = {
      test: '',
      visibility: 'hidden',
      weight: '',
      timeout: '',
    }
    var tempIoTest = {
      test: '',
      visibility: 'hidden',
      weight: '',
      timeout: '',
      input:[],
      output: [],
    }
    var tempThis = this;

    var temp = tempThis.state.allListedChildren;
    for(let i=0; i<temp.length;i++){
        if(temp[i].type==='mainTestUnit') {
     
            tempMainTest = {
              test: temp[i].testId,
              visibility: 'hidden',
              weight: temp[i].weight,
              timeout: temp[i].timeout,
            }
            console.log('child: ', temp[i]);
            mainTests.push(tempMainTest);
        }

        if(temp[i].type==='ioTestUnit'){
          tempIoTest = {
            test: temp[i].testId,
            visibility: 'hidden',
            weight: temp[i].weight,
            timeout: temp[i].timeout,
            input: temp[i].testInputFileName,
            output: temp[i].testOutputFileName,
          }
          console.log('child: ', temp[i]);
          ioTests.push(tempIoTest);
      }
    }
    const data = this.form( ioTests, mainTests);
    console.log(tempThis.state.inputFilesArray);
    console.log(tempThis.state.outputFilesArray);
    

    console.log('Form Data Structure: ', data);
    const requestOptions = {
      method: 'POST',
      url: '/test',
      data,
      'Content-Type': 'multipart/form-data',
      headers: {
          authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDb2xtYW5TdWJTeXN0ZW0iLCJzdWIiOiI1Y2ZlODYzYTE1YTMwZjI5M2NkNjBkMzgiLCJpYXQiOjE1NjYwNzU0Mjk5MDksImV4cCI6MTU2NjE2MTgyOTkwOX0.3T_9g45gfqSzFH5PVcyA_dGLnBulN7OOZVp9GdeUs2g"
       }
      }
      axios(requestOptions).then(res => {
      console.log(res);
      })
      .catch(err => {//TODO something with result after deadline 
        console.log(err);
      })
  };
  
  updateChild = (child) => {
    console.log('chillllld', child);
    var temp = this.state.allListedChildren;
    for(let i=0; i<temp.length;i++){
        if(temp[i].title===child.title){
            temp[i]=child;
            this.setState({allListedChildren:temp});
            this.setState({inputFilesArray: child.inputFilesArray});
            this.setState({outputFilesArrat: child.outputFilesArray});
            console.log("these are my children: ", this.state.allListedChildren);
  
            return;
        }
    }
    temp.push(child);
  }

  //for passing props only
  onSubmitTest = (testUnitInput) => {
    var tempTestUnitInput =[];
    tempTestUnitInput.push(testUnitInput);
  }

  onSelectModeChange = (e) => {
    
  }

  renderAlltests = (selectedTestArray) => {
    //console.log("selected father:", selectedTestArray);
    const tests = selectedTestArray ? selectedTestArray : [];
    var tempSelectedTests = [];
    tests.map(test => tempSelectedTests.push(
    <TestTable title={test.title} description={test.description} testId={test.testId}
    type={test.type} sendInput={this.onSubmitTest} updateParent={this.updateChild} />));
    this.setState({ selectedTest: tempSelectedTests });
  };

  render() {
    const Option = Select.Option;
    const myThis = this;

    function handleChange(value) {
      myThis.setState({
        selectedTask : value
      });
      console.log(`selected ${value}`);
    }

    function onSelectModeChange(value) {
      myThis.setState({mode: value});
      console.log(`selected mode ${value}`);

    }
    return (
      <div>
        <div
          className="formDiv"
          style={{ width: "100", display: "flex", marginBottom: 10, justifyContent:"center" }}
        >
          <div style={{ float: "center", textAlign:"center" }}>
            <span
              className="ant-form-text"
              id="Course"
              style={{ fontWeight: "bold", fontSize: 22}}
            >
              :הרכבת מבחן
            </span>

            <div className="chooseTask" style={{marginTop: 15}}>
                <Select defaultValue="Select Task"  onChange={handleChange}>
                {
                   (this.state.tasks) ?  this.state.tasks.map((task,idx) =>   
                    <Option  key = {idx} value = {task._id}>{task.title}</Option> ) 
                    : ''
                }       
                </Select>
                <Select defaultValue="Select Mode"  onChange={onSelectModeChange}>
                <Option value = "final"> final mode </Option>  
                <Option value = "practice"> practice mode </Option>  
                </Select>
            </div>

            

            <div style={{ marginTop: 25 }}>
              <TransferTests updateTable={this.renderAlltests} />
              <div style={{ marginTop: 33 }}>{this.state.selectedTest}</div>
            </div>
            <Button type="primary" htmlType="submit" onClick={this.onClickSubmitForm}>
                שלח
              </Button>
          </div>
        </div>
        <div style={{ float: "center", background: "red" }} />
      </div>
    );
  }
}
export default TestComposition;
