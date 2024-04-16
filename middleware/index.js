const express = require('express');
const app = express.Router();


app.use((req, res, next) => {
  console.log('mw index Time:', Date.now());
  next();
});


app.use('/user/:id', (req, res, next) => {
  console.log('Request Type:', req.method);
  next();
}, (req, res, next) => {
  console.log('Request URL:', req.originalUrl);
  next();
}, (req, res, next) => {
  console.log('Request Type:', req.method);
  next();
});


app.get('/user/:id', (req, res, next) => {
  console.log('ID:', req.params.id);
  next();
}, (req, res, next) => {
  // res.send('User Info');
  console.log('User Info');
  next();
});

app.get('/user/:id', (req, res, next) => {
  res.send(req.params.id);
});




module.exports = app;
