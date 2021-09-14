'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      models.Like.belongsTo(models.Posting, {onDelete: 'CASCADE', hooks: true,})
      models.Like.belongsTo(models.Comment, {onDelete: 'CASCADE', hooks: true,})
      models.Like.belongsTo(models.User, {onDelete: 'CASCADE', hooks: true,})
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