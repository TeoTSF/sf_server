const catchError = require("../utils/catchError");
const Courses = require("../models/Courses");
const Videos = require("../models/Videos");
const { UserCourse } = require("../models/IntermediateModels");

const getAll = catchError(async (req, res) => {
  const { flag } = req.query;
  const queryOptions = {
    attributes: flag
      ? ["id", "title"]
      : {},
  };

  const results = await Courses.findAll(queryOptions);

  return res.json(results);
});

module.exports = { getAll };

const getFreeCourse = catchError(async (req, res) => {
  const result = await Courses.findAll({
    where: {price: 0},
  });
  if (!result) return res.json([]);
  return res.json(result);
});

const getMyCourses = catchError(async (req, res) => {
  const isAdmin = req.isAdmin;
  const {id} = req.user
  let result = []
  if (isAdmin) {
    result = await Courses.findAll({
      where: {
        price: { [Op.gt]: 0 },
      },
    });
  } else {
    const userCourses = await UserCourse.findAll({
      where: {
        userId: id,
      },
      attributes: ["courseId"],
    });
    if (!courseIds) return res.json([]);
    const courseIds = userCourses.map((uc) => uc.courseId);
    result = await Courses.findAll({
      where: {
        id: courseIds,
      },
    });
  }
  return res.json(result);
});

const create = catchError(async (req, res) => {
  const isAdmin = req.isAdmin;
  if(!isAdmin) return res.sendStatus(401);
  const result = await Courses.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Courses.findByPk(id, {
    include: {
      model: Videos
    }
  });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const isAdmin = req.isAdmin;
  if(!isAdmin) return res.sendStatus(401);
  await Courses.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const isAdmin = req.isAdmin;
  if(!isAdmin) return res.sendStatus(401);
  const result = await Courses.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  getFreeCourse,
  getMyCourses
};
