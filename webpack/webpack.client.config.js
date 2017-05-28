const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: ['./source/client.jsx'],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../built/statics'),
    publicPath: process.env.NODE_ENV === 'production'
      ? 'https://ejemplo-react.now.sh'
      : 'http://localhost:3001',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
          presets: ['es2016', 'es2017', 'react'],
          plugins: ['transform-es2015-modules-commonjs'],
          env: {
            production: {
              plugins: ['transform-regenerator', 'transform-runtime'],
              presets: ['es2015'],
            },
            development: {
              plugins: ['transform-es2015-modules-commonjs'],
            },
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules',
          publicPath: process.env.NODE_ENV === 'production'
            ? 'https://ejemplo-react.now.sh'
            : 'http://localhost:3001',
        }),
      },
    ],
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      disable: false,
      allChunks: true,
    }),
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false,
        screw_ie8: true,
      },
      mangle: {
        except: ['$super', '$', 'exports', 'require'],
      },
    })
  );
}


module.exports = config;
