'use strict';
const zssh = require('../src/Zssh.js');
const path = require('path');
zssh.shell('pwd');
console.log(zssh.config);
zssh.checkConfig().then((data) => {
  console.log(data);
  zssh.config = path.resolve(__dirname, '.zconfig');
  console.log(zssh.config);
  zssh.checkConfig().then((data) => {
    console.log(data);
    console.log(zssh.configData);
    console.log('done!');
  });
});
/* zssh.prompt((err, result) => {
  console.log(zssh.configData);
}); */
