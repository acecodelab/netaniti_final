'use strict';
import dotenv from 'dotenv'
dotenv.config()

import fs from 'fs'

import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import Sequelize from 'sequelize';

const basename = path.basename(__filename);

import envConfigs from '../config/config.js';


const env = process.env.NODE_ENV;
const config = envConfigs[env];

const db = {};

let sequelize;
if (config.url) {
  sequelize = new Sequelize(config.url, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    let model = import(path.join(__dirname, file))
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


import m_users from './m_users.js';
db.m_users = m_users(sequelize, Sequelize)

export default { db }
