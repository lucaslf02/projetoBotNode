const router = require('restify-router').Router;
const Query = require("./controller/Query")

router.get('/specialty/:id', Query.Specialty)

