import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class ErrorNotFound extends Component {

    render() {
        return (
            <div id='error'>
                <h1 className="notFoundTitle">Oops! That page can’t be found.</h1>
                <p className="notFoundDesc">
                        It looks like nothing was found at this location.
                        Maybe try one of the links in the menu or press back to go to the previous page.
                        <h1>
                        <Link to='/'>Go Home</Link>
                        </h1>
                        
                       
                </p>
              
            </div>
        );
    }
}
export default ErrorNotFound