'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Tag', {    
    name: { type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
  }, {
    timestamp: true,
    underscored: true
  });

  Model.associate = function(models) {
    this.Users = this.belongsToMany(models.User, { through: 'UserTag'});
  };

  return Model;
};