// This script copies src/index.html into /dist/index.html
// This is a good example of using Node and cheerio to do a simple file transformation.
// In this case, the transformation is useful since we only use a separate css file in prod.
import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

/*eslint-disable no-console */

fs.readFile('src/index.html', 'utf8', (err, markup) => {
  if (err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);

  // stylesheet and css already included
  // $('head').prepend('<link rel="/stylesheet" href="styles.css">');
  // $('body').append('<script type="text/javascript" src="/app.js"></script>');
  $('body').append('<script type="text/javascript" src="/styles.js"></script>');

  fs.writeFile('dist/index.html', $.html(), 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('index.html written to /dist'.green);
  });
});


fs.readFile('src/privacy-policy.htm', 'utf8', (err, markup) => {
  if (err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);

  fs.writeFile('dist/privacy-policy.htm', $.html(), 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('privacy-policy.htm written to /dist'.green);
  });
});