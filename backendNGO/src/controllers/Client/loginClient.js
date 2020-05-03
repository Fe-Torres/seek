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
        const {email,password_hash} = request.body;
        

        const client = await connection('clients').where({'email': email})
        .select('id_client', 'name', 'email', 'password_hash').first();

        if (!client) {
            return response.json({error:"Usuário não encontrado"}); 
        }
        
        if (!(await bcrypt.compare(password_hash, client.password_hash, ))) {
            return response.status(401).json({
                error: true,
                code: 111,
                message: "Senha Incorreta"
            })
        }

        return response.json({client,
            token: generateToken({id:client.id_client})
        });
        
        
    }
}