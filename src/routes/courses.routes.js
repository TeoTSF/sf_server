const { getAll, create, getOne, remove, update } = require('../controllers/courses.controllers');
const express = require('express');
const upload = require('../utils/multer.js');
const verifyJWT = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware');
const { firebaseFile } = require('../middlewares/firebase.middleware');

const coursesRouter = express.Router();

coursesRouter.route('')
    .get(verifyJWT, getAll)
    .post(isAdmin, upload.single("file"), firebaseFile, create);

coursesRouter.route('/:id')
    .get(verifyJWT, getOne)
    .delete(isAdmin, remove)
    .put(isAdmin, upload.single("file"), update);

module.exports = coursesRouter;