'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class classroom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  classroom.init({
    RoomNumber: DataTypes.INTEGER,
    Latitude: DataTypes.DECIMAL,
    Longitude: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'classroom',
  });
  return classroom;
};