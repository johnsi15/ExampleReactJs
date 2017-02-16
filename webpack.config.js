const path = require('path');

const config = {
  entry: './app/dist/index.js',
  output: {
    path: path.resolve(__dirname, './app/js'),
    filename: 'index.min.js'
  }
};

module.exports = config;