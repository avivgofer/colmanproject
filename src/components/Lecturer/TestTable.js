import React, { Component } from "react";
import {
  InputNumber,
  Select,
  Modal,
  Button,
  Row,
  Col,
  Icon,
  Upload
} from "antd";
import "../../css/TestTable.css";

export default class TestTable extends Component {
  constructor(props) {
    super(props);
    //console.log("props", this.props);

    this.state = {
      taskName: this.props.title,
      testId: this.props.testId,
      description: this.props.description,
      type: this.props.type,
      visibility: "",
      weight: Number,
      timeout: Number,
      visible: false,
      showInputOutout: false,
      testInputFileName: "",
      testOutputFileName: "",
      inputFilesArray: [],
      outputFilesArray: []
    };
  }

  componentDidMount() {
    console.log("propsassss", this.props);
  }

  onSelectChange = e => {
    //console.log("select:", e.key);
    this.setState({ visibility: e.key });
    this.buildChild();
  };

  buildChild = () => {
    var child = {
      title: this.state.taskName,
      description: this.state.description,
      type: this.state.type,
      visibility: this.state.visibility,
      weight: this.state.weight,
      timeout: this.state.timeout,
      inputArrayFiles: this.state.inputFilesArray,
      outputArrayFiles: this.state.outputFilesArray,
      testId: this.state.testId,
      testInputFileName: this.state.testInputFileName,
      testOutputFileName: this.state.testOutputFileName
    };
    this.props.updateParent(child);
  };

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

  beforeUploadInput = file => {
    this.setState({ testInputFileName: file.name });
    const newFiles = this.state.inputFilesArray;
    newFiles.push(file);
    this.setState({ inputFilesArray: newFiles });
  };

  beforeUploadOutput = file => {
    this.setState({ testOutputFileName: file.name });
    const newFiles = this.state.outputFilesArray;
    newFiles.push(file);
    this.setState({ outputFilesArray: newFiles });
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
    const Dragger = Upload.Dragger;
    const props = {
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      onChange: this.handleChange,
      multiple: true
    };
    const { Option } = Select;
    return (
      <parent>
        <Row type="flex">
          <Col xs={{ span: 3, offset: 1 }} lg={{ span: 3, offset: 0 }}>
            <label style={{ marginRight: 5, fontWeight: "bold" }}>
              {" "}
              Test name:
            </label>
            {this.state.taskName}
          </Col>
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 3, offset: 1 }}>
            <Row>
              <Col xs={{ span: 3, offset: 1 }} lg={{ span: 3, offset: 0 }}>
                <label style={{ marginRight: 4, fontWeight: "bold" }}>
                  {" "}
                  weight:
                </label>
              </Col>
              <Col xs={{ span: 3, offset: 1 }} lg={{ span: 3, offset: 8 }}>
                <InputNumber
                  onChange={event => {
                    this.setState({ weight: event });
                    this.buildChild();
                  }}
                />
              </Col>
            </Row>
          </Col>

          <Col xs={{ span: 4, offset: 1 }} lg={{ span: 3, offset: 1 }}>
            <Row>
              <Col xs={{ span: 3, offset: 1 }} lg={{ span: 3, offset: 0 }}>
                <label style={{ fontWeight: "bold" }}>timeout:</label>
              </Col>
              <Col xs={{ span: 3, offset: 1 }} lg={{ span: 2, offset: 8 }}>
                <InputNumber
                  onChange={event => {
                    this.setState({ timeout: event });
                    this.buildChild();
                  }}
                />
              </Col>
            </Row>
          </Col>

          <Col xs={{ span: 2, offset: 1 }} lg={{ span: 4, offset: 1 }}>
            <Select
              labelInValue
              defaultValue={{ key: "exposed" }}
              onChange={event => {
                this.setState({ visibility: event.key });
                console.log("this visibilityL : ", this.state.visibility);
                this.buildChild();
              }}
              style={{ width: 120 }}
            >
              <Option value="exposed">exposed</Option>
              <Option value="hidden"> hidden </Option>
            </Select>{" "}
          </Col>

          <Col xs={{ span: 1, offset: 1 }} lg={{ span: 1, offset: 1 }}>
            <Button
              type="primary"
              onClick={this.showModal}
              style={{ marginTop: 0}}
            >
              Upload i/o files
            </Button>
          </Col>

          <Modal
            title="Upload Input-Output files"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Row style={{ marginBottom: 10 }}>
              <Dragger
                beforeUpload={this.beforeUploadInput}
                {...props}
                name="file"
              >
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text"> Input גרור קבצי</p>
                <p className="ant-upload-hint">או לחץ להעלאת הקבצים</p>
              </Dragger>
            </Row>
            <Row>
              <Dragger
                beforeUpload={this.beforeUploadOutput}
                {...props}
                name="file"
              >
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Output גרור קבצי</p>
                <p className="ant-upload-hint">או לחץ להעלאת הקבצים</p>
              </Dragger>
            </Row>
          </Modal>
        </Row>
      </parent>
    );
  }
}
