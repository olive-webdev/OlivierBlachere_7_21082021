'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      models.Like.belongsTo(models.Posting)
      models.Like.belongsTo(models.Comment)
      models.Like.belongsTo(models.User)
    }
  };
  Like.init({
    userId: DataTypes.INTEGER,
    postingId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};