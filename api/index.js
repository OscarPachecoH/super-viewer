const express = require('express');
const cors = require('cors');

const { PORT } = require('./src/config')
const loginRoutes = require("./src/routes/login.routes");
const tokenVerifiRoutes = require("./src/routes/token.routes");
const project = require("./src/routes/proyect.routes");
const expenses = require("./src/routes/expenses.routes");
const progress = require("./src/routes/progress.routes");

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/', loginRoutes);

app.use('/api/', tokenVerifiRoutes);

app.use('/api/', project)

app.use('/api/', expenses)

app.use('/api/', progress)

app.use((req, res, next) => {
    res.status(500).json({
        message: 'Endpoint not found'
    })
})

app.listen(PORT);

console.log('Server is running', PORT);