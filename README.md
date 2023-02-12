# z-ssh

Nodejs tools for remote ssh connections

## Install

```
npm i @zguillez/z-ssh
yarn add @zguillez/z-ssh
```

# Usage

```
const conn = require('z-ssh');
```

## Configuration file

By default *./ssh.json*

```
conn.config = './config/ssh.json';
```

```
{
  "host": "#SERVER_IP#",
  "username": "#USERNAME#",
  "password": "#PASSWORD#",
  "local": "./mylocalfolder",
  "remote": "/var/www/vhosts/mydomain.net/httpdocs/myremotefolder"
}
```

If no config file is defined or a params is omitted a prompt will ask for the required param:

```
prompt: password:
```

## Upload files

Upload the local folder to the remote folder:

```
conn.upload().then(() => {
  console.log(`Upload is done`);
  conn.close();
}).catch(err => {
  console.log(`${err}`);
  conn.close();
});
```

## Download files

Download the remote folder to the local folder:

```
conn.download().then(() => {
  console.log(`Download is done`);
  conn.close();
}).catch(err => {
  console.log(`${err}`);
  conn.close();
});
```

## Shell script on remote server

Execute a shell script on the remote server:

```
conn.exec('cd /var/www/vhosts/mydomain.net/httpdocs/ssh && tar -cvf backup.tar .').then(() => {
  console.log(`Action is done`);
  conn.close();
}).catch(err => {
  console.log(`${err}`);
  conn.close();
});
```

## Shell script on local server

Execute a shell script on the local server:

```
conn.shell('cd /Users/myusername/Documents/myfolder && tar -cvf backup.tar .').then(() => {
  console.log(`Action is done`);
  conn.close();
}).catch(err => {
  console.log(`${err}`);
  conn.close();
});
```

# Contributing and issues

Contributors are welcome, please fork and send pull requests! If you have any ideas on how to make this project better
then please submit an issue or send me an [email](guillermo@delaiglesia.email).

# License

©2023 Zguillez.IO

Original code licensed under [MIT](https://en.wikipedia.org/wiki/MIT_License) Open Source projects used within this
project retain their original licenses.

# Changelog

### v0.1.32 (February 12, 2023)

* Update dependencies

### v0.1.0 (January 27, 2017)

* Upload and download methods
