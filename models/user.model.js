'use strict';
const bcrypt 			= require('bcrypt');
const bcrypt_p 			= require('bcrypt-promise');
const jwt           	= require('jsonwebtoken');
const {TE, to}          = require('../services/utility');
const CONFIG            = require('../config/config');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('User', {
        type: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true}},    
        email: {type: DataTypes.STRING, allowNull: true, unique: true, validate: { isEmail: {msg: "Phone number invalid."} }},
        phone: {type: DataTypes.STRING, allowNull: true, unique: true, 
            validate: { len: {args: [7, 20], msg: "Phone number invalid, too short."}, 
            isNumeric: { msg: "not a valid phone number."} }},
        name: DataTypes.STRING,
        password  : DataTypes.STRING,
    },{
        timestamp:true,
        underscored: true
    });

    Model.associate = function(models){
        this.Tags = this.belongsToMany(models.Tag, {through: 'tag_user', timestamps: false});        
    };


    Model.beforeSave(async (user, options) => {
        let err;
        if (user.changed('password')){
            let salt, hash
            [err, salt] = await to(bcrypt.genSalt(10));
            if(err) TE(err.message, true);

            [err, hash] = await to(bcrypt.hash(user.password, salt));
            if(err) TE(err.message, true);

            user.password = hash;
        }
    });

    Model.prototype.comparePassword = async function (pw) {
        let err, pass
        if(!this.password) TE('password not set');
    
        [err, pass] = await to(bcrypt_p.compare(pw, this.password.replace(/^\$2y/, "$2b")));
        if(err) TE(err);

        if(!pass) TE('invalid password');

        return this;
    }

    Model.prototype.getJWT = function () {
        let expiration_time = parseInt(CONFIG.jwt_expiration);
        return jwt.sign({user_id:this.id}, CONFIG.jwt_encryption, {expiresIn: expiration_time});
    };
    
    Model.prototype.toJSON =  function () {
        var values = Object.assign({}, this.get());
        
        delete values.password;
        return values;
    }

    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};
