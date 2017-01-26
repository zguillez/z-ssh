'use strict';
require('colors');
const path = require('path');
const prompt = require('prompt');
const shell = require('shelljs');
const SSH = require('node-ssh');
const zfile = require('z-file');
const conn = new SSH();
/**
 *
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
    this.configData;
  }

  /**
   * Ruta del fiechero de configuración
   * @param {string} file - Ruta del fichero de configuración
   */
  set config(file) {
    this.constructor.config = path.resolve(__dirname, file);
  }

  /**
   * Ruta del fiechero de configuración
   * @returns {string} config - Ruta del fichero de configuración
   */
  get config() {
    return this.constructor.config;
  }

  /**
   * Devuelve true al realizarse la connexión SSH
   * @returns {Promise}
   */
  connect() {
    return new Promise((resolve, reject) => {
      this.prompt(config => {
        conn.dispose();
        conn.connect({
          host: config.host,
          username: config.username,
          password: config.password
        }).then(() => resolve(true)).catch(err => reject(err));
      });
    });
  }

  /**
   * Cierra la conexión SSH
   */
  close() {
    conn.dispose();
  }

  /**
   * Ejecuta un commando en el servidor
   * @param command
   * @returns {Promise}
   */
  exec(command) {
    return new Promise((resolve, reject) => {
      this.connect().then(() => {
        conn.execCommand(command).then(result => {
          console.log('STDOUT: ' + result.stdout);
          console.log('STDERR: ' + result.stderr);
          resolve(true);
        });
      }).catch(err => reject(err));
    });
  }

  /**
   * Ejecuta un commando de consola
   * @param command
   * @returns {Promise}
   */
  shell(command) {
    return new Promise((resolve, reject) => {
      shell.exec(command);
      resolve(true);
    });
  }

  download() {
    return new Promise((resolve, reject) => {
      this.connect().then(() => {
        conn.getFile(path.resolve(__dirname, '../', this.configData.local), this.configData.remote).then(() => {
          resolve(true);
        }, err => {
          reject(err);
        });
      }).catch(err => reject(err));
    });
  }

  upload() {
    return new Promise((resolve, reject) => {
      this.connect().then(() => {
        let files = [];
        for(let file of this.configData.files) {
          files.push({
            local: `${this.configData.local}/${file}`,
            remote: `${this.configData.remote}/${file}`
          });
        }
        conn.putFiles(files).then(() => {
          resolve(true);
        }, err => {
          reject(err);
        });
      }).catch(err => reject(err));
    });
  }

  /**
   * Genera una consulta desde la consola: host | username | password | folder
   */
  prompt(callback) {
    if(! this.configData) {
      let data = {};
      this.checkConfig().then(data => {
        data = JSON.parse(data);
        this._prompt(data, callback);
      }).catch(err => {
        //console.log(`${err}`.red);
        this._prompt(data, callback);
      });
    } else {
      this._prompt(this.configData, callback);
    }
  }

  _prompt(data, callback) {
    prompt.start();
    prompt.get(this._promptCreateSchema(data), (err, result) => {
      for(let [key, value] of Object.entries(result)) {
        data[key] = value;
      }
      this.configData = data;
      callback(this.configData);
    });
  }

  /**
   * Comprueba los parametros introducidos en el fichero de configuración
   * @param data
   * @returns {object} - Objeto schema para el prompt
   * @private
   */
  _promptCreateSchema(data) {
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
    if(! data.local) {
      schema.properties.local = {
        description: `local folder`.yellow,
        pattern: /^\w+$/,
        message: 'invalid local folder format',
        default: data.local,
        required: true,
      }
    }
    if(! data.remote) {
      schema.properties.remote = {
        description: `remote folder`.yellow,
        pattern: /^\w+$/,
        message: 'invalid remote folder format',
        default: data.remote,
        required: true,
      }
    }
    return schema;
  }

  /**
   * Comprueba si existe el fichero de configuración
   * @returns {Promise}
   */
  checkConfig() {
    return zfile.read(this.constructor.config);
  }
}
/**
 *
 * @type {ConnectionSSH}
 */
module.exports = new Zssh();