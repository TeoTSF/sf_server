const catchError = require('../utils/catchError');
const Users = require('../models/Users');
const Role = require('../models/Role');
const { setCoursesUsers } = require('./userCourse.controllers');
const paginate = require('../utils/pagination');

const getAll = catchError(async (req, res) => {
    const { page } = req.query;
    const isAdmin = req.isAdmin;
    if (!isAdmin) return res.sendStatus(401);
    const paginatedResults = await paginate({
        model: Users,
        include: {
            model: Role,
            attributes: ['role'],
        },
        order: [['id', 'DESC']],
        page,
    });
    return res.json(paginatedResults);
});

const create = catchError(async(req, res) => {
    const isAdmin = req.isAdmin;
    const {courseId} = req.body
    if (!isAdmin) return res.status(401).json({ message: "Unauthorized" });
    const {id} = await Users.create(req.body);
    if(courseId != null) setCoursesUsers(id, courseId)
    return res.status(201).json({success: true});
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const user = await Users.findByPk(id);
    if(!user) return res.sendStatus(404);
    return res.json(user);
});

const enableOrDisableUser = catchError(async (req, res) => {
    const isAdmin = req.isAdmin;
    if (!isAdmin) return res.status(401).json({ message: "Unauthorized" });
    const { id } = req.params;
    const user = await Users.findByPk(id);
    await Users.update({ status: !user.status }, { where: { id } });
    return res.status(204).json({ success: true });
  });

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const {courseId} = req.body
    await Users.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(courseId != null) await setCoursesUsers(id, courseId)
    return res.json({success: true});
});

module.exports = {
    getAll,
    create,
    getOne,
    enableOrDisableUser,
    update
}