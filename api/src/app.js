const express = require('express');
const app = express();
const router = require('./routes');
const bodyParser = require('body-parser');

const port = 3000;

app.use(bodyParser.json());
app.use('/api/', router);

app.listen(port, () => {
    console.log(`The server is listening on port ${port}`);
})
