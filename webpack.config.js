
// Imports
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
require("babel-register");
require("babel-polyfill");
const config = {
  entry: ["babel-polyfill", './index-with-locales.js'],
    output: {
    path: path.resolve(__dirname, '../PowerBI/periodSelector/external'),
    filename: 'bundle.js',
    libraryTarget: "window",
    library:"calendar",
  },
  resolve: { extensions: ['.tsx','.ts', '.js','.css','.less'],
  alias:{
    "react-dom": path.resolve('./node_modules/react-dom'),
    "react": path.resolve('./node_modules/react'),
    "object-assign": path.resolve('./node_modules/object-assign'),
    "prop-types": path.resolve('./node_modules/prop-types'),
    "add-dom-event-listener": path.resolve('./node_modules/add-dom-event-listener'),
    "core-js": path.resolve('./node_modules/core-js'),
    "component-classes": path.resolve('./node_modules/component-classes'),
    "babel-runtime": path.resolve('./node_modules/babel-runtime'),
    "moment": path.resolve('./node_modules/moment'),
    "raf": path.resolve('./node_modules/raf'),
    "classnames": path.resolve('./node_modules/classnames'),
    "create-react-class": path.resolve('./node_modules/create-react-class'),
    "@ant-design/icons": "purched-antd-icons"
    }},
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',    
      template: 'template.html'
    }),    
  new BundleAnalyzerPlugin({generateStatsFile:true}), 
	new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /(en-us)\.js/),
	new webpack.ContextReplacementPlugin(/components[/\\]date[/-]picker[/\\]locale$/, /(en_US)\.tsx/),
	new webpack.ContextReplacementPlugin(/components[/\\]calendar[/\\]locale$/, /(en_US)\.tsx/),
	new webpack.ContextReplacementPlugin(/components[/\\]time[/-]picker[/\\]locale$/, /(en_US)\.tsx/),
	new webpack.ContextReplacementPlugin(/rc[-]pagination[/\\]lib[/\\]locale$/, /(en_US)\.js/) 
  ],
  // Loaders
  module: {
    rules : [
      // JavaScript/JSX Files
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
         
        }
      },{
        test: /\.less$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'less-loader', // compiles Less to CSS
          options: {
            javascriptEnabled: true
        }
        }]},
        {
          test: /\.scss$/,
          use: [{
              loader: "style-loader"
          }, {
              loader: "css-loader"
          }, {
              loader: "sass-loader",
              options: {
                  includePaths: ["absolute/path/a", "absolute/path/b"]
              }
          }]
        }, 
        {
          test: /\.css$/,
          use: [{
              loader: "style-loader"
          }, {
              loader: "css-loader"
          }, {
              loader: "sass-loader",
              options: {
                  includePaths: ["absolute/path/a", "absolute/path/b"]
              }
          }]
        },           
        {
          test: /\.html$/,
          use: [ {
            loader: 'html-loader',
            options: {             
              removeComments: false,
              collapseWhitespace: false
            }          
          }],
        },
     
    { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  },
  
  // OPTIONAL
  // Reload On File Change
  watch: true,
  
  devtool: 'source-map'
};
// Exports
module.exports = config;