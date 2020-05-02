/* Startar as variáveis globais do sistema */
const express = require('express');
const routes = express.Router();
const middleware = require('../middllewares/auth');
const middlewareuser = require('../middllewares/authUser');

//Store
const registerStore = require('../controllers/Store/registerStore');
const loginStore = require('../controllers/Store/loginController');
const editStore = require('../controllers/Store/editStore');
//User
const registerClient = require('../controllers/Users/registerClient');
const loginUser = require('../controllers/Users/loginUser');
const editUser = require('../controllers/Users/editUser');
//promotion
const registerPromotion = require('../controllers/Promotion/registerPromotion');
const indexPromotion = require('../controllers/Promotion/indexPromotion');
const readPromotion = require('../controllers/Promotion/readPromotion');
const editPromotion = require('../controllers/Promotion/editPromotion');
const deletePromotion = require('../controllers/Promotion/deletePromotion');



module.exports = {  
    express,
    routes,
    middleware,
    middlewareuser,
    registerStore,
    loginStore,
    editStore,
    registerClient,
    loginUser,
    editUser,
    registerPromotion,
    indexPromotion,
    readPromotion,
    editPromotion,
    deletePromotion,
}
