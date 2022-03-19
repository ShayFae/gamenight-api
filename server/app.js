// declarations
require('dotenv').config()
const { ENVIROMENT, PORT } = process.env;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/usersRoutes');
const appointmentsRoutes = require('./routes/appointmentsRoutes');
const gamesRoutes = require('./routes/gamesRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const socketIo = require("socket.io");
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// io.on('connection', () => {
// 	console.log('A PLAYER HAS JOINED THE ARENA')
// })

// middleware setup
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());

// db connection
const db = require('./configs/db.config');

// routes
app.use('/api/users', usersRoutes(db));
app.use('/api/appointments', appointmentsRoutes(db));
app.use('/api/games', gamesRoutes(db));
app.use('/api/categories', categoriesRoutes(db));


app.get('/', (req, res) => {
	res.json({ greetings: 'hello world' });
})

io.on('connection', () => {
	console.log('a user connected');
});


server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));