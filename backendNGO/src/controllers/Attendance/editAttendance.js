const connection = require('../../database/connection');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = {
    async editAttendance(request, response) {
        var {id_list,sent_items,date_time} = request.body;
        var token = request.headers.authorization;
        const parts = token.split(' ');
        const [scheme, token_split] = parts;
        
        jwt.verify(token_split,authConfig.secret, async (err, decoded) => {
            if (err) {return response.status(401).send({error : "Invalid Tokens"})};
            client_id = decoded.id;

        });
        try {
            const result = await connection('attendance')
                                .where({'client_id':client_id,
                                'id_list': id_list})
                                .update({sent_items: JSON.stringify(sent_items),
                                date_time: date_time});
            if (result == 0){
                return response.status(400).send({message : "Lista não encontrada."});
            }                            
            return response.status(200).send({message : "Dados alterados com sucesso!", result});
        } catch (error) {
            return response.status(400).send({message : "Erro ao alterar os dados. Erro: ",error});
        }
        
            
    }
}