let server = require("server.js") 
let errs = require('restify-errors');
let knexconfig = require('../knex_config');
let knex = knexconfig.knex_config();


class Specialty{
    async getSpecialityById(req, res){
        
            let { id } = req.params;
            id = id.replace('-', '/');
          
            knex('especialidade')
                .where('cNmEspecialidade', id)
                .first()
                .then((dados) => {
                    if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
                    res.send(dados);
        
                }, next);
        
        
    }
    async QuerySpeciality(req, res){
        knex.raw(`SELECT ESPECIALIDADE = LTRIM(RTRIM(cNmEspecialidade))
                    FROM ESPECIALIDADE WITH(NOLOCK)`)
                .then((resultado) => {res.send(resultado)});
            };
}
module.exports = new Specialty()
        