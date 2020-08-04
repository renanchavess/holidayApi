const express = require('express');
const routesHolidays = require('./routes/holidayRoutes');

require('./database')
class App {
  constructor() {
    this.server = express();
    this.server.use(express.json());
    this.routes();
  }

  routes() {
    this.server.use('/feriados', routesHolidays);
  }
}
 
module.exports = new App().server;
