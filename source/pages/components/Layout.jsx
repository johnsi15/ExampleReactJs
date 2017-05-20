import React from 'react';
import PropTypes from 'prop-types';

// El layout se puede hacer con un html normal
function Layout(props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css"
        />
        <link
          rel="stylesheet"
          href={`${props.domain}/styles.css`}
        />
      </head>
      <body>
        <div
          id="render-target"
          dangerouslySetInnetHTML={{
            __html: props.content,
          }}
        />
        <script src={`${props.domain}/app.js`} />
      </body>
    </html>
  );
}

Layout.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  domain: PropTypes.string,
};

export default Layout;
