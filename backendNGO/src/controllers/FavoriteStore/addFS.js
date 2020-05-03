const connection = require('../../database/connection');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const crypto = require('crypto');

module.exports = {
    async addFavoriteStore(request, response) {
        var {id_store,name,localidade} = request.body;
        var token = request.headers.authorization;
        id_fs = crypto.randomBytes(4).toString('HEX');           
        const parts = token.split(' ');
        const [scheme, token_split] = parts;
        var favorite = new Object();
        favorite.id_store = id_store;
        favorite.name = name;
        favorite.localidade = localidade;
        
        jwt.verify(token_split,authConfig.secret, async (err, decoded) => {
            if (err) {return response.status(401).send({error : "Invalid Tokens"})};
            id_client = decoded.id;

        });
            
            const [result_favorite] = await connection('clients')
            .where({'id_client':id_client})
            .select('favorite_store');
            var all_favorite = JSON.parse(result_favorite.favorite_store);
            
            for (const property in all_favorite) {
               if (all_favorite[property]['id_store'] == id_store ) {
                return response.status(400).send({message : "A loja já está favoritada"});
               }
            }
            
            all_favorite[id_fs] = favorite;
            const result = await connection('clients')
                                .where({'id_client':id_client})
                                .update({favorite_store: JSON.stringify(all_favorite)});
            if (result == 0){
                return response.status(400).send({message : "Dados incorretos."});
            }                            
            return response.status(200).send({message : "Loja adicionada aos Favoritos!"});
       
    }
}
