#!/usr/local/bin/node
let conn = require('../src/Zssh');
//conn.config = 'ssh.json';
conn.download().then(() => {
  console.log(`Download is done`.green);
  conn.close();
}).catch(err => {
  console.log(`${err}`.red);
  conn.close();
});
/*conn.upload().then(() => {
 console.log(`Upload is done`.green);
 conn.close();
 }).catch(err => {
 console.log(`${err}`.red);
 conn.close();
 });*/



