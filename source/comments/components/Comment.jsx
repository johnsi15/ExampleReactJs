import React from 'react';
import PropTypes from 'prop-types';

function Comment(props) {
  return (
    <article id={`comment-${props.id}`}>
      <div>
        By: <a href={`mailto:${props.email}`}> {props.name}</a>
      </div>

      <p>
        {props.body}
      </p>
    </article>
  );
}

Comment.propTypes = {
  id: PropTypes.number,
  email: PropTypes.string,
  name: PropTypes.string,
  body: PropTypes.string,
};

export default Comment;
