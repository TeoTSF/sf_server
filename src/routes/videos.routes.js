const { getAll, create, getOne, remove, update } = require('../controllers/videos.controllers');
const express = require('express');

const videosRouter = express.Router();

videosRouter.route('')
    .get(getAll)
    .post(create);

videosRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = videosRouter;