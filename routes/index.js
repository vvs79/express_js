var express = require('express');
var router = express.Router();

const cookieParser = require('cookie-parser');
const cookieValidator = require('./cookieValidator');

// const app = require('../middleware/index');


// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('router index Time: ', Date.now());
  next();
}
router.use(timeLog);


const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
}
router.use(requestTime);


async function validateCookies (req, res, next) {
  await cookieValidator(req.cookies);
  next();
}

router.use(cookieParser());
// router.use(validateCookies);


/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // res.send('Hello World!');
  let responseText = 'Hello World!<br>';
  responseText += `<small>Requested at: ${req.requestTime}</small>`;
  res.send(responseText);
});

router.post('/', (req, res) => {
  res.send('Got a POST request');
});

router.all('/secret', (req, res, next) => {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});

router.get('/example/a', (req, res) => {
  res.send('Hello from A!');
});

router.get('/example/b', (req, res, next) => {
  console.log('the response will be sent by the next function ...');
  next();
}, (req, res) => {
  res.send('Hello from B!');
});


const cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

const cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

const cb2 = function (req, res) {
  res.send('Hello from C!');
}

router.get('/example/c', [cb0, cb1, cb2]);


router.get('/example/d', [cb0, cb1], (req, res, next) => {
  console.log('the response will be sent by the next function ...');
  next();
}, (req, res) => {
  res.send('Hello from D!');
});


router.route('/book')
  .get((req, res) => {
    res.send('Get a random book');
  })
  .post((req, res) => {
    res.send('Add a book');
  })
  .put((req, res) => {
    res.send('Update the book');
  });


router.get('/download_image', (request, response, next) => {
  res.download('./public/images/50_grn_30.png'); // path starts from root folder
});



module.exports = router;
