#!/usr/local/bin/node

let conn = require('../src/Zssh');

//conn.config = 'ssh.json';

conn.prompt();

console.log('ok');
