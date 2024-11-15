const { getAll, create, getOne, remove, update } = require('../controllers/tags.controllers');
const express = require('express');

const tagsRouter = express.Router();

tagsRouter.route('/')
    .get(getAll)
    .post(create);

tagsRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = tagsRouter;