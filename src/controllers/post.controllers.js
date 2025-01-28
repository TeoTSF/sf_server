const catchError = require('../utils/catchError');
const Post = require('../models/Post');
const Users = require('../models/Users');
const Tags = require('../models/Tags');
const { Op } = require('sequelize');

const getAll = catchError(async(req, res) => {
    const {tagId} = req.query
    const isAdmin = req.isAdmin
    let isAdminCondition = isAdmin ? {} : {tagId: { [Op.ne]: 6 }}
    const results = await Post.findAll({
        where: tagId ? { tagId, status: true } : { status: true,  ...isAdminCondition },
        attributes: {exclude: ["created_by", "tagId", "updatedAt", "status"]},
        include: [
            {
                model: Users,
                attributes: ["id", "name", "lastname"]
            },
            {
                model: Tags,
                attributes: {
                    exclude: ["status"]
                }
            }
        ],
        order: [["id", "DESC"]]
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    if(!req.isAdmin) return res.sendStatus(401);
    const id = req.userId
    req.body.created_by = id
    const result = await Post.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Post.findByPk(id, {
        attributes: {exclude: ["created_by", "tagId", "updatedAt", "status"]},
        include: [
            {
                model: Users,
                attributes: ["id", "name", "lastname"]
            },
            {
                model: Tags,
                attributes: {
                    exclude: ["status"]
                }
            }
        ]
    });
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    if(!req.isAdmin) return res.sendStatus(401);
    const { id } = req.params;
    await Post.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    if(!req.isAdmin) return res.sendStatus(401);
    const { id } = req.params;
    const result = await Post.update(
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
    remove,
    update
}