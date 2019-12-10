let errs = require('restify-errors');

let knex = require('knex')({
    client: 'mssql',
    connection: {
        host: 'localhost',
        user: 'sa',
        password: '12345678',
        database: 'dbLucca',
        port: 1433
    }
});

class Patient{
        async getAllPatient(){
            knex('paciente').then((dados) => {
                res.send(dados);
            }, next)
        
        };

        async insertPatient(req,res){
            knex('paciente')
                .insert(req.body)
                .then((dados) => {
                    res.send(dados);
                }, next)
        };

        async getPatientByCpf(req, res){
            const { id } = req.params;
            knex('paciente')
                .where('cCPF', id)
                .first()
                .then((dados) => {
                    if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
                    res.send(dados);
                }, next)
        };

        async updatePatientByCpf(req, res){
            const { id } = req.params;
            knex('paciente')
                .where('id', id)
                .update(req.body)
                .then((dados) => {
                    if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
                    res.send('dados atualizados');
                }, next)
        };

        async deletePatientByCpf(req, res){
            const { id } = req.params;
            knex('paciente')
                .where('id', id)
                .delete()
                .then((dados) => {
                    if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
                    res.send('dados excluidos');
                }, next)
            
        };
}
module.exports = new Patient()