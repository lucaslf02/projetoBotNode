let server = require("server.js") 
let dateFormat = require('dateformat');
let errs = require('restify-errors');

class Specialty{
    async getSpeciality(req, res){
        server.get('/specialty/:id', (req, res, next) => {
            let { id } = req.params;
            id = id.replace('-', '/');
          
            knex('especialidade')
                .where('cNmEspecialidade', id)
                .first()
                .then((dados) => {
                    if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
                    res.send(dados);
        
                }, next);
        
        });
    }
}



server.get('/tipoConsulta/:id', (req, res, next) => {
    const { id } = req.params;

    knex('TIPO_CONSULTA')
        .where('nCdTpConsulta', id)
        .first()
        .then((dados) => {
            if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.send(dados);
        }, next);
});

server.get('/retornarConsulta/:id', function(req, res) {
    let nConsulta = req.params.id;
    knex.raw(`EXEC informacoesConsulta ?`,[nConsulta])
                                        .then((resultado) => {res.send(resultado)});
      });


server.get('/retornarExame/:id', function(req, res) {
    let nCdExame = req.params.id;
    knex.raw(`EXEC informacoesExame ?`,[nCdExame])
                                        .then((resultado) => {res.send(resultado)});
      });

server.get('/consultaUnidades', function(req, res) {
    knex.raw(`EXEC consultaUnidades`)
            .then((resultado) => {res.send(resultado)});
      });

server.get('/consultaEspecialidades', function(req, res) {
knex.raw(`SELECT ESPECIALIDADE = LTRIM(RTRIM(cNmEspecialidade))
            FROM ESPECIALIDADE WITH(NOLOCK)`)
        .then((resultado) => {res.send(resultado)});
    });

server.get('/consultaTipoExame', function(req, res) {
    knex.raw(`SELECT TPEXAME = LTRIM(RTRIM(cNmTpExame))
                FROM TIPO_EXAME WITH(NOLOCK)`)
            .then((resultado) => {res.send(resultado)});
        });

        server.get('/r/horarios/datasdisponiveis/:nCdEspecialidade/:nCdHospital', (req, res, next) => {
            const { nCdEspecialidade } = req.params;
            const { nCdHospital } = req.params;
            let data_atual = new Date();
            let data_futura = new Date();
            data_futura.addMonths(parseInt(3));
            console.log("Bateuuu" + data_atual + " --- " + data_futura);
        
        
            // const { meses } = req.params;
            // data_futura.addMonths(parseInt(meses));
            let sql = `EXEC consultaDatasDisponiveis '${dateFormat(data_atual, 'yyyymmdd')}', '${dateFormat(data_futura, 'yyyymmdd')}', ?, ? `;
        
            knex.raw(sql, [nCdHospital, nCdEspecialidade]).then(function (dados) {
                console.log('testing1');
                if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
                res.send(dados);
                console.log('testing2');
            });
        });
        server.get('/r/horarios/horasdisponiveis/:nCdEspecialidade/:nCdHospital/:data', (req, res, next) => {
   
            let { nCdEspecialidade } = req.params;
            let { nCdHospital } = req.params;
            let { data } = req.params;
            let sql = `
                SELECT HORA_INICIAL = (CONVERT(VARCHAR(12),HORARIOS.dHoraInicial,108))
                ,HORARIOS.nCdHorario FROM HORARIOS WITH(NOLOCK)
                        INNER JOIN MEDICO_ESPECIALIDADE ON MEDICO_ESPECIALIDADE.nCdMedico = HORARIOS.nCdMedico
                    WHERE CONVERT(DATE,HORARIOS.dHoraInicial)  = CONVERT(DATE, ?)       
                        AND MEDICO_ESPECIALIDADE.nCdEspecialidade = ?
                        AND HORARIOS.nCdHospital = ?
                        AND (
                            not EXISTS(SELECT 1 FROM CONSULTA WITH(NOLOCK) WHERE CONSULTA.nCdHorario = HORARIOS.nCdHorario)
                            and not EXISTS(SELECT 1 FROM EXAME WITH(NOLOCK) WHERE EXAME.nCdHorario = HORARIOS.nCdHorario )
                        ) ORDER BY HORARIOS.dHoraInicial`;
            knex.raw(sql, [data, nCdEspecialidade, nCdHospital]).then(function (dados) {
                console.log('testing1');
                if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
                res.send(dados);
                console.log('testing2');
            });
            console.log('tested');
        });
        
        server.get('/CONSULTA', (req, res, next) => {
            console.log(req.body);
        
            knex.select().from('CONSULTA').then(function (CONSULTA) {
                res.send(CONSULTA);
            })
        });
        
            server.post('/CONSULTA', function(req, res) {
                let paramCodHorario =  req.body.nCdHorario;
                  let paramCodPaciente = req.body.nCdPaciente;
                  let nCdEspecialidade = req.body.nCdEspecialidade;
                  console.log("Entrou" + '....' + nCdEspecialidade);
                    knex.raw(`exec inserirConsulta ?, ?, ? `, [paramCodHorario,paramCodPaciente,nCdEspecialidade])
                      .then(function() {
                          knex.select('nCdConsulta').from('CONSULTA').where('nCdHorario', paramCodHorario).
                            then(function(CONSULTA){
                              res.send(CONSULTA);
                        })
                    })
             });
             server.get('/horarios/:id', (req, res, next) => {

                const { id } = req.params;
            
                knex('HORARIOS')
                    .where('nCdHorario', id)
                    .first()
                    .then((dados) => {
                        if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
                        res.send(dados);
            
                    }, next);
            
            });

module.exports = new Specialty()
        