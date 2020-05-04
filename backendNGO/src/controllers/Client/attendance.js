const connection = require('../../database/connection');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = {
    async attendancePending(request,response){
        const {page = 1} = request.query;
        
        var token = request.headers.authorization;
        const parts = token.split(' ');
        const [scheme, token_split] = parts;
        
        jwt.verify(token_split,authConfig.secret, async (err, decoded) => {
            if (err) {return response.status(401).send({error : "Invalid Tokens"})};
            client_id = decoded.id;
        }); 
       
        const [count] =  await connection('attendance')
        .where({'client_id':client_id,
                'verified': 'pending'
                })
        .count();
        
        if (count['count(*)'] == 0) {
            return response.status(401).send({message : "Nenhum pedido realizado"}); 
        }

        const attendance = await connection('attendance').where({
            'client_id': client_id,
            'verified': 'pending'
          })
          .limit(5)
          .offset((page - 1)*5)
          .select('*');
        response.header('X-Total-Count',count['count(*)']);
        return response.json({attendance});
    },
    async attendanceResponse(request,response){
        const {page = 1} = request.query;
        
        var token = request.headers.authorization;
        const parts = token.split(' ');
        const [scheme, token_split] = parts;
        
        jwt.verify(token_split,authConfig.secret, async (err, decoded) => {
            if (err) {return response.status(401).send({error : "Invalid Tokens"})};
            client_id = decoded.id;
        }); 
       
        const [count] =  await connection('attendance')
        .where({'client_id':client_id,
                'verified': 'accept'})
        .count();
        
        if (count['count(*)'] == 0) {
            return response.status(401).send({message : "Nenhum pedido respondido"}); 
        }
    
        const attendance = await connection('attendance').where({
            'client_id': client_id,
            'verified': 'accept'
          })
          .limit(5)
          .offset((page - 1)*5)
          .select('*');
        response.header('X-Total-Count',count['count(*)']);
        return response.json({attendance});
    }
}