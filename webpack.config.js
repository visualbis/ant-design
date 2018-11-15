
// Imports
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
      //"@ant-design/icons": "purched-antd-icons"
    }},
  plugins: [
    new BundleAnalyzerPlugin({generateStatsFile:true})
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