import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Es lo mismo que usar React.Component
class Error404 extends Component{
  render(){
    return(
      <section name="Error404">
          <h1>Error 404</h1>
          <Link to="/">
            Go back home
          </Link>
      </section>
    )
  }
}

export default Error404;