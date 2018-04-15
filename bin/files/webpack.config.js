'use strict'
var path = require('path');

/**
 *
 * This webpack file is intended for development only.  To create a production ready bundle
 * see https://webpack.js.org/guides/production/
 *
 */

module.exports = {
  cache:    true,
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  context: __dirname,
  entry: [
    'babel-polyfill',
    'ENTRY_FILE_PATH',
  ],
  output: {
    path: path.join(__dirname, 'OUTPUT_FILE_PATH'),
    filename: 'OUTPUT_FILENAME',
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
              "env",
              "react"
            ],
            plugins: [
              "transform-class-properties",
              "transform-object-rest-spread"
            ]
          }
        }],
        exclude: /node_modules/,
      },
    ],
  },
}
