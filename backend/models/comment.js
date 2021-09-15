'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      models.Comment.hasMany(models.Report)
      models.Comment.hasMany(models.Like)
      models.Comment.hasMany(models.Comment)
      models.Comment.belongsTo(models.Comment)
      models.Comment.belongsTo(models.User)
    }
  };
  Comment.init({
    userId: DataTypes.INTEGER,
    postingId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER,
    text: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};