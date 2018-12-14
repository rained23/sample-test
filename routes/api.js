const express = require('express');
const router = express.Router();

const UserController 	= require('../controllers/user.controller');
const CarController = require('../controllers/car.controller');
const CarScheduleController = require('../controllers/car-schedule.controller');

const passport = require('passport');
const path = require('path');

require('./../middleware/passport')(passport)

//Open Access
router.post('/auth', UserController.login);
router.get('/car-listing', CarController.getAll);
router.get('/car-schedules/:carId', CarScheduleController.getByCar);


//User route
router.post('/users', UserController.create);       // C
router.get('/users', passport.authenticate('jwt', {session:false}), UserController.get);        // R
router.put('/users', passport.authenticate('jwt', {session:false}), UserController.update);     // U
router.delete('/users', passport.authenticate('jwt', {session:false}), UserController.remove);  // D

//Car Route
router.post('/cars', passport.authenticate('jwt', {session:false}), CarController.create); //C
router.get('/cars/:id', passport.authenticate('jwt', {session:false}), CarController.get ); //R
router.put('/cars/:id', passport.authenticate('jwt', {session:false}), CarController.update ); //U
router.delete('/cars/:id', passport.authenticate('jwt', {session:false}), CarController.remove ); //R

//Schedule Route
router.post('/car-schedule', passport.authenticate('jwt', {session: false}), CarScheduleController.create ); //C
// router.get('/car-schedule/:id', passport.authenticate('jwt', {session: false}), CarScheduleController.create ); //R
// router.put('/car-schedule/:id', passport.authenticate('jwt', {session: false}), CarScheduleController.create ); //U
// router.delete('/car-schedule/:id', passport.authenticate('jwt', {session: false}), CarScheduleController.create ); //D

module.exports = router;
