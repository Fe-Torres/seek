const connection = require('../../database/connection');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = {
    async deleteAttendance(request, response) {
        var {id_list} = request.body;
        var token = request.headers.authorization;
        const parts = token.split(' ');
        const [scheme, token_split] = parts;
        
        jwt.verify(token_split,authConfig.secret, async (err, decoded) => {
            if (err) {return response.status(401).send({error : "Invalid Tokens"})};
            client_id = decoded.id;
        }); 
        
        try {
            const result = await connection('attendance')
                .where({ id_list: id_list,
                         client_id:client_id })
                .delete()
                if (result != 0){
                    return response.status(200).send({message : "Dados excluídos com sucesso!"});
                }
                return response.status(400).send({message : "Lista não encontrada"});
            } catch (error) { 
                return response.status(400).send({message : "Erro na exclusão dos dados"});
            }
        }
    }