const connection = require('../../database/connection');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = {
    async editPromotion(request, response) {
        var {id_promo,name,price} = request.body;
        var token = request.headers.authorization;
        const parts = token.split(' ');
        const [scheme, token_split] = parts;
        
        jwt.verify(token_split,authConfig.secret, async (err, decoded) => {
            if (err) {return response.status(401).send({error : "Invalid Tokens"})};
            var id_store = decoded.id;
        }); 
        
        try {
            const result = await connection('promotion')
                .where({ id_promo: id_promo,
                         id_store:id_store })
                .update({name,price});
                if (result != 0){
                    return response.status(200).send({error : "Dados alterados com sucesso!"});
                }
                return response.status(200).send({error : "Erro na alteração dos dados"});
            } catch (error) { 
                return response.status(400).send();
            }
        }
    }