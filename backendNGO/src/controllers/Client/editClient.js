const connection = require('../../database/connection');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = {
    async editClient(request, response) {
        var {name,cpf, telephone,zip_code,
            address,number} = request.body;

        var token = request.headers.authorization;
        const parts = token.split(' ');
        const [scheme, token_split] = parts;
        
        jwt.verify(token_split,authConfig.secret, async (err, decoded) => {
            if (err) {return response.status(401).send({error : "Invalid Tokens"})};
            var id_store = decoded.id;
        }); 
        
        const email_client = await connection('clients').where({
            'id_client': id_client,
          }).select('email');
       
        if(email_client == 0){
            return response.status(401).send({error : "Invalid Token"});
        }
        
        try {
            await connection('clients')
                .where({ id_client: id_client })
                .update({name, telephone,zip_code,
                        address,number});
                return response.status(200).send({error : "Dados alterados com sucesso!"});
            } catch (error) { 
                return response.status(400).send();
            }
        }
    }