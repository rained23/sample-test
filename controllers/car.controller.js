const { Car }  = require('../models');
const { to, resError, resSuccess } = require('../services/utility');


const create = async function(req, res){
    let err, car;
    let user = req.user;

    let car_info = req.body;


    [err, car] = await to(Car.create(car_info));
    if(err) return resError(res, err, 422);

    

    [err, car] = await to(car.setUser(user));
    if(err) return resSuccess(res, err, 422);

    let car_json = car.toJSON();
    // car_json.users = [{user:user.id}];

    return resSuccess(res, {car:car_json}, 201);
}
module.exports.create = create;

const get = async function(req, res){
    let car, err, schedules;
    let carId = req.params.id;
    let user = req.user;

    [err, car] = await to(Car.findOne({where:{id:carId, user_id:user.id}}));
    if(err) return resError(res, "err finding company");

    if(!car) resError(res,"Unauthorized",422);    
    
    return resSuccess(res, {car});
}
module.exports.get = get;

const getAll = async function(req, res) {
    let err, cars = [];
    
    [err, cars] = await to(Car.findAll());
    if(err) return resError(res,"Error on getting cars");

    return resSuccess(res,cars);
}
module.exports.getAll = getAll;

const update = async function(req, res){
    let err, car, data;
    let carId = req.params.id;
    user = req.user;
    data = req.body;

    [err, car] = await to(Car.findOne({where:{id:carId, user_id:user.id}}));
    
    car.set(data);

    [err, car] = await to(car.save());
    if(err){
        return resError(res, err);
    }
    return resSuccess(res, car);
}
module.exports.update = update;

const remove = async function(req, res){
    let car, err;
    let carId = req.params.id;
    user = req.user;

    [err, car] = await to(Car.findOne({where:{id:carId, user_id:user.id}}));
    if(!car) return resError(res, 'error occured to destroy resource',422);
    
    [err, car] = await to(car.destroy());
    if(err) return resError(res, 'error occured trying to destroy resource.',422);

    return resSuccess(res, {message:'The resource has been destroyed.'});
}
module.exports.remove = remove;


const getSchedule = async function(req,res){

}
module.exports.getSchedule = getSchedule;