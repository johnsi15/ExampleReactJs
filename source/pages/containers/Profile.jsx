import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import Post from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';
import api from '../../api';
import styles from './Page.css';

// Es lo mismo que usar React.Component
class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      posts: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.initialFecth();
  }

  async initialFecth() {
    const [
      user,
      posts,
    ] = await Promise.all([
      api.users.getSingle(this.props.match.params.id),
      api.users.getPosts(this.props.match.params.id),
    ]);

    this.setState({
      user,
      posts,
      loading: false,
    });
  }

  render() {
    return (
      <section name="profile" className={styles.section}>
        {this.state.loading && (
          <Loading />
        )}
        <h2>
          <FormattedMessage
            id="title.profile"
            values={{
              name: this.state.user.name,
            }}
          />
        </h2>
        <section className={styles.main}>
          <fieldset className={styles.field}>
            <FormattedMessage id="profile.field.basic" tagName="legend" />
            <input type="email" value={this.state.user.email ? this.state.user.email : 'Ninguno'} disabled />
          </fieldset>

          {this.state.user.address && (
            <fieldset>
              <FormattedMessage id="profile.field.address" tagName="legend" />
              <address>
                {this.state.user.address.street}<br />
                {this.state.user.address.suite}<br />
                {this.state.user.address.city}<br />
                {this.state.user.address.zipcode}<br />
              </address>
            </fieldset>
          )}
        </section>

        <section>
          {this.state.posts
            .map(post => (
              <Post
                key={post.id}
                user={this.state.user}
                {...post}
              />
            ))
          }
        </section>
      </section>
    );
  }
}

Profile.propTypes = {
  match: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default Profile;
