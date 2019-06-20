import React, { Component } from "react";
import {
  InputNumber,
  Select,
  Modal,
  Button,
  IconUpload,
  message,
  Icon,
  Upload
} from "antd";
import "../../css/TestTable.css";

export default class TestTable extends Component {
  constructor(props) {
    super(props);
    console.log("props", this.props);

    this.state = {
      taskId: this.props.title,
      description: this.props.description,
      type: this.props.type,
      visibility: "",
      weight: Number,
      timeout: Number,
      visible: false,
      showInputOutout:false,
    };
  }

  componentDidMount(){
      console.log("props", this.props)
  }

  onSelectChange = e => {
    console.log("select:", e.key);
    this.setState({visibility: e.key});
    this.buildChild();
  };

  buildChild = () => {
      var child = {
          title: this.state.taskId,
          description: this.state.description,
          type: this.state.type,
          visibility: this.state.visibility,
          weight: this.state.weight,
          timeout: this.state.timeout,
      }
    this.props.updateParent(child);
  }

//   onSubmitTest = () => {
//     const data = form(mode,this.state.filesArray);
//     const selectedTaskId = this.state.selectedTask
//     const requestOptions = {
//       method: 'POST',
//       url: '/tasks/'+ selectedTaskId +'/submissions',
//       data,
//       'Content-Type': 'multipart/form-data',
//       headers: {
//           authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDb2xtYW5TdWJTeXN0ZW0iLCJzdWIiOiI1Y2ZlYmU4MzQwNDVhMTNiNGM0ODlkOWIiLCJpYXQiOjE1NjAyMzQ3NjcxNTcsImV4cCI6MTU2MDMyMTE2NzE1N30.rJvK9y7F5pXa1EEbxwSDWJPBfrNulPsiHIRmxfG0FDs'
//       }
//   }  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleChange = info => {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    this.setState({ fileList });
  };

  render() {
    const props = {
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      onChange: this.handleChange,
      multiple: true
    };
    const { Option } = Select;
    return (
      <parent>
        <div
          className="formDiv"
          style={{
            flexDirection: "row",
            display: "flex",
            textAlign: "left",
            margin: 3
          }}
        >
          <div style={{ width: "30%", textAlign: "left" }}>
            <label style={{ marginRight: 5, fontWeight: "bold" }}>
              {" "}
              Test name:
            </label>
            {this.state.taskId}
          </div>
          <div style={{ marginRight: 4 }}>
            <label style={{ marginRight: 4, fontWeight: "bold" }}>
              {" "}
              weight:
            </label>
            <InputNumber onChange={event => {
                this.setState({ weight: event })
                console.log("event: ", event)
                this.buildChild();
                }} />
          </div>
          <div style={{ marginLeft: 4 }}>
            <label style={{ fontWeight: "bold" }}>timeout:</label>
            <InputNumber
              onChange={event => {
                  this.setState({ timeout: event });
                  this.buildChild();
                }
            }
            />
          </div>
          <Select
            labelInValue
            defaultValue={{ key: "exposed" }}
            style={{ display: "flex", marginLeft: 7 }}
            onChange={e => this.onSelectChange(e)}
          >
            <Option value="exposed">exposed</Option>
            <Option value="hidden"> hidden </Option>
          </Select>
            {/* this.state.type===io */}
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

        </div>
      </parent>
    );
  }
}
