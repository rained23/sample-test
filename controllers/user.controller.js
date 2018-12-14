const { User, Car }          = require('../models');
const authService       = require('../services/auth.service');
const { to, resError, resSuccess }  = require('../services/utility');

const create = async function(req, res){
    const body = req.body;

    if(!body.unique_key && !body.email && !body.phone ){
        return resError(res, 'Please enter an email or phone number to register.');
    } else if(!body.password){
        return resError(res, 'Please enter a password to register.');
    } else if(body.type != "Business" && body.type != "Product"){
        return resError(res, 'Invalid user type');
    } else {
        let err, user;

        [err, user] = await to(authService.createUser(body));

        if(err) return resError(res, err, 422);
        return resSuccess(res, {message:'Successfully created new user.', user:user.toWeb(), token:user.getJWT()}, 201);
    }
}
module.exports.create = create;

const get = async function(req, res){
    let users = [];
    [err, users] = await to(User.findAll());

    return resSuccess(res, users);
}
module.exports.get = get;

const update = async function(req, res){
    let err, user, data
    user = req.user;
    data = req.body;
    user.set(data);

    [err, user] = await to(user.save());
    if(err){
        if(err.message=='Validation error') err = 'The email address or phone number is already in use';
        return resError(res, err);
    }
    return resSuccess(res, {message :'The resource has been updated.'});
}
module.exports.update = update;

const remove = async function(req, res){
    let user, err;
    user = req.user;

    [err, user] = await to(user.destroy());
    if(err) return resError(res, 'error occured trying to delete user');

    return resSuccess(res, {message:'Deleted User'});
}
module.exports.remove = remove;


const login = async function(req, res){
    const body = req.body;
    let err, user;

    [err, user] = await to(authService.authUser(req.body));
    if(err) return resError(res, err, 422);

    return resSuccess(res, {access_token:user.getJWT(), user:user.toJSON()});
}
module.exports.login = login;