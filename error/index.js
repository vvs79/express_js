const express = require('express');
var fs = require('fs');
const app = express();


app.get('/error/1', (req, res) => {
  throw new Error('BROKEN /error/1'); // Express will catch this on its own.
});


app.get('/err/file', (req, res, next) => {
  fs.readFile('/file-does-not-exist', (err, data) => {
    if (err) {
      next(err); // Pass errors to Express.
    } else {
      res.send(data);
    }
  })
});


app.get('/err/2', (req, res, next) => {
  setTimeout(() => {
    try {
      throw new Error('BROKEN /err/2');
    } catch (err) {
      next(err);
    }
  }, 100);
});



app.get('/a_route_behind_paywall',
  (req, res, next) => {
    if (!req.user.hasPaid) {
      // continue handling this request
      next('route');
    } else {
      next();
    }
  }, (req, res, next) => {
    PaidContent.find((err, doc) => {
      if (err) return next(err);
      res.json(doc);
    });
  });


function logErrors (err, req, res, next) {
  console.error('logErrors => ', err.stack);
  next(err);
}


function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'clientErrorHandler Something failed! => ' + err });
  } else {
    next(err);
  }
}

function errorHandler (err, req, res, next) {
  // if (res.headersSent) {
  //   return next(err);
  // }
  res.status(500);
  console.log('errorHandler => ', err);
  res.render('error', { error: err, message: "errorHandler" });
}


// app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);







module.exports = app;
