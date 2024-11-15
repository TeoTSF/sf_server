const catchError = require('../utils/catchError');
const Users = require('../models/Users');
const Role = require('../models/Role');

const getAll = catchError(async(req, res) => {
    const isAdmin = req.isAdmin;
    if(!isAdmin) return res.sendStatus(401);
    const results = await Users.findAll({
        include:
        {model: Role, attributes: ['role']},
        order: [['id', 'ASC']]
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const isAdmin = req.isAdmin;
    if (!isAdmin) return res.status(401).json({ message: "Unauthorized" });
    await Users.create(req.body);
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
    const result = await Users.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    enableOrDisableUser,
    update
}