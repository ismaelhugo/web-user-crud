const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const bd = require('./bd');

const sessionStore = new MySQLStore({},  bd);

import routes from './routes';

app.use(express.json())
app.use(cors())

app.use(session({
	key: 'session_web1',
	secret: 'trabalho_web-1',
	store: sessionStore,
	resave: false,
	saveUninitialized: false,
  cookie: {
    // 1 dia em milisegundos
    maxAge: 86400000
  }
}));

app.use(routes);

app.listen(port, () => {
  console.log(`Rodando em: http://localhost:${port}`);
})