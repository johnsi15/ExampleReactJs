import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Es lo mismo que usar React.Component
class Profile extends Component{
  render(){
    return(
      <section name="profile">
          <h1>Profile</h1>
          <Link to="/about">
            Go to about
          </Link>
      </section>
    )
  }
}

export default Profile;