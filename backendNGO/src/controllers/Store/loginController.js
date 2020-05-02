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
        
        const user = await connection('store').where({
            'email': email,
          }).select('id_store','email','password');
        
        if (user == 0) {
            return response.status(400).send({error:"Usuário não encontrado"}); 
        }
        if ( !bcrypt.compareSync(password,user[0].password )){
            return response.status(400).send({error:"Senha inválida"});
        }
        user[0].password = undefined;
        return response.json({user,
            token: generateToken({id:user[0].id_store})
        });
    }
}