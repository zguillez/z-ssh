'use strict';
require('colors');
const path = require('path');
const prompt = require('prompt');
const SSH = require('node-ssh');
const zfile = require('z-file');
const conn = new SSH();
/**
 *
 * Class Zssh
 */
class Zssh {
  /**
   *
   * Constructor
   */
  constructor() {
    /**
     *
     * Archivo de configuración
     */
    this.config = path.resolve(__dirname, './ssh.json');
  }

  /**
   *
   * @param {string} file - Ruta del fichero de configuración
   */
  set config(file) {
    this.constructor.config = path.resolve(__dirname, file);
  }

  /**
   *
   * @returns {string} config - Ruta del fichero de configuración
   */
  get config() {
    return this.constructor.config;
  }

  /**
   *
   * Genera una consulta desde la consola: host | username | password | folder
   */
  prompt() {
    let data = {};
    this.checkConfig().then(data => {
      data = JSON.parse(data);
      this._prompt(data);
    }).catch(err => {
      //console.log(`${err}`.red);
      this._prompt(data);
    });
  }

  _prompt(data) {
    prompt.start();
    prompt.get(this._promptCreateSchema(data), (err, result) => {
      console.log(result);
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
    return schema;
  }

  /**
   * Comprueba si existe el fichero de configuración
   * @returns {Promise}
   */
  checkConfig() {
    return zfile.read(this.constructor.config);
  }

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
