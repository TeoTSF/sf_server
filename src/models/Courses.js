const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");
const { getFirebaseUrl } = require("../middlewares/firebase.middleware");

const Courses = sequelize.define(
  "courses",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    videoCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    totalDuration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
    createdAt: true,
    tableName: 'courses',
  }
);

Courses.afterFind(async(course) => {
  if(!course) return
  if (course?.dataValues) {
      const url = await getFirebaseUrl(course.imageUrl)
      course.imageUrl = url
      return
  }
  const urls = course?.map(async(item) => {
      if(item.imageUrl){
          const url = await getFirebaseUrl(item.imageUrl)
          item.imageUrl = url
      }
  })
  await Promise.all(urls) // map async
  return course
})

module.exports = Courses;