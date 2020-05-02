const connection = require('../../database/connection');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
module.exports = {
    async registerStore(request,response){    
        let id_notexist = false;
        var {name, telephone, cpf_cnpj, email,password,delivery,
            zip_code,address,house_number,type,category} = request.body;
        var id_store = "";
        var status = "Não atribuido"
        password = bcrypt.hashSync(password, 10);
        //Verificando se o e-mail existe
        var [emailRepeat] = await connection('store')
        .where({email:email})
        .count();    
        emailRepeat = emailRepeat[`count(*)`]
        
        if (emailRepeat==0){
            while (id_notexist == false) {
                id_store = crypto.randomBytes(4).toString('HEX');           
                id_public = crypto.randomBytes(4).toString('HEX'); 
                id_existing = await connection('store')
                .where({id_store:id_store})
                .select('id_store');
                if (id_store != id_existing) {id_notexist = true;}
            }

            const [response] = 
            await connection('store')
            .insert({
                id_store,
                id_public,
                name,
                telephone,
                cpf_cnpj,
                email,
                password,
                delivery,
                zip_code,
                address,
                house_number,
                status,
                type,
                category,
            });

            return response.json({"Positive":"Cadastrado com sucesso!",response});
        }else{
            return response.json({"Negative":"Este e-mail já está cadastrado."});
        }
    }
}