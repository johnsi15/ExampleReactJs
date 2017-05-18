import React from 'react';
import PropTypes from 'prop-types';
// Con FormattedHTMLMessage podemos traer etiquetas con traduciones
import { FormattedHTMLMessage } from 'react-intl';

import styles from './Comment.css';

function Comment(props) {
  return (
    <article id={`comment-${props.id}`} className={styles.comment}>
      <div className={styles.meta}>
        <FormattedHTMLMessage
          id="comment.meta.author"
          values={{
            email: props.email,
            name: props.name,
          }}
        />
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
