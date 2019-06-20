import React, { Component } from "react";
import { Table, Button } from "antd";
import ReactDOM from "react-dom";
import TestTable from "./TestTable";
import TransferTests from "./TransferTests";
import { FORK } from "@blueprintjs/icons/lib/esm/generated/iconNames";
import axios from "axios";
import { templateElement } from "babel-types";

class TestComposition extends Component {
  constructor(props) {
    super(props);
    this.state = {
        allListedChildren:[],
      test: "test test 1", //testUnitTitle
      selectedTest: [],
      tasks:[],

    };
  }
  
  componentDidMount() {
     // this.getTasks();
  }

  getTasks = () => {
    const requestOptions = {
      //change to setItem or getItem of token
      method: "GET",
      url: "/tasks",
      "Content-Type": "application/json",
      headers: {
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDb2xtYW5TdWJTeXN0ZW0iLCJzdWIiOiI1Y2ZlODYzYTE1YTMwZjI5M2NkNjBkMzgiLCJpYXQiOjE1NjA5NDk3MjMwMTAsImV4cCI6MTU2MTAzNjEyMzAxMH0.4d-s4FQklpcBD1zeTPfCUIHc7-pNk_A5IXMIsJlXfu0"
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

  onClickSubmitForm = () => {
      //send allListedChildren

      {
        const token = JSON.parse(localStorage.getItem('token')).replace('"','');
        const requestOptions = {
          
          //change to setItem or getItem of token
          //for loop if its req for one obj
          method: "POST",
          url: "/test",
          "Content-Type": "application/json",
          headers: {
            authorization:
             token
          }
        };
        axios(requestOptions)
          .then(res => {
              console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      };
  }
  
  updateChild = (child) => {
    var temp = this.state.allListedChildren;
    for(let i=0; i<temp.length;i++){
        if(temp[i].title===child.title){
            temp[i]=child;
            this.setState({allListedChildren:temp});
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

  renderAlltests = (selectedTestArray) => {
    console.log("selected father:", selectedTestArray);
    const tests = selectedTestArray ? selectedTestArray : [];
    var tempSelectedTests = [];
    tests.map(test => tempSelectedTests.push(<TestTable title={test.title} description={test.description} type={test.type} sendInput={this.onSubmitTest} updateParent={this.updateChild} />));
    this.setState({ selectedTest: tempSelectedTests });
  };

  render() {
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
