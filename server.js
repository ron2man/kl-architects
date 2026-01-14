const express = require('express');
const compression = require('compression');
const app = express();

app.set('etag', 'strong');
app.set('x-powered-by', false);

app.use(compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// const config = require('./config/config');

const history = require('connect-history-api-fallback');
app.use(history({
  disableDotRule: true,
  htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
}))

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


app.use((req, res, next) => {
  if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (req.path.endsWith('.html') || (!req.path.includes('.') && req.method === 'GET')) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
  next();
});

app.use(express.static('public', {
  etag: true,
  lastModified: true,
  maxAge: 0
}));

const PORT = process.env.PORT || 3025;
const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV === 'production') {
  app.enable('trust proxy');
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`);
});