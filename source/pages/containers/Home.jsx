import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Post from '../../posts/containers/Post.jsx';

import api from '../../api.js';

// Es lo mismo que usar React.Component
class Home extends Component{
  constructor(props){
    super(props);

    this.state = {
      page: 1,
      posts: [],
      loading: true,
    };
  }

  async componentDidMount(){
    const posts = await api.posts.getList(this.state.page);

    //con esto enviamos los posts el numero de paginas y el loading
    this.setState({
      posts,
      page: this.state.page + 1,
      loading: false,
    })
  }

  render(){
    return(
      <section name="Home">
          <h1>Home</h1>
          <section>
          
            {this.state.loading && (
              <h2>loading posts...</h2>
            )}

            {this.state.posts
              .map(post => <Post key={post.id} {...post} />
            )}
          </section>
          <Link to="/about">
            Go to about
          </Link>
      </section>
    )
  }
}

export default Home;