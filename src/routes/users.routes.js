const { getAll, create, getOne, enableOrDisableUser, update } = require('../controllers/users.controllers');
const express = require('express');
const isAdmin = require('../middlewares/isAdmin.middleware');

const userRouter = express.Router();

userRouter.route('/')
    .get(isAdmin, getAll)
    .post(isAdmin, create);

userRouter.route('/:id')
    .get(isAdmin, getOne)
    .delete(isAdmin, enableOrDisableUser)
    .put(isAdmin, update);

module.exports = userRouter;