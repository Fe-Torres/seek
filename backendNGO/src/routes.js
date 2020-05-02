const { 
    express, routes, middleware,middlewareuser,registerStore,loginStore,editStore,registerClient,loginUser,editUser
} = require('./config/imports');


//Rotas das lojas
routes.post('/store',registerStore.registerStore );
routes.post('/login-store',loginStore.authenticate );
routes.put('/edit-store',middleware,editStore.editStore);

//Rotas do cliente
routes.post('/client',registerClient.registerClient);
routes.post('/login-user',loginUser.authenticate);
routes.put('/edit-user',middlewareuser,editUser.editUser);


module.exports = routes;