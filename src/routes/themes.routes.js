const { getAll, create, getOne, remove, update } = require('../controllers/themes.controllers');
const express = require('express');

const themesRouter = express.Router();

themesRouter.route('/')
    .get(getAll)
    .post(create);

themesRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = themesRouter;