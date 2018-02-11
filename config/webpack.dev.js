var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var webpack = require('webpack');
const autoprefixer = require('autoprefixer');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var kosmosBuildPath = helpers.root("localbuild");
var kosmosPublicPath = '/'; // must be an absolute path (use the Node.js path module)

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';
const GEOLOCATION = process.env.GEOLOCATION =  false;

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  name: 'creditstar',

  // Here the application starts executing and webpack starts bundling
  entry: {
    // custom bootstrap configuration. https://www.npmjs.com/package/bootstrap-sass-webpack
    // 'bootstrap-sass-webpack!./app/config/bootstrap-sass.config.js',
    app: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true', './src/index'],
    // vendor: './src/vendor.js',
    // // pollyfills: './src/polyfills.ts',
    // vendorStyle: [
    //       'webpack-hot-middleware/client',
    //       'tether',
    //       'font-awesome-loader',
    //       'bootstrap-loader/extractStyles',
    //      // `bootstrap-loader/lib/bootstrap.loader?configFilePath=${__dirname}/bootstrap3.yml!bootstrap-loader/no-op.js`, // using extended config
    //     ],
    styles: './src/stylesheets/mainstyle.js'
  },
  target: 'web',
// options related to how webpack emits results
  output: {
    path: kosmosBuildPath,
    // the url to the output directory resolved relative to the HTML page
    publicPath: kosmosPublicPath,
    filename: "[name].js"
    // filename: "[name].[chunkhash].js",
    // // the filename template of the source map location
    // sourceMapFilename: "[file].map" // string
    // sourceMapFilename: "sourcemaps/[file].map", // string
  },

  devServer: {
    historyApiFallback: {
      index: 'index.html'
    },
    contentBase: './src',
    hot:true,
    port: 5002

  },

 plugins: [
    new webpack.DefinePlugin({ 'process.env': { 'ENV': JSON.stringify(ENV), 'NODE_ENV': JSON.stringify(ENV), 'GEOLOCATION': JSON.stringify(GEOLOCATION)} }),
    new ExtractTextPlugin({
      filename: "[name].css",
      disable: false,
      allChunks: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app']
    }),

    // HtmlWebpackPlugin to automaticall append the app.js and styles.css to the src/index.html
    // new HtmlWebpackPlugin({
    //   template: 'src/index.html'
    // }),

    new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          'window.jQuery': 'jquery',
          Popper: ['popper.js', 'default']
          // 'window.Tether': 'tether',
       }),

   new webpack.LoaderOptionsPlugin({
      postcss: [autoprefixer],
    }),
  ]
});
