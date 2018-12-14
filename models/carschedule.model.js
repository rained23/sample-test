'use strict';
module.exports = (sequelize, DataTypes) => {
  const CarSchedule = sequelize.define('CarSchedule', {
    car_id: DataTypes.INTEGER.UNSIGNED,
    start: DataTypes.DATE,
    end: DataTypes.DATE
  }, {
    timestamp: true,
    underscored: true
  });
  CarSchedule.associate = function(models) {
    // this.Car = this.belongsTo(models.Car);
  };

  return CarSchedule;
};