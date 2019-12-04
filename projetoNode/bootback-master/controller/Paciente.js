let server = require("server.js") 
let errs = require('restify-errors');

server.get('/', (req, res, next) => {
    knex('paciente').then((dados) => {
        res.send(dados);
    }, next)

});

server.post('/create', (req, res, next) => {
    console.log(req.body);

    knex('paciente')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
        }, next)
});

server.get('/paciente/:id', (req, res, next) => {
    const { id } = req.params;
    console.log(id);

    knex('paciente')
        .where('cCPF', id)
        .first()
        .then((dados) => {
            if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.send(dados);
        }, next)
});

server.put('/update/:id', (req, res, next) => {
    const { id } = req.params;

    knex('paciente')
        .where('id', id)
        .update(req.body)
        .then((dados) => {
            if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.send('dados atualizados');
        }, next)
});

server.del('/delete/:id', (req, res, next) => {

    const { id } = req.params;

    knex('paciente')
        .where('id', id)
        .delete()
        .then((dados) => {
            if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.send('dados excluidos');
        }, next)

});