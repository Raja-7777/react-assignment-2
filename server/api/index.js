const app = require('express').Router();
const path = require('path');
const {enableAuth} = require('../config');

const jsonServer = require('json-server');
const router = jsonServer.router(path.join(__dirname, '..', 'db.json'));

app.use(require('body-parser').json());

app.use('/auth/v1', require('./auth'));

if(enableAuth) {
  const authorize = require('./auth/authorize');
  
  app.get('/api/v1/news(|/*)',authorize(['news:all', 'news:read']))
 
}

app.use('/api/v1', router);

app.use((err, req, res, next) => {
  if(err) { next(); }
  console.log('err:', err);
});

module.exports = app;
