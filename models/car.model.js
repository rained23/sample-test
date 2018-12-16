'use strict';
module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define('Car', {    
    build: { type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    model: { type: DataTypes.STRING, allowNull: false,validate: {notEmpty: true}},
    year: { type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    registration_no: { type: DataTypes.STRING, allowNull: false, unique: true, validate: {notEmpty: true}},
    location: { type: DataTypes.JSON},
    is_featured: { type: DataTypes.BOOLEAN, defaultValue: false}
  }, {
    timestamp: true,
    underscored: true
  });

  Car.associate = function(models) {
    this.User = this.belongsTo(models.User);
    this.CarSchedules = this.hasMany(models.CarSchedule);
  };

  return Car;
};