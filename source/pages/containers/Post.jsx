import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PostBody from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';
import Comment from '../../comments/components/Comment';

import api from '../../api';

// Es lo mismo que usar React.Component
class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: {},
      post: {},
      comments: [],
    };
  }

  async componentDidMount() {
    this.initialFecth();
  }

  async initialFecth() {
    const [
      post,
      comments,
    ] = await Promise.all([
      api.posts.getSingle(this.props.match.params.id),
      api.posts.getComments(this.props.match.params.id),
    ]);

    const user = await api.users.getSingle(post.userId);

    this.setState({
      loading: false,
      post,
      user,
      comments,
    });
  }
  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <section name="post">
        <PostBody
          {...this.state.post}
          user={this.state.user}
          comments={this.state.comments}
        />
        <section>
          {this.state.comments
            .map(comment => (
              <Comment key={comment.id} {...comment} />
            ))
          }
        </section>
      </section>
    );
  }
}

Post.propTypes = {
  match: PropTypes.number,
};

export default Post;
