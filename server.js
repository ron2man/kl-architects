const express = require('express');
const app = express();

// const config = require('./config/config');

const history = require('connect-history-api-fallback');
app.use(history())

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({type: '*/*'}))

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:8080','http://kl-architects.co.il/'],
  credentials: true // enable set cookie
}))

const emailRoutes = require('./api/email/email.routes')
app.use('/api/email', emailRoutes)




// const errorHandler = require('./middlewares/errorHandler.middleware')
// global error handler
// app.use(errorHandler);
// app.set('trust proxy', '178.79.162.191')


// MUST BE AFTER ROUTES
app.use(express.static('public'));

const PORT = process.env.PORT || 3025;
const NOVE_ENV = process.env.NOVE_ENV || 'development'
app.listen(PORT);