var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.put('/:id', (req, res) => {
  res.send('Got a PUT request at /user');
});

router.delete('/:id', (req, res) => {
  res.send('Got a DELETE request at /user');
});

router.get('/:userId/books/:bookId', (req, res) => {
  res.send(req.params);
});


module.exports = router;
