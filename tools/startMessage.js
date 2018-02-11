import colors from 'colors';

/* eslint-disable no-console */

if(process.env.NODE_ENV==='production')
{
  console.log('Starting creditstar-website in production mode...'.blue);
}
else{
  console.log('Starting creditstar-website app in dev mode...'.green);
}