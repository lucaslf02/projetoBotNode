let errs = require('restify-errors');
let knexconfig = require('../knex_config');
let knex = knexconfig.knex_config();


class Hospitality{
    async getHospitalityById(req, res){
        const { id } = req.params;

        knex('hospital')
            .where('cNmHospital', id)
            .first()
            .then((dados) => {
                if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
                res.send(dados);
            
            }, next);
    
    };

    async getHospitality(req, res){
    knex.raw(`EXEC consultaUnidades`)
            .then((resultado) => {res.send(resultado)});
      };
}
module.exports = new Hospitality()