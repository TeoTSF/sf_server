const catchError = require("../utils/catchError");
const Courses = require("../models/Courses");
const Videos = require("../models/Videos");
const { Sequelize } = require("sequelize");

const getAll = catchError(async (req, res) => {
    const {flag} = req.query;

    const queryOptions = {
      attributes: flag == true ? ["id", "title"]
        : {
            include: [
              [
                Sequelize.literal(`(
                  SELECT SUM("duration")
                  FROM "${Videos.getTableName()}"
                  WHERE "${Videos.getTableName()}"."courseId" = "${Courses.getTableName()}"."id"
                )`),
                "totalDuration",
              ],
              [
                Sequelize.literal(`(
                  SELECT COUNT(*)
                  FROM "${Videos.getTableName()}"
                  WHERE "${Videos.getTableName()}"."courseId" = "${Courses.getTableName()}"."id"
                )`),
                "videoCount",
              ],
            ],
          },
    };
  
    const results = await Courses.findAll(queryOptions);
  
    return res.json(results);
  });
  
  module.exports = { getAll };
  

const create = catchError(async (req, res) => {
  const result = await Courses.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Courses.findByPk(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Courses.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
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
};
