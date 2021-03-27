const express = require('express');
const app = express();
const router = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/', router);

app.listen(port, () => {
    console.log(`The server is listening on port ${port}`);
})
