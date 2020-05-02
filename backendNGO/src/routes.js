const { 
<<<<<<< HEAD
    express, routes, middleware,middlewareuser,registerStore,loginStore,editStore,registerClient,loginUser,editUser
=======
    express, routes, middleware,middlewareuser,registerStore,loginStore,editStore,registerUser,loginUser,editUser,
    registerPromotion,indexPromotion,readPromotion,editPromotion,deletePromotion
>>>>>>> cb959f577b2f9382d2dd5f812bb2f1dded0c5fb4
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

module.exports = routes;