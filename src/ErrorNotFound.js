import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../src/css/ErrorNotFound.css'


class ErrorNotFound extends Component {

    render() {
        return (
            <div id='error'>
                <h1 className="notFoundTitle">Oops! That page can’t be found.</h1>
                <p className="notFoundDesc">
                        It looks like nothing was found at this location.
                        <h1>
                        <Link to='/'>Go Home</Link>
                        </h1>
                        
                       
                </p>
              
            </div>
        );
    }
}
export default ErrorNotFound