'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posting extends Model {
    static associate(models) {
      models.Posting.hasMany(models.Report)
      models.Posting.hasMany(models.Like)
      models.Posting.hasMany(models.Comment)
      models.Posting.belongsTo(models.User)
    }
  };
  Posting.init({
    userId: DataTypes.INTEGER,
    text: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Posting',
  });
  return Posting;
};