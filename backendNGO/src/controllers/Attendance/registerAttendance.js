const connection = require('../../database/connection');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const crypto = require('crypto');

module.exports = {
    async registerAttendance(request,response){    
            token = request.authorization;
            let id_notexist = false;
            var {store_id,sent_items,date_time} = request.body;
            var id_list = "";
            var verified = "pending";
            var status = "active";    
            var token = request.headers.authorization;
            const parts = token.split(' ');
            const [scheme, token_split] = parts;
            
            jwt.verify(token_split,authConfig.secret, async (err, decoded) => {
                if (err) {return response.status(401).send({error : "Invalid Tokens"})};
                var id_client = decoded.id;
            });
            client_id = id_client; //Ele não estava identificando a variável como client_id 
            //Verificando se o e-mail exist
            while (id_notexist == false) {
                id_list = crypto.randomBytes(4).toString('HEX');           
                id_existing = await connection('attendance')
                .where({id_list:id_list})
                .select('id_list');
                if (id_list != id_existing) {id_notexist = true;}
            }
                const result = await connection('attendance')
                .insert({id_list,client_id,store_id,
                        sent_items: JSON.stringify(sent_items),verified,status,date_time});
                return response.json({"Positive":"Cadastrado com sucesso!",result});
        } 
    }
