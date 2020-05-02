const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const connection = require('../database/connection');

module.exports = (request,response,next)=>{
    const authHeader = request.headers.authorization;

    if (!authHeader){
        return response.status(401).send({error: "No token provide"});
    }

    const parts = authHeader.split(' ');

    if (!parts.lengh === 2){
        return response.status(401).send({error: "Token error"});
    };
    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return response.status(401).send({error: "Token malformmated"});
    };

     jwt.verify(token,authConfig.secret, async (err, decoded) => {
        if (err) {
            return response.status(401).send({error : "Invalid Tokens"})
        };
        
        id_user = decoded.id;
        id = id_user[0].id_user;

        var [emailRepeat] = await connection('users')
        .where({id_user:id_user})
        .count();    

        emailRepeat = emailRepeat[`count(*)`]
        
        if (emailRepeat == 0) {
            return response.status(401).send({error : "Unauthorized"})  
        }
        
        return next();
    });

}