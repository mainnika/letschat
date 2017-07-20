'use strict';

const { join } = require('path');

const CommonsChunkPlugin = require('webpack').optimize.CommonsChunkPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackErrorBeep = require('webpack-error-beep');

const context = __dirname;
const output = join(__dirname, '../.dist/frontend');
const entry = join(context, 'index.tsx');
const html = join(context, 'index.pug');
const scss = join(context, 'styles/main.scss');
const statics = join(context, 'static');
const configFileName = join(context, 'tsconfig.json');

module.exports = {

  context: context,

  entry: {
    vendor: [
      'jquery',
      'tether',
      'bootstrap',
      'debug',
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'redux-thunk'
    ],
    css: scss,
    chat: entry,
  },

  output: {
    path: output,
    filename: '[name].js',
  },

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: { configFileName },
      },
      // { test: /\.json$/, loader: 'json-loader' },
      { test: /\.pug$/, loader: 'pug-loader' },
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] },
      { test: /jquery\.min\.js$/, loader: 'expose-loader?jQuery' },
      { test: /tether\.min\.js$/, loader: 'expose-loader?Tether' },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js', '.tsx', 'jsx'],
    alias: {
      'bootstrap': join(context, '../node_modules/bootstrap/dist/js/bootstrap.min.js'),
      'tether': join(context, '../node_modules/tether/dist/js/tether.min.js'),
      'jquery': join(context, '../node_modules/jquery/dist/jquery.min.js'),
    },
  },

  plugins: [
    new WebpackErrorBeep(),
    new CommonsChunkPlugin('vendor'),
    new CopyWebpackPlugin([{ from: statics }]),
    new HtmlWebpackPlugin({
      template: html,
      filename: 'index.html',
      minify: {},
      hash: true,
      chunksSortMode: 'dependency',
    }),
  ],
};
