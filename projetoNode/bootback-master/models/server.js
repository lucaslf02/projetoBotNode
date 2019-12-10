const restify = require('restify');
const server = restify.createServer()
const routes = require("./routes")

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(restify.Router.apply(routes))
server.listen(3000, function () {
    console.log('%s listening at %s', server.name, server.url);
});

