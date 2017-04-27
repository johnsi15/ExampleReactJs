import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Es lo mismo que usar React.Component
class Gallery extends Component{
  render(){
    return(
      <section name="gallery">
          <h1>Gallery</h1>
          <Link to="/about">
            Go to about
          </Link>
      </section>
    )
  }
}

export default Gallery;