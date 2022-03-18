// declarations
require('dotenv').config()
const { ENVIROMENT, PORT } = process.env;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const usersRoutes = require("./routes/usersRoutes");
const gamesRoutes = require("./routes/gamesRoutes");

const app = express();

// middleware setup
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());

// db connection
const db = require('./configs/db.config');

// routes
app.use('/users', usersRoutes(db));
app.use('/games', gamesRoutes(db));

app.get('/', (req, res) => {
	res.json({ greetings: 'hello world' });
})

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));