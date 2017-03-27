'use strict'
var webpack = require('webpack')
var isProdEnvironment = (process.env.NODE_ENV === 'production')
var path = require('path');

module.exports = {
  cache:    true,
  devtool: isProdEnvironment ? 'source-map' : 'cheap-module-eval-source-map',
  context: __dirname,
  entry: [
    'babel-polyfill',
    'ENTRY_FILE_PATH',
  ],
  output: {
    filename: 'OUTPUT_FILENAME',
    path: path.join(__dirname, 'OUTPUT_FILE_PATH'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets:  [
              "es2015",
              "es2016",
              "react"
            ]
          }
        }],
        exclude: /node_modules/,
      },
    ],
  },
}
