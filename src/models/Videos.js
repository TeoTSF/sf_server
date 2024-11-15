const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");
const { getFirebaseUrl } = require('../middlewares/firebase.middleware');

const Videos = sequelize.define(
  "videos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    videoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
    tableName: 'videos',
  }
);

Videos.afterFind(async(video) => {
  if (video.dataValues) {
      const url = await getFirebaseUrl(video.videoUrl)
      video.videoUrl = url
      return
  }
  const urls = video.map(async(item) => {
      if(item.videoUrl){
          const url = await getFirebaseUrl(item.videoUrl)
          item.videoUrl = url
      }
  })
  await Promise.all(urls) // map async
  return video
})

module.exports = Videos;
