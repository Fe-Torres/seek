const connection = require('../../database/connection');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

module.exports = {
    async registerUser(request,response){    
        let id_notexist = false;
        var {name, telephone, email,zip_code,sex,password,
            address,house_number} = request.body;
        var id_user = "";
       
        password = bcrypt.hashSync(password, 10);
        //Verificando se o e-mail existe
        var [emailRepeat] = await connection('users')
        .where({email:email})
        .count();    
        emailRepeat = emailRepeat[`count(*)`]
        
        if (emailRepeat==0){
            while (id_notexist == false) {
                id_user = crypto.randomBytes(4).toString('HEX');           
                id_existing = await connection('users')
                .where({id_user:id_user})
                .select('id_user');
                if (id_user != id_existing) {id_notexist = true;}
            }

            const [responsee] = 
            await connection('users')
            .insert({id_user,name, telephone, email,zip_code,sex,
                    password,address,house_number});
            return response.json({"Positive":"Cadastrado com sucesso!",responsee});
        }else{
            return response.json({"Negative":"Este e-mail já está cadastrado."});
        }
    }
}