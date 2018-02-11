import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.js';
import open from 'open';

/* eslint-disable no-console */

// package.json:: "start": "webpack-dev-server --port 9977 --devtool eval --progress --colors --content-base dist/build"

const port = 6005;
const server = express();
const compiler = webpack(config);

server.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

server.use(require('webpack-hot-middleware')(compiler,{
	
   'log': false, 
   'path': '/__webpack_hmr', 
   'heartbeat': 5000

}));

server.get('*', function(req, res) {
   const indexHtml=path.join( __dirname, '../src/index.html');
   res.sendFile(indexHtml);

});

server.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});