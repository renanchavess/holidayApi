const Sequelize = require('sequelize');

const holiday = require('../app/models/Holiday');

const databaseConfig = require('../config/database');

const models = [holiday];

class Database {
  constructor() {
    this.init();
  } 

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
  }
}

module.exports = new Database();
