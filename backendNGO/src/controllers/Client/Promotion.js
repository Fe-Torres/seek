const connection = require('../../database/connection');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = {
    async index(request,response){
        const {page = 1} = request.query;
        const {id_public} = request.body;
        const [count] =  await connection('promotion')
        .where({'id_public':id_public})
        .count();
        
        if (count['count(*)'] == 0) {
            return response.status(401).send({message : "Nenhuma promoção encontrada"}); 
        }
        
        var token = request.headers.authorization;
        const parts = token.split(' ');
        const [scheme, token_split] = parts;
        
        
        jwt.verify(token_split,authConfig.secret, async (err, decoded) => {
            if (err) {return response.status(401).send({error : "Invalid Tokens"})};
        }); 
        
        const promotion = await connection('promotion').where({
            'id_public': id_public
          })
          .limit(5)
          .offset((page - 1)*5)
          .select('*');
        response.header('X-Total-Count',count['count(*)']);
        return response.json({promotion});
    }
}