import { Upload, message, Button, Icon } from 'antd';
import React from 'react'
import Axios from 'axios';

class NewUpload extends React.Component {

    state = {
        files: [],
        isSent: false
    }
    get form() {
        let data = new FormData()
        data.append('mode', 'practice')
        this.state.files.map(file => data.append('solution_files', file))
        return data
    }
    componentDidMount() {
       
    }
        onChange = (info) => {
            const data = this.form
            console.log(data)
            console.log(this.state.files)
            const requestOptions = {
                method: 'POST',
                url: '/tasks/5cfeba9681b1f1212c0e47d5/submissions',
                data,
                'Content-Type': 'multipart/form-data',
                headers: {
                    authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDb2xtYW5TdWJTeXN0ZW0iLCJzdWIiOiI1Y2ZlYmU4MzQwNDVhMTNiNGM0ODlkOWIiLCJpYXQiOjE1NjAyMzQ3NjcxNTcsImV4cCI6MTU2MDMyMTE2NzE1N30.rJvK9y7F5pXa1EEbxwSDWJPBfrNulPsiHIRmxfG0FDs'
                }
            }
            console.log(this.state)
            if (!this.state.isSent) {
                this.setState({isSent: true})
                Axios(requestOptions).then(res => {
                    this.props.setResult(`${res.data.output}! grade:${res.data.grade}`)
                })
                .catch(err => {
                    debugger
                })

            }
        }

        beforeUpload = (file) => {
            const newFiles = this.state.files
            newFiles.push(file)
            this.setState({files: newFiles})
        }
    render() {
        return (
            <Upload 
                name='file'
                
                beforeUpload={this.beforeUpload}
                onChange={this.onChange}
                multiple={true}
            >
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>
        )
    }
}

export default NewUpload