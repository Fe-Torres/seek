const connection = require('../../database/connection');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = {
    async index(request,response){
        const {page = 1} = request.query;
        var token = request.headers.authorization;
        const parts = token.split(' ');
        const [scheme, token_split] = parts;
        
        jwt.verify(token_split,authConfig.secret, async (err, decoded) => {
            if (err) {return response.status(401).send({error : "Invalid Tokens"})};
            id_client = decoded.id;
        }); 
        
        const [favorite] = await connection('clients').where({
            'id_client': id_client
          })
          .limit(5)
          .offset((page - 1)*5)
          .select('favorite_store');
        return response.json(favorite);
    }
}