const { getAll, create, getOne, remove, update } = require('../controllers/post.controllers');
const express = require('express');
const upload = require('../utils/multer.js');
const { firebaseFile } = require('../middlewares/firebase.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware');

const postRouter = express.Router();

postRouter.route('/')
    .get(getAll)
    .post(isAdmin, upload.single("file"), firebaseFile, create);

postRouter.route('/:id')
    .get(getOne)
    .delete(isAdmin, remove)
    .put(isAdmin, update);

module.exports = postRouter;