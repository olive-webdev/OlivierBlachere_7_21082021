'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Posting.hasMany(models.Report, {onDelete: 'CASCADE', hooks: true,})
      models.Posting.hasMany(models.Like, {onDelete: 'CASCADE', hooks: true,})
      models.Posting.hasMany(models.Comment, {onDelete: 'CASCADE', hooks: true,})
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