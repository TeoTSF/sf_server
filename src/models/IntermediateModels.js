const sequelize = require("../utils/connection");

const UserCourse = sequelize.define("userCourse", {}, { timestamps: false });
const ThemeCourse = sequelize.define("themeCourse", {}, { timestamps: false });

module.exports = { UserCourse, ThemeCourse };