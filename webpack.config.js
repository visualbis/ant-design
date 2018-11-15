
// Imports
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
require("babel-register");

const config = {
  entry: './index-with-locales.js',
    output: {
    path: path.resolve(__dirname, './client'),
    filename: 'bundle.js',
    libraryTarget: "window",
    library:"calendar",
  },
  resolve: { extensions: ['.tsx','.ts', '.js','.css','.less'],
  alias:{
    "react-dom": path.resolve('./node_modules/react-dom'),
    "react": path.resolve('./node_modules/react'),
    "prop-types": path.resolve('./node_modules/prop-types'),
    "moment": path.resolve('./node_modules/moment'),
    "create-react-class": path.resolve('./node_modules/create-react-class')
      //"@ant-design/icons": "purched-antd-icons"
    }},
  plugins: [
    new BundleAnalyzerPlugin({generateStatsFile:true}),
	new webpack.ContextReplacementPlugin(/components[/\\]locale[/-]provider$/, /en_US\.tsx|LocaleReceiver\.tsx/),
	new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /(en-us)\.js/),
	new webpack.ContextReplacementPlugin(/components[/\\]date[/-]picker[/\\]locale$/, /(en_US)\.tsx/),
	new webpack.ContextReplacementPlugin(/components[/\\]calendar[/\\]locale$/, /(en_US)\.tsx/),
	new webpack.ContextReplacementPlugin(/components[/\\]time[/-]picker[/\\]locale$/, /(en_US)\.tsx/),
	new webpack.ContextReplacementPlugin(/rc[-]pagination[/\\]lib[/\\]locale$/, /(en_US)\.js/),	
	new webpack.ContextReplacementPlugin(/calendar[/\\]lib[/\\]locale$/, /(en_US)\.js/)
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
          loader: 'less-loader' // compiles Less to CSS
        }]},
     
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