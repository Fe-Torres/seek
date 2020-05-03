const connection = require('../../database/connection');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = {
    async deleteFavoriteStore(request, response) {
        var {id_favorite} = request.body;
        var token = request.headers.authorization;
        var store_exists = 0; 
        const parts = token.split(' ');
        const [scheme, token_split] = parts;
        
        jwt.verify(token_split,authConfig.secret, async (err, decoded) => {
            if (err) {return response.status(401).send({error : "Invalid Tokens"})};
            id_client = decoded.id;
        });
            
        const [result_favorite] = await connection('clients')
        .where({'id_client':id_client})
        .select('favorite_store');
        var all_favorite = JSON.parse(result_favorite.favorite_store);
        
        if(all_favorite[id_favorite]){
            store_exists = 1;
        }    
        
        if (store_exists == 0) {
            return response.status(400).send({message : "Loja não encontrada"});  
        };

        delete(all_favorite[id_favorite]);
        const result = await connection('clients')
                            .where({'id_client':id_client})
                            .update({favorite_store: JSON.stringify(all_favorite)});
        if (result == 0){
            return response.status(400).send({message : "Dados incorretos."});
        }                            
        return response.status(200).send({message : "Loja removida com sucesso!"});
    }
}
