const { getAll, create, getOne, remove, update } = require('../controllers/videos.controllers');
const express = require('express');
const upload = require('../utils/multer.js');
const verifyJWT = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware');
const { firebaseFile } = require('../middlewares/firebase.middleware');

const videosRouter = express.Router();

videosRouter.route('')
    .get(verifyJWT, isAdmin, getAll)
    .post(isAdmin, upload.single("file"), firebaseFile, create);

videosRouter.route('/:id')
    .get(verifyJWT, getOne)
    .delete(isAdmin, remove)
    .put(isAdmin, upload.single("file"), firebaseFile, update);

module.exports = videosRouter;