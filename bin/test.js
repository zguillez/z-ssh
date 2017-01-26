#!/usr/local/bin/node
let conn = require('../src/Zssh');
//conn.config = 'ssh.json';
/*conn.upload().then(() => {
 console.log(`The File thing is done`.green);
 conn.close();
 }).catch(err => {
 console.log(`${err}`.red);
 conn.close();
 });*/
//conn.shell('rimraf .temp && mkdir -p .temp && sshpass -p Link3mann2015 scp -r root@213.192.239.108:/var/www/vhosts/test.linkemann.net/httpdocs/ssh/ ./.temp/. ').then(() => {
conn.exec('cd /var/www/vhosts/test.linkemann.net/httpdocs/ssh && tar -vcf /tmp/test.tar .').then(() => {
  console.log(`Command is done`.green);
  conn.close();
}).catch(err => {
  console.log(`${err}`.red);
  conn.close();
});