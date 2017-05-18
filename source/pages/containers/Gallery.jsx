import React from 'react';
import { Link } from 'react-router-dom';

// Es lo mismo que usar React.Component
function Gallery() {
  return (
    <section name="gallery">
      <h1>Gallery</h1>
      <Link to="/about">
          Go to about
      </Link>
    </section>
  );
}

export default Gallery;
