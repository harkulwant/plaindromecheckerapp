
/* Resources
https://webpack.js.org/configuration/
https://webpack.js.org/guides/asset-management/
https://webpack.js.org/plugins/html-webpack-plugin/
*/

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {

  target: 'web',

  // configuration regarding modules
  module: {
    rules: [
        {
            test: /\.js$/, 
            use: { loader: 'babel-loader' }, 
            exclude: /node_modules/
        },
        {
            test: /\.jsx$/, 
            use: { loader: 'babel-loader' }, 
            exclude: /node_modules/
        },
        {
          test: /\.html$/,
          use: 'html-loader'
        },
        // { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
        // { test: /\.(scss|sass)$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
        { 
          test: /\.(scss|sass)$/, 
          exclude: /node_modules/,  
          use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                    {
                      loader: 'css-loader',
                      // query: {
                      //     modules: true,
                      //     sourceMap: true,
                      //     importLoaders: 2,
                      //     // localIdentName: '[name]'
                      //     // localIdentName: '[name]__[local]___[hash:base64:5]'
                      // }
                    },
                    {
                      loader: 'sass-loader',
                      options: {
                        sourceMap: true
                      }
                    },
                    {
                      loader: 'postcss-loader',
                      options: {
                        sourceMap: true
                      }
                    },
                  ]
          })
        },
      
      // "include" is commonly used to match the directories
      // include:[
      //   path.resolve(__dirname, "Exchange.AuthServer/Content/Sass")
      // ],
      // the loaders will be applied from right to left
      // loader: ExtractTextPlugin.extract('style-loader', 'css!sass') },
      { test: /\.woff2$/,  use: "url-loader?name=fonts/[name]-[hash:6].[ext]&limit=10000&minetype=application/font-woff2" },
      { test: /\.woff$/,   use: "url-loader?name=fonts/[name]-[hash:6].[ext]&limit=10000&minetype=application/font-woff" },
      { test: /\.ttf$/,    use: "file-loader?name=fonts/[name]-[hash:6].[ext]" },
      { test: /\.eot$/,    use: "file-loader?name=fonts/[name]-[hash:6].[ext]" },
      { test: /\.svg$/,    use: "file-loader?name=images/svg-[name]-[hash:6].[ext]" },
      { test: /\.(png|jpg|gif)$/, use: "file-loader?name=images/img-[name]-[hash:6].[ext]"},
      // Bootstrap 4
      // { test: /bootstrap\/dist\/js\/umd\//, use: 'imports-loader?jQuery=jquery' },
      
      // Bootstrap 3
      { test: /bootstrap-sass\/assets\/javascripts\//, use: 'imports-loader?jQuery=jquery' },
      // { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, use: 'imports-loader?jQuery=jquery' },
    ]
  }
};

module.exports = config;

