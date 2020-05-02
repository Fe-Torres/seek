const connection = require('../../database/connection');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = {
    async readPromotion(request,response){
        var token = request.headers.authorization;
        const {id_promo} = request.body;
        const parts = token.split(' ');
        const [scheme, token_split] = parts;
        
        jwt.verify(token_split,authConfig.secret, async (err, decoded) => {
            if (err) {return response.status(401).send({error : "Invalid Tokens"})};
            var id_store = decoded.id;
        }); 

        const promotion = await connection('promotion').where({
            'id_promo': id_promo,
            'id_store': id_store
          }).select('*');
        
          if(promotion == 0){
            return response.status(400).send({error : "Erro na busca"});
        }  
        return response.json({promotion});
    }
}