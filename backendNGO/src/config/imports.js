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
const registerUser = require('../controllers/Users/registerUser');
const loginUser = require('../controllers/Users/loginUser');
const editUser = require('../controllers/Users/editUser');


module.exports = {  
    express,
    routes,
    middleware,
    middlewareuser,
    registerStore,
    loginStore,
    editStore,
    registerUser,
    loginUser,
    editUser
}
