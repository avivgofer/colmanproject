import React, { Component } from 'react';
import  Coursebox  from './Coursebox';
import { Link } from 'react-router-dom'
import '../css/CoursesT.css';
import { Button ,Icon} from 'antd';
import axios from 'axios';




class CoursesT extends Component {
     constructor(props){
        super(props)
        this.state = {
            // courses: this.getCoursesT()c
          courses: ''
        };
        this.deleteCourse = this.deleteCourse.bind(this);
       // this.getCoursesT = getCoursesT.bind(this);
        
     }
     componentDidMount() {
        this.checkUser();
        this.getCoursesDB();
     }
      checkUser() {
       
      }

      getCoursesDB(){
           
      axios.get('http://localhost:3000/courses')
      .then((res) =>{
       this.setState({courses: res.data}) 
   });  

      }

      deleteCourse(value){
            const auth = JSON.parse(localStorage.getItem('token'));
            axios
            .delete("http://localhost:3000/courses/" + value._id, {headers: {authorization: auth}})
            .then((response) => {
              window.location.reload();
            })
            .catch(err => {//return 404 but its working !!! TODO
              window.location.reload();
                return null;
            });
            
        }
      getCoursesT() {
        return JSON.parse(localStorage.getItem('myData'));
       }
      handleClick() {
          console.log('this is:', this);
       }
  render() {
    
    return (
        <div className='Container'>
        <div>
        <Link to='/admin/addCourse'>
        <Button >הוסף קורס</Button>
        </Link>
        </div>
        
        <div className='courses'>
            {
              this.state.courses ?
                this.state.courses.map(
                (course , idx) =>  
                  (
                    <div key={idx+2}>
                      <Icon value={course} onClick={() => {if(window.confirm('Are you sure? Delete item?')) {this.deleteCourse(course)}}}
                       type="delete" key={idx+1} />
                       <Link to={'/admin/'+course.title} key= {course._id}> 
                      <Coursebox onClick={this.handleClick} course = {course} key = {idx} />
                      </Link>
                    </div>
                  )
                )   
                : ''                                                 
            }
        </div>
        </div>
        );
      }
    }
    
    export default CoursesT;