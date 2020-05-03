const connection = require('../../database/connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

function generateToken(params = {}){
    return jwt.sign(params,authConfig.secret,{
        expiresIn: 86400,
    });
}
module.exports = {
    async authenticate(request,response){
        var {email,password} = request.body;
        
        const user = await connection('clients').where({
            'email': email,
          }).select('id_client','email','password_hash');
        
        if (user == 0) {
            return response.status(400).send({error:"Usuário não encontrado"}); 
        }
        if ( !bcrypt.compareSync(password,user[0].password_hash )){
            return response.status(400).send({error:"Senha inválida"});
        }
        user[0].password = undefined;
        console.log(user[0].id_client)
        return response.json({user,
            token: generateToken({id:user[0].id_client})
        });
    }
}