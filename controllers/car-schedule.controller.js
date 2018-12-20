const { Car, CarSchedule }  = require('../models');
const { to, resError, resSuccess } = require('../services/utility');


const create = async function(req, res){
    let err, car, carSchedule;    
    let data = req.body;

    [err, car] = await to(Car.findById(data.car_id));
    if(err) return resError(res, err, 422);
    if(!car) return resError(res,'Error occured trying to book the car',422);
    
    [err, carSchedule] = await to(CarSchedule.create(data));
    if(err) return resError(res, err, 422);

    // [err, carSchedule] = await to(carSchedule.setCar(car));
    // if(err) return resError(res, err, 422);
    

    return resSuccess(res, {carSchedule:carSchedule});
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

const getByCar = async function(req, res){
    let carSchedules, err;
    let carId = req.params.carId;
    let user = req.user;

    [err, carSchedules] = await to(CarSchedule.findAll({where:{car_id:carId}}));
    if(err) return resError(res, "Error on getting car schedules");

    if(!carSchedules) carSchedules = [];
    
    return resSuccess(res, carSchedules);
}
module.exports.getByCar = getByCar;

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