const {
    getAll,
    create,
    getOne,
    remove,
    update,
    getAllAdmin,
  } = require("../controllers/post.controllers");
  const express = require("express");
  const upload = require("../utils/multer.js");
  const { firebaseFile } = require("../middlewares/firebase.middleware");
  const isAdmin = require("../middlewares/isAdmin.middleware");
  
  const postRouter = express.Router();
  
  postRouter.route("/").get(getAll);
  
  postRouter.route("/admin")
    .get(isAdmin, getAllAdmin)
    .post(isAdmin, upload.single("file"), firebaseFile, create);
  
  // postRouter.route("/admin/:id")
  
  postRouter.route("/:id")
      .get(getOne)
      .delete(isAdmin, remove)
      .put(isAdmin, upload.single("file"), firebaseFile, update);
  
  module.exports = postRouter;
