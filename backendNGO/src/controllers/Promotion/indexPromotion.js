const connection = require('../../database/connection');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = {
    async index(request,response){
        const {page = 1} = request.query;
        const [count] =  await connection('promotion').count();
        var token = request.headers.authorization;
        const parts = token.split(' ');
        const [scheme, token_split] = parts;
        
        
        jwt.verify(token_split,authConfig.secret, async (err, decoded) => {
            if (err) {return response.status(401).send({error : "Invalid Tokens"})};
            var id_store = decoded.id;
        }); 
        
        const promotion = await connection('promotion').where({
            'id_store': id_store
          })
          .limit(5)
          .offset((page - 1)*5)
          .select('*');
        response.header('X-Total-Count',count['count(*)']);
        return response.json({promotion});
    }
}