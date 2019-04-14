import React, { Component } from 'react';
import logo from '../images/colmanLogo.jpeg';
import '../css/Header.css';

class Header extends Component {
  render() {
    return (
      <div>
        <header>
          <div className="container">
            <div className="imgBox">
              <img src={logo} className="Colman-logo" alt="logo" />
            </div>
            <div className="hBox">
              <div className="text">
                <h1>בית הספר למדעי המחשב</h1>
              </div>
              <div className="text">
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
