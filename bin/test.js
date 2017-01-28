#!/usr/local/bin/node
const path = require('path');
const zssh = require('../src/Zssh');
zssh.config = path.resolve(__dirname, './ssh.json');
zssh.download().then(() => {
  console.log(`Download is done`.green);
  zssh.close();
}).catch(err => {
  console.log(`${err}`.red);
  zssh.close();
});
/*zssh.upload().then(() => {
 console.log(`Upload is done`.green);
 zssh.close();
 }).catch(err => {
 console.log(`${err}`.red);
 zssh.close();
 });*/



