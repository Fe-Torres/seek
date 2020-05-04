const { 
    express, routes, middleware,middlewareuser,registerStore,attendanceStore,loginStore,readStore,editStore,registerClient,loginClient,editClient,
    promotion,clientAttendace,registerPromotion,indexPromotion,readPromotion,editPromotion,deletePromotion,registerAttendance,editAttendance,
    deleteAttendance,readAttendance,registerFS,indexFS,deleteFS
} = require('./config/imports');


//Rotas das lojas
routes.post('/store',registerStore.registerStore );
routes.post('/login-store',loginStore.authenticate );
routes.put('/edit-store',middleware,editStore.editStore);
routes.put('/cancel-attendance-store',middleware,attendanceStore.cancelAttendance);
routes.put('/response-attendance-store',middleware,attendanceStore.responseAttendance);
routes.get('/read-store',middlewareuser,readStore.readStore);
routes.get('/attendance-store',middleware,attendanceStore.attendancePending);
routes.get('/attendance-store-read',middleware,attendanceStore.readAttendance);

//Rotas do cliente
routes.post('/client',registerClient.registerClient);
routes.post('/login-client',loginClient.authenticate);
routes.put('/edit-client',middlewareuser,editClient.editClient);
routes.get('/store-promotion',middlewareuser,promotion.index);
routes.get('/attendance-client',middlewareuser,clientAttendace.attendancePending);
routes.get('/response-client',middlewareuser,clientAttendace.attendanceResponse);
routes.get('/store-promotion',middlewareuser,promotion.index);

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
//Rotas dos favoritos
routes.post('/favorite',middlewareuser,registerFS.addFavoriteStore);
routes.get('/favorite',middlewareuser,indexFS.index);
routes.delete('/delete-favorite',middlewareuser,deleteFS.deleteFavoriteStore);



module.exports = routes;