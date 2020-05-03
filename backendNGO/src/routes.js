const { 
    express, routes, middleware,middlewareuser,registerStore,loginStore,editStore,registerClient,loginUser,editUser,
    registerPromotion,indexPromotion,readPromotion,editPromotion,deletePromotion,registerAttendance,editAttendance,
    deleteAttendance,readAttendance
    
} = require('./config/imports');


//Rotas das lojas
routes.post('/store',registerStore.registerStore );
routes.post('/login-store',loginStore.authenticate );
routes.put('/edit-store',middleware,editStore.editStore);

//Rotas do cliente
routes.post('/client',registerClient.registerClient);
routes.post('/login-user',loginUser.authenticate);
routes.put('/edit-user',middlewareuser,editUser.editUser);

//Rotas das promoções
routes.post('/promotion',middleware,registerPromotion.registerPromotion);
routes.get('/promotion',middleware,indexPromotion.index);
routes.get('/promotion-read',middleware,readPromotion.readPromotion);
routes.put('/edit-promotion',middleware,editPromotion.editPromotion);
routes.delete('/delete-promotion',middleware,deletePromotion.deletePromotion);

//Rotas dos atendimentos
routes.post('/attendance',middlewareuser,registerAttendance.registerAttendance);
routes.put('/edit-attendance',middlewareuser,editAttendance.editAttendance);
routes.delete('/delete-attendance',middlewareuser,deleteAttendance.deleteAttendance);
routes.get('/attendance-read',middlewareuser,readAttendance.readAttendance);


module.exports = routes;