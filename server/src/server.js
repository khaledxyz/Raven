const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv").config();
const chalk = require('chalk');
const internalIp = require('internal-ip');

const { errorHandler } = require('./middleware/errorMiddleware');
const { connectDB } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// * Middleware * //
app.use(cors({origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

// * Connection * //
app.listen(PORT, () => {console.log(`
    ${chalk.yellow('Dev server running at')}
        > Local: ${chalk.blue(`http://localhost:${PORT}`)}
        > Network: ${chalk.blue(`http://${internalIp.v4.sync()}:${PORT}`)}
`); connectDB()});

// * ROUTES * //
app.use('/api/goals', require('./routes/goalsRouter'));
app.use('/api/users', require('./routes/usersRouter'));