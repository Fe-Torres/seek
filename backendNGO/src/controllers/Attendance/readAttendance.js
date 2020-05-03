const connection = require('../../database/connection');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = {
    async readAttendance(request,response){
        var token = request.headers.authorization;
        const {id_list} = request.body;
        const parts = token.split(' ');
        const [scheme, token_split] = parts;
        
        jwt.verify(token_split,authConfig.secret, async (err, decoded) => {
            if (err) {return response.status(401).send({error : "Invalid Tokens"})};
            client_id = decoded.id;
        }); 
        try {
            const attendance = await connection('attendance').where({
                'client_id': client_id,
                'id_list': id_list
              }).select('*');
            
            if(attendance == 0){
                return response.status(400).send({error : "Lista não encontrada"});
            }  
            return response.json({attendance});
        } catch (error) {
            return response.status(400).send({error : "Erro na busca"});
        }
        
    }
}