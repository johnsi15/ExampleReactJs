import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Es lo mismo que usar React.Component
class Post extends Component{
  render(){
    return(
      <section name="post">
          <h1>Post</h1>
          <Link to="/">
            Go to Home
          </Link>
      </section>
    )
  }
}

export default Post;