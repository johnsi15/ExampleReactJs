const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// No cargamos todos los modulos para produccion en el build porque no son necesarios
// Los modulos se van a instalar en el server
const nodeModules = fs
  .readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .reduce(
    (modules, module) => Object.assign(modules, { [module]: `commonjs ${module}` }),
    {}
);

const config = {
  entry: ['./source/server.jsx'],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../built/server'),
    publicPath: process.env.NODE_ENV === 'production'
      ? 'https://ejemplo-react-sfs.now.sh'
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
          presets: ['latest-minimal', 'react'],
          env: {
            production: {
              plugins: ['transform-regenerator', 'transform-runtime'],
              presets: ['es2015'],
            },
            development: {
              presets: ['latest-minimal'],
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
  target: 'node',
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json'],
  },
  externals: nodeModules,
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
