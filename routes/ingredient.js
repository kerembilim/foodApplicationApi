var express = require('express');
var router = express.Router();

const dbConnection = require('../helper/dbHelper');
const connection = dbConnection();

/* GET ingredient listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/sql/:id',async(req, res, next) =>{
  connection.query('SELECT * FROM Ingredient where id = '+req.params.id, (err, result) => {
    res.json({result});
  });
});

router.get('/all', async(req, res, next) =>{
  connection.query('SELECT * FROM   Ingredient', (err, result) => {
    res.json({result});
  });
});


module.exports = router;
