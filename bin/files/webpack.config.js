'use strict'
const fs = require('fs');
const path = require('path');
let reactHelperConfig = {};
if (fs.existsSync('react-helper.json')) {
  reactHelperConfig = JSON.parse(fs.readFileSync('react-helper.json'));
}
const config = Object.assign({
  bundlePath: `public/javascript`,
  bundleName: `bundle.js`,
  registry: `./client/registry.js`
}, reactHelperConfig);
const webpack = require('webpack')
module.exports = {
  cache:    true,
  devtool: 'cheap-module-eval-source-map',
  context: __dirname,
  entry: {main: '/Users/tyler/dev/react-helper-example/src/client/registry.js'},// [
 //   'babel-polyfill',
    //config.registry,
  //],
  output: {
    filename: config.bundleName,
    path: config.bundlePath,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', path.join(__dirname, '../../node_modules')]
  },
  resolveLoader: {
    modules: [path.join(__dirname, '../../node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            extends: path.join(__dirname, '.babelrc'),
          }
        }],
        exclude: /node_modules/,
      },
    ],
  },
}
