'use strict';
require('colors');
const path = require('path');
const prompt = require('prompt');
const SSH = require('node-ssh');
const zfile = require('z-file');
const conn = new SSH();
/**
 * Class Zssh
 */
class Zssh {
  /**
   * Constructor
   */
  constructor() {
    /**
     * Archivo de configuración
     */
    this.config = path.resolve(__dirname, './ssh.json');
  }

  /**
   *
   * Genera una consulta desde la consola: host | username | password | folder
   */
  prompt() {
    zfile.read(this.config).then((data)=> {
      data = JSON.parse(data);
      let schema = {
        properties: {}
      };
      if(! data.host) {
        schema.properties.host = {
          description: `host`.yellow,
          pattern: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
          message: 'invalid host format',
          default: data.host,
          required: true,
        }
      }
      if(! data.username) {
        schema.properties.username = {
          description: `username`.yellow,
          pattern: /^\w+$/,
          message: 'invalid username format',
          default: data.username,
          required: true,
        }
      }
      if(! data.password) {
        schema.properties.password = {
          description: `password`.yellow,
          pattern: /^[a-zA-Z0-9]+$/,
          message: 'invalid password format',
          hidden: true,
          required: true,
        }
      }
      if(! data.source) {
        schema.properties.source = {
          description: `source`.yellow,
          pattern: /^\w+$/,
          message: 'invalid source format',
          default: data.source,
          required: true,
        }
      }
      if(! data.output) {
        schema.properties.output = {
          description: `output`.yellow,
          pattern: /^\w+$/,
          message: 'invalid output format',
          default: data.output,
          required: true,
        }
      }
      if(! data.folder) {
        schema.properties.folder = {
          description: `folder`.yellow,
          pattern: /^\w+$/,
          message: 'invalid folder format',
          default: data.folder,
          required: true,
        }
      }
      prompt.start();
      prompt.get(schema, (err, result) => {
        let options = {
          host: result.host,
          username: result.username,
          password: result.password,
        };
        /* this.connect(options).then((conn) => {
         conn.putDirectory(path.resolve(__dirname, '../../dist'), `/var/www/vhosts/test.linkemann.net/httpdocs/${result.folder}`).then(() => {
         console.log(`\nDeployed!\n`.green);
         conn.dispose();
         }, (error) => {
         console.log(`\nerror: ${error}\n`.red);
         conn.dispose();
         });
         });*/
      });
    });
  }

  checkOptions() {}

  /**
   *
   * Crea una conexión ssh con el servidor.
   * @param {object} opt - Objeto de configuración para la conexión ssh
   */
  connect(opt) {
    return conn.connect({
      host: opt.host,
      username: opt.username,
      password: opt.password,
    });
  }
}
/**
 *
 * @type {ConnectionSSH}
 */
module.exports = new Zssh();
