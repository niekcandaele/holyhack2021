const express = require('express');
const app = express();
const router = require('./routes');

const port = 3000;

app.use('/api/', router);

app.listen(port, () => {
    console.log(`The server is listening on port ${port}`);
})
