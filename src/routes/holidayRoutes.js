const { Router } = require('express');
const routes = new Router();

const HolidayController = require('../app/controllers/HolidayController');

routes.get('/:ibgeCode/:date', HolidayController.show);

routes.put('/:ibgeCode/:dateOrName', HolidayController.update);

routes.delete('/:ibgeCode/:date', HolidayController.delete);

module.exports = routes;