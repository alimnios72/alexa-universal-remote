const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json({ type: 'application/json' }));

const routes = require("./api/routes/main");
routes(app);

app.listen(port);

console.log('Alexa Universal Remote started on: ' + port);