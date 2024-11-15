const express = require('express');
const userRouter = require('./users.routes');
const systemRouter = require('./system.routes');
const postRouter = require('./post.routes');
const tagsRouter = require('./tags.routes');
const themesRouter = require('./themes.routes');
const videosRouter = require('./videos.routes');
const router = express.Router();

// colocar las rutas aquí
router.use("/users", userRouter)

router.use("/system", systemRouter)

router.use("/post", postRouter)

router.use("tags", tagsRouter)

router.use("/themes", themesRouter)

router.use("/videos", videosRouter)

module.exports = router;