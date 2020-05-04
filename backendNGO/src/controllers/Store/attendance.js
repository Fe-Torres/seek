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
            store_id = decoded.id;
        });
        
        const [id_public] =  await connection('store')
        .where({'id_store':id_store}).select('id_public');
        
        const [count] =  await connection('attendance')
        .where({'store_id':id_public['id_public'],
                'verified': 'pending'
                })
        .count();
        
        if (count['count(*)'] == 0) {
            return response.status(401).send({message : "Nenhum pedido realizado"}); 
        }
        const attendance = await connection('attendance').where({
            'store_id':id_public['id_public'],
            'verified': 'pending'
          })
          .limit(5)
          .offset((page - 1)*5)
          .select('*');
        response.header('X-Total-Count',count['count(*)']);
        return response.json({attendance});
    },
        async readAttendance(request,response){
            var token = request.headers.authorization;
            const {id_list} = request.body;
            const parts = token.split(' ');
            const [scheme, token_split] = parts;
            
            jwt.verify(token_split,authConfig.secret, async (err, decoded) => {
                if (err) {return response.status(401).send({error : "Invalid Tokens"})};
                id_store = decoded.id;
            });

            try {
                const [id_public] =  await connection('store')
                .where({'id_store':id_store}).select('id_public');
                (id_public);

                const attendance = await connection('attendance').where({
                    'store_id':id_public['id_public'],
                    'id_list': id_list
                  }).select('*');
                
                if(attendance == 0){
                    return response.status(400).send({error : "Lista não encontrada"});
                }  
                return response.json({attendance});
            } catch (error) {
                return response.status(400).send({error : "Erro na busca"});
            }   
        },
        async cancelAttendance(request, response) {
            var {id_list} = request.body;
            var token = request.headers.authorization;
            const parts = token.split(' ');
            const [scheme, token_split] = parts;
            
            jwt.verify(token_split,authConfig.secret, async (err, decoded) => {
                if (err) {return response.status(401).send({error : "Invalid Tokens"})};
                id_store = decoded.id;
            }); 
            
            const [id_public] =  await connection('store')
                .where({'id_store':id_store}).select('id_public');

            try {
                const result = await connection('attendance')
                    .where({ id_list: id_list,
                             store_id:id_public['id_public'] })
                    .update({
                        verified:'recused'
                    });
                    if (result != 0){
                        return response.status(200).send({error : "Lista cancelada com sucesso!"});
                    }
                    return response.status(400).send({error : "Erro no cancelamento das listas"});
                } catch (error) { 
                    return response.status(400).send();
                }
            },
            async responseAttendance(request, response) {
                var {id_list,returned_items} = request.body;
                var token = request.headers.authorization;
                const parts = token.split(' ');
                const [scheme, token_split] = parts;
                
                jwt.verify(token_split,authConfig.secret, async (err, decoded) => {
                    if (err) {return response.status(401).send({error : "Invalid Tokens"})};
                    id_store = decoded.id;
                }); 
                
                const [id_public] =  await connection('store')
                    .where({'id_store':id_store}).select('id_public');
                    (id_public);
    
                try {
                    const result = await connection('attendance')
                        .where({ id_list: id_list,
                                 store_id:id_public['id_public'] })
                        .update({
                            returned_items: JSON.stringify(returned_items),
                            verified:'accept'
                        });
                        if (result != 0){
                            return response.status(200).send({error : "Lista respondida com sucesso!"});
                        }
                        return response.status(400).send({error : "Erro na resposta das listas"});
                    } catch (error) { 
                        return response.status(400).send();
                    }
                }        
}