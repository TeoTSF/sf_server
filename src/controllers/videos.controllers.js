const catchError = require("../utils/catchError");
const Videos = require("../models/Videos");
const Courses = require("../models/Courses");
const { Sequelize } = require("sequelize");

const getAll = catchError(async (req, res) => {
  const { courseId } = req.query;
  const videos = await Videos.findAll(courseId ? { where: { courseId } } : {});
  const course = await Courses.findByPk(courseId);
  return res.json({ course, videos });
});

const create = catchError(async (req, res) => {
  const result = await Videos.create(req.body);
  const { videoCount, totalDuration } = await Courses.findByPk(
    req.body.courseId
  );
  await Courses.update(
    {
      videoCount: videoCount + 1,
      totalDuration: parseInt(totalDuration) + parseInt(req.body.duration),
    },
    {
      where: { id: req.body.courseId },
    }
  );
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Videos.findByPk(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Videos.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Videos.update(req.body, {
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
};
