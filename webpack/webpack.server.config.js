module.exports = {
  entry: './source/server.js',
  output: {
    filename: 'index.js',
    path: __dirname +'built/server/',
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets: ['latest-minimal', 'react']
        }
      }
    ]
  },
  target: 'node',
};