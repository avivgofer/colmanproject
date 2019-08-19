import { Transfer, Button } from "antd";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

export default class TransferTests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mockData: [],
      targetKeys: [],
      testUnitArray: [],
      genericTestArray: [],
      finalSelected: [],
      mockDataTets: [
        { key: 0, title: "content1", content: "content1" },
        { key: 1, title: "content2", content: "content1" },
        { key: 2, title: "content3", content: "content1" },
        { key: 3, title: "content4", content: "content1" }
      ],
    };
  }

  componentDidMount() {
    this.getAlltests();
    //console.log("stateeeeeee:", this.state)
  }

  
  getAlltests = () => {
    const requestOptions = {
      //change to setItem or getItem of token
      method: "GET",
      url: "/testUnit",
      "Content-Type": "application/json",
      headers: {
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDb2xtYW5TdWJTeXN0ZW0iLCJzdWIiOiI1Y2ZlODYzYTE1YTMwZjI5M2NkNjBkMzgiLCJpYXQiOjE1NjA5NDk3MjMwMTAsImV4cCI6MTU2MTAzNjEyMzAxMH0.4d-s4FQklpcBD1zeTPfCUIHc7-pNk_A5IXMIsJlXfu0"
      }
    };
    axios(requestOptions)
      .then(res => {
        var temp = [];
        res.data.map(test => {
          temp.push({
            title: test.title+':=:'+test._id, /////
            description: test.description,
            type: test.type
          });
        });
        //console.log("temp: ", temp);
        this.getMock(temp);

        this.setState({testUnitArray:temp});
       // console.log("this teset unit:" , this.state.testUnitArray)
      })
      .catch(err => {
        console.log(err);
      });
  };

  getMock = (allTestUnits) => {
    //console.log("get mock", this.state.mockData);
    const targetKeys = [];
    const mockData = [];
    console.log("lent=", allTestUnits.length);
    for (let i = 0; i < allTestUnits.length; i++) {
        const testUnit = {
            key: i.toString(),
            testId: (allTestUnits[i].title.toString().split(':=:'))[1],
            title: (allTestUnits[i].title.toString().split(':=:'))[0],
            description: allTestUnits[i].description,
            type: allTestUnits[i].type,
    };
    //console.log("check mock", testUnit);
      targetKeys.push(testUnit.key);
      mockData.push(testUnit);
      //console.log("check mock 2", mockData);

    }
    this.setState({ mockData, targetKeys });
  };

  handleChange = targetKeys => {
    //console.log("targetKeys:", targetKeys);
    this.setState({ targetKeys });
    var selectedTests = this.state.mockData.filter(testUnit => {
      return !((targetKeys.indexOf(testUnit.key.toString()) > -1 ));
    });
    //console.log("selected",selectedTests)
    this.setState({finalSelected: selectedTests});
    this.props.updateTable(selectedTests);
};

  render() {
    return (
      <Transfer
        dataSource={this.state.mockData}
        showSearch
        listStyle={{
          width: 400,
          height: 250
        }}
        operations={["החזר", "בחר בדיקות למבחן"]}
        targetKeys={this.state.targetKeys}
        onChange={this.handleChange}
        render={item => `${item.title}-${item.description}`}
      />
    );
  }
}

ReactDOM.render(<TransferTests />, document.getElementById("root"));
