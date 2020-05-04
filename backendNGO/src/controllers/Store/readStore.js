const connection = require('../../database/connection');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = {
    async readStore(request,response){
        var token = request.headers.authorization;
        const {id_public} = request.body;
        const parts = token.split(' ');
        const [scheme, token_split] = parts;
        
        jwt.verify(token_split,authConfig.secret, async (err, decoded) => {
            if (err) {return response.status(401).send({error : "Invalid Tokens"})};
            id_client = decoded.id;
        }); 
        try {
            const store = await connection('store').where({
                'id_public': id_public
              }).select('*');
            
            if(store == 0){
                return response.status(400).send({error : "Loja não encontrada"});
            }
            store.forEach(element => {element.id_store = undefined; element.password_hash = undefined;});
            return response.json(store);
        } catch (error) {
            return response.status(400).send({error : "Erro na busca"});
        }
        
    }
}