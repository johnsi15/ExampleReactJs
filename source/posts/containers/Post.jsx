import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import api from '../../api.js';

class Post extends Component{
  constructor(props){
    super(props);

    this.state = {
      loading: true,
      user: props.user || null,
      comments: [],
    };
  }

  async componentDidMount(){
    const [
      user,
      comments,
    ] = await Promise.all([
      !this.state.user ? api.users.getSingle(this.props.userId) : Promise.resolve(this.state.user),
      api.posts.getComments(this.props.id),
    ]);

    this.setState({
      loading: false,
      user,
      comments,
    })
  }

  render(){
    return(
      <article id={`post-${this.props.id}`}>
        <h2> {this.props.title} </h2>
        <p>
          {this.props.body}
        </p>

        {!this.state.loading && (
          <div>
            <Link to={`/user/${this.state.user.id}`}>
              {this.state.user.name}
            </Link>
            <span>
              hay {this.state.comments.length} comentarios
            </span>
          </div>
        )}
      </article>
    )
  }
}

Post.propTypes= {
  id: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
};

export default Post;
