/* Startar as variáveis globais do sistema */
const express = require('express');
const routes = express.Router();
const middleware = require('../middllewares/auth');
const middlewareuser = require('../middllewares/authUser');

//Store
const registerStore = require('../controllers/Store/registerStore');
const loginStore = require('../controllers/Store/loginStore');
const editStore = require('../controllers/Store/editStore');
//User
const registerClient = require('../controllers/Client/registerClient');
const loginClient = require('../controllers/Client/loginClient');
const editClient = require('../controllers/Client/editClient');
//promotion
const registerPromotion = require('../controllers/Promotion/registerPromotion');
const indexPromotion = require('../controllers/Promotion/indexPromotion');
const readPromotion = require('../controllers/Promotion/readPromotion');
const editPromotion = require('../controllers/Promotion/editPromotion');
const deletePromotion = require('../controllers/Promotion/deletePromotion');
//Attendance
const registerAttendance = require('../controllers/Attendance/registerAttendance');
const readAttendance = require('../controllers/Attendance/readAttendance');
const editAttendance = require('../controllers/Attendance/editAttendance');
const deleteAttendance = require('../controllers/Attendance/deleteAttendance');
//Favorite Store
const registerFS = require('../controllers/FavoriteStore/addFS');
const indexFS = require('../controllers/FavoriteStore/indexFs');
const deleteFS = require('../controllers/FavoriteStore/deleteFS');





module.exports = {  
    express,
    routes,
    middleware,
    middlewareuser,
    registerStore,
    loginStore,
    editStore,
    registerClient,
    loginClient,
    editClient,
    registerPromotion,
    indexPromotion,
    readPromotion,
    editPromotion,
    deletePromotion,
    registerAttendance,
    editAttendance,
    deleteAttendance,
    readAttendance,
    registerFS,
    indexFS,
    deleteFS,
}
