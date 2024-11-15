const Users = require("./Users");
const Role = require("./Role");
const Courses = require("./Courses");
const Themes = require("./Themes");
const Videos = require("./Videos");
const Post = require("./Post");
const Tags = require("./Tags");
const { UserCourse, ThemeCourse } = require("./IntermediateModels");

const initModels = () => {
  // Role 1 ----- * Users
  Role.hasMany(Users, { foreignKey: "roleId" });
  Users.belongsTo(Role, { foreignKey: "roleId" });

  // Users 1 ----- * UserCourse
  Users.hasMany(UserCourse, { foreignKey: "userId" });
  UserCourse.belongsTo(Users, { foreignKey: "userId" });

  // Courses 1 ----- * UserCourse
  Courses.hasMany(UserCourse, { foreignKey: "courseId" });
  UserCourse.belongsTo(Courses, { foreignKey: "courseId" });

  // Themes 1 ----- * ThemeCourse
  Themes.hasMany(ThemeCourse, { foreignKey: "themeId" });
  ThemeCourse.belongsTo(Themes, { foreignKey: "themeId" });

  // Courses 1 ----- * ThemeCourse
  Courses.hasMany(ThemeCourse, { foreignKey: "courseId" });
  ThemeCourse.belongsTo(Courses, { foreignKey: "courseId" });

  // Users 1 ----- * Post
  Users.hasMany(Post, { foreignKey: "created_by" });
  Post.belongsTo(Users, { foreignKey: "created_by" });

  // Tags 1 ----- * PostTags
  Tags.hasMany(Post, { foreignKey: "tagId" });
  Post.belongsTo(Tags, { foreignKey: "tagId" });

  // Courses 1 ----- * Videos
  Courses.hasMany(Videos);
  Videos.belongsTo(Courses);
};

module.exports = initModels;