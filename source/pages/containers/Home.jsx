import React, { Component } from 'react';

import Post from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';
import api from '../../api';

import styles from './Page.css';

// Es lo mismo que usar React.Component
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      posts: [],
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
    const posts = await api.posts.getList(this.state.page);
    // con esto enviamos los posts el numero de paginas y el loading
    this.setState({
      posts,
      page: this.state.page + 1,
      loading: false,
    });
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
        const posts = await api.posts.getList(this.state.page);

        this.setState({
          posts: this.state.posts.concat(posts),
          page: this.state.page + 1,
          loading: false,
        });
      } catch (err) {
        console.error(err);
        this.setState({ loading: false });
      }
    });
  }

  render() {
    return (
      <section name="Home" className={styles.section}>
        <h1>Home</h1>
        <section className={styles.list}>
          {this.state.posts
            .map(post => <Post key={post.id} {...post} />)}
          {this.state.loading && (
            <Loading />
          )}
        </section>
      </section>
    );
  }
}

export default Home;
