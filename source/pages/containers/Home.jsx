import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Post from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';
import api from '../../api';
import actions from '../../actions';

import styles from './Page.css';

// Es lo mismo que usar React.Component
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.initialFecth();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  async initialFecth() {
    const posts = await api.posts.getList(this.props.page);

    this.props.dispatch(
      actions.setPost(posts),
    );

    // con esto enviamos los posts el numero de paginas y el loading
    this.setState({ loading: false });
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (this.state.loading) return null;

    const scrolled = window.scrollY;
    const viewportHeight = window.innerHeight;
    // const fullHeight = document.body.clientHeight;
    const fullHeight = document.documentElement.clientHeight;

    if (!(scrolled + viewportHeight + 300 >= fullHeight)) {
      return null;
    }

    return this.setState({ loading: true }, async () => {
      try {
        const posts = await api.posts.getList(this.props.page);

        this.props.dispatch(
          actions.setPost(posts),
        );

        this.setState({ loading: false });
      } catch (err) {
        console.error(err);
        this.setState({ loading: false });
      }
    });
  }

  render() {
    // console.log(this.props);
    return (
      <section name="Home" className={styles.section}>
        <h1><FormattedMessage id="title.home" /></h1>
        <section className={styles.list}>
          {this.props.posts
            .map(post => <Post key={post.id} {...post} />)}
          {this.state.loading && (
            <Loading />
          )}
        </section>
      </section>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func,
  posts: PropTypes.arrayOf(PropTypes.object),
};

function mapStateToProps(state) {
  return {
    posts: state.posts.entities,
    page: state.posts.page,
  };
}

// function mapDispatchToProps(dispatch) {
//   return { actions: bindActionCreators(actions, dispatch) };
// }

export default connect(mapStateToProps)(Home);
