const { UserCourse } = require('../models/IntermediateModels');

const setCoursesUsers = async(userId, courseId) => {
    return await UserCourse.create({userId, courseId});
};


module.exports = {
    setCoursesUsers
}