const express = require('express');
const app = express();
const router = express.Router();

// predicate the router with a check and bail out when needed
router.use((req, res, next) => {
  if (!req.headers['x-auth']) return next('router');
  next();
});

// ????? not working (router)
router.get('/item/:id', (req, res) => {
  res.send('Got an item');
});

// use the router and 401 anything falling through
app.use('/admin', router, (req, res) => {
  res.sendStatus(401);
  // res.sendStatus(404, 'application/json', '{"error":"resource not found"}');
});


// app.response.sendStatus = function (statusCode, type, message) {
//   // code is intentionally kept simple for demonstration purpose
//   return this.contentType(type)
//              .status(statusCode)
//              .send(message);
// }

// // Use FakeRequest and FakeResponse in place of http.IncomingRequest and http.ServerResponse
// // for the given app reference
// Object.setPrototypeOf(Object.getPrototypeOf(app.request), FakeRequest.prototype);
// Object.setPrototypeOf(Object.getPrototypeOf(app.response), FakeResponse.prototype);



module.exports = app;
