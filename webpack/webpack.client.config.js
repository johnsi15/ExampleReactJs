const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './source/client.jsx',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../built/statics'),
    publicPath: '/built/statics/',
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets: ['es2016', 'es2017', 'react'],
          plugins: ['transform-es2015-modules-commonjs'],
        }
      },
      {
				test: /\.css$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
		        	fallback: 'style-loader',
		          	use: 'css-loader?modules',
		        }),
			},
    ]
  },
  target: 'web',
  plugins: [
		new ExtractTextPlugin({ filename: '../statics/styles.css' }),
	],
};
