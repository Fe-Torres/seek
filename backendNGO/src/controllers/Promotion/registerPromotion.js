const connection = require('../../database/connection');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = {
    async registerPromotion(request,response){    
        try {
            token = request.authorization;
            let id_notexist = false;
            var {name,price} = request.body;
            var id_promo = "";
            
        var token = request.headers.authorization;
        const parts = token.split(' ');
        const [scheme, token_split] = parts;
        
        jwt.verify(token_split,authConfig.secret, async (err, decoded) => {
            if (err) {return response.status(401).send({error : "Invalid Tokens"})};
            var id_store = decoded.id;
        }); 
            //Verificando se o e-mail exist
            while (id_notexist == false) {
                id_promo = crypto.randomBytes(4).toString('HEX');           
                id_existing = await connection('promotion')
                .where({id_promo:id_promo})
                .select('id_promo');
                if (id_promo != id_existing) {id_notexist = true;}
            }
    
                await connection('promotion')
                .insert({id_promo,id_store,name,price });
                return response.json({"Positive":"Cadastrado com sucesso!"});
        } catch (error) {
                return response.json({"Negative":"Cadastrado com sucesso!: ",error});
        }
    }
}