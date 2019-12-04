let server = require("server.js") 
let dateFormat = require('dateformat');
let errs = require('restify-errors');

server.get('/r/horarios/exame/horasdisponiveis/:nCdHospital/:data', (req, res, next) => {
    console.log('teste');

    let { codExame } = req.params;
    let { nCdHospital } = req.params;
    let { data } = req.params;

    console.log(codExame);
    console.log(nCdHospital);
    console.log(data);
    
    let sql = `
        SELECT HORA_INICIAL = (CONVERT(VARCHAR(12),HORARIOS.dHoraInicial,108))
        ,HORARIOS.nCdHorario FROM HORARIOS WITH(NOLOCK)
               
            WHERE CONVERT(DATE,HORARIOS.dHoraInicial)  = CONVERT(DATE, ?)       
               
                AND HORARIOS.nCdHospital = ?
                AND (
                    not EXISTS(SELECT 1 FROM CONSULTA WITH(NOLOCK) WHERE CONSULTA.nCdHorario = HORARIOS.nCdHorario)
                    and not EXISTS(SELECT 1 FROM EXAME WITH(NOLOCK) WHERE EXAME.nCdHorario = HORARIOS.nCdHorario )
                ) ORDER BY HORARIOS.dHoraInicial`;
    knex.raw(sql, [data, nCdHospital]).then(function (dados) {
        console.log('testing1');
        if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
        res.send(dados);
        console.log('testing2');
    });
    console.log('tested');
});

server.get('/exame', (req, res, next) => {
    console.log(req.body);

    knex.select().from('EXAME').then(function (EXAME) {
        res.send(EXAME);
    })
});

    server.post('/exame', function(req, res) {
        let paramCodHorario =  req.body.nCdHorario;
          let paramCodPaciente = req.body.nCdPaciente;
          let nCdExame = req.body.nCdExame;
          console.log("Entrou" + '....' + nCdExame);
            knex.raw(`exec inserirExame ?, ?, ? `, [paramCodHorario,paramCodPaciente,nCdExame])
              .then(function() {
                  knex.select('nCdExame').from('EXAME').where('nCdHorario', paramCodHorario).
                    then(function(EXAME){
                      res.send(EXAME);
                })
            })
     });

     server.get('/exame/:id', (req, res, next) => {
        let { id } = req.params;
        console.log("Id do parame " + id);
        
        id = id.replace('-', '/');
        console.log(id);
    
        knex('TIPO_EXAME')
            .where('cNmTpExame','like', "%"+id+"%")
            .first()
            .then((dados) => {
                if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
                res.send(dados);
    
            }, next);
    
    });


    server.get('/r/horarios/exame/datasdisponiveis/:nCdHospital', (req, res, next) => {
    
    const { nCdHospital } = req.params;
    let data_atual = new Date();
    let data_futura = new Date();
    data_futura.addMonths(parseInt(3));
    console.log("Bateuuu na data" + data_atual + " --- " + data_futura);
    console.log("nCdHospital ====  " +nCdHospital );
    

    // const { meses } = req.params;
    // data_futura.addMonths(parseInt(meses));
    let sql = `EXEC consultaDatasDisponiveis '${dateFormat(data_atual, 'yyyymmdd')}', '${dateFormat(data_futura, 'yyyymmdd')}', ? `;

    knex.raw(sql, [nCdHospital]).then(function (dados) {
        console.log('testing1');
        if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
        res.send(dados);
        console.log('testing2');
    });
});
