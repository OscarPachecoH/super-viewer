const express = require('express');
const cors = require('cors');

const { PORT } = require('./src/config')
const loginRoutes = require("./src/routes/login.routes");
const tokenVerifiRoutes = require("./src/routes/token.routes");

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/', loginRoutes);

app.use('/api/', tokenVerifiRoutes);

app.use((req, res, next) => {
    res.status(500).json({
        message: 'Endpoint not found'
    })
})

app.listen(PORT);

console.log('Server is running', PORT);