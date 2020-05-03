const connection = require('../../database/connection');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

module.exports = {
    async registerClient(request,response){    
        let id_notexist = false;

        var {name, telephone,cpf, email,zip_code,password_hash,
            address,number} = request.body;

        var id_client = "";
       
        //Verificando se o e-mail existe
        var [emailRepeat] = await connection('clients')
        .where({email:email})
        .count();    
        emailRepeat = emailRepeat[`count(*)`]
        
        if (emailRepeat==0){
            while (id_notexist == false) {
                id_client = crypto.randomBytes(4).toString('HEX');           
                id_existing = await connection('clients')
                .where({id_client:id_client})
                .select('id_client');
                if (id_client != id_existing) {id_notexist = true;}
            }

            let data = request.body;
            data.password_hash = await bcrypt.hash(data.password_hash, 10);

            const client = 
            await connection('clients')
            .insert({
                id_client,
                name,
                telephone,
                cpf,
                email,
                zip_code,
                password_hash: data.password_hash,
                address,
                number
            });

            return response.json(data);
        }else{
            return response.json({"Negative":"Este e-mail já está cadastrado."});
        }
    }
}