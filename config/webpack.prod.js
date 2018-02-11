var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var webpack = require('webpack');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var kosmosBuildPath = helpers.root("/dist");
// must be an absolute path (use the Node.js path module)
var kosmosPublicPath = '/';

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const GEOLOCATION = process.env.GEOLOCATION =  false;

module.exports = webpackMerge(commonConfig, {
	devtool: 'source-map',
	entry:{
		app: './src/index',
		styles: './src/stylesheets/mainstyle'
	},
	output: {
		path: kosmosBuildPath,
		publicPath: kosmosPublicPath,
		filename: '[name].js',
		// chunkFilename: '[id].chunk.js'
	},
	devServer: {
		historyApiFallback: {
	  index: 'index.html'
		},
		contentBase: './dist/prod'
	},

	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.DefinePlugin({ 'process.env': { 'ENV': JSON.stringify(ENV), 'NODE_ENV': JSON.stringify(ENV), 'GEOLOCATION': JSON.stringify(GEOLOCATION)} }),
		new ExtractTextPlugin({ filename: "[name].css" }),
		// new webpack.optimize.DedupePlugin(), // Warning: This plugin was removed from webpack
    new webpack.optimize.UglifyJsPlugin({ sourceMap: false, mangle: { keep_fnames: false }, compress: {warnings: false}, output: {comments: false, beautify: false}}),
    new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          'window.jQuery': 'jquery',
          Popper: ['popper.js', 'default']
          // 'window.Tether': 'tether',
       }),
	  ]
});