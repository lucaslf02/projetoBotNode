let server = require("server.js");
let errs = require('restify-errors');
server.get('/hospital/:id', (req, res, next) => {

    const { id } = req.params;

    knex('hospital')
        .where('cNmHospital', id)
        .first()
        .then((dados) => {
            if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.send(dados);

        }, next);

});