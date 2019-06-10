import React, { Component } from 'react';
import logo from '../images/colmanLogo.png';
import '../css/Header.css';
import { Button } from 'antd';
import axios from 'axios';

class Header extends Component {

  updateDB = (idToUpdate, updateToApply) => {
  var tempCourse = {
    title : 'tempCourseName',
    year : 1999
  }

    axios.post('http://localhost:3000/', {
    title: ' sd',
    year:1992,
      // id: '5ceb86731c9d44000061301b',
      // update: { message: updateToApply },
    });
  };


  render() {
    return (
      <div>
        <header>
          <div className="headerContainer">
            <div className="imgBox">
              <img src={logo} className="Colman-logo" alt="logo" />
            </div>
            <div className="hBox">
              <div className="text">
                <h1>בית הספר למדעי המחשב</h1>
              </div>
              <div className="text">
             {/*  */}
                <h2>מערכת בדיקות אוטומטית</h2>
                </div>
              </div>
              
          </div>
        </header>
      </div>
        );
      }
    }
    
    export default Header;
