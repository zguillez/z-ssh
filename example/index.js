'use strict';
const zssh = require('../src/Zssh.js');
zssh.shell('pwd');
zssh.prompt((err, result) => {
  console.log(zssh.configData);
});
console.log('done!');
