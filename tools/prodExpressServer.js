import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

/* eslint-disable no-console */

// package.json:: "start": "webpack-dev-server --port 9977 --devtool eval --progress --colors --content-base dist/build"

const port = 6005;
const server = express();

server.use(compression());
server.use(express.static('dist'));
server.get('*', function(req, res) {
   const indexHtml=path.join( __dirname, '../dist/index.html');
   res.sendFile(indexHtml);

});

server.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});