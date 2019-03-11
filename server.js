const express = require('express');
const config = require('./config')

const app = express();

app.get('/', (req, res) => {
    res.send('Server is connected')
});

const port = config.PORT

app.listen(port, () => console.log(`Server running on port: ${port}`))