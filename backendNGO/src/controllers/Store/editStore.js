const connection = require('../../database/connection');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = {
    async editStore(request, response) {
        var {name, telephone, cpf_cnpj, delivery,
            zip_code,address,house_number,type,category} = request.body;
        var token = request.headers.authorization;
        const parts = token.split(' ');
        const [scheme, token_split] = parts;
        
        jwt.verify(token_split,authConfig.secret, async (err, decoded) => {
            if (err) {return response.status(401).send({error : "Invalid Tokens"})};
            var id_store = decoded.id;
        }); 
        
        const email_store = await connection('store').where({
            'id_store': id_store,
          }).select('email');
       
        if(email_store == 0){
            return response.status(401).send({error : "Invalid Token"});
        }
        
        try {
            await connection('store')
                .where({ id_store: id_store })
                .update({name, telephone, cpf_cnpj,delivery,
                        zip_code,address,house_number,type,category});
                return response.status(200).send({error : "Dados alterados com sucesso!"});
            } catch (error) { 
                return response.status(400).send();
            }
        }
    }