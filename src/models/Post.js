const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");
const { getFirebaseUrl } = require("../middlewares/firebase.middleware");


const Post = sequelize.define(
  "post",
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
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: 'post',
  }
);

Post.afterFind(async(post) => {
  if (post.dataValues) {
      const url = await getFirebaseUrl(post.imageUrl)
      post.imageUrl = url
      return
  }
  const urls = post.map(async(item) => {
      if(item.imageUrl){
          const url = await getFirebaseUrl(item.imageUrl)
          item.imageUrl = url
      }
  })
  await Promise.all(urls) // map async
  return post
})

module.exports = Post;
