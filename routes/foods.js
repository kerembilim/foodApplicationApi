var express = require('express');
var router = express.Router();

const dbConnection = require('../helper/dbHelper');
const connection = dbConnection();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/sql', async(req, res, next) =>{
  connection.query('SELECT * FROM Food', (err, result) => {
    res.json({result});
  });
});
router.post('/calculate', async(req, res, next) =>{
  console.log(req.body.ingredient);
  let malzemeSay=0;
  let sqlText = 'select count(*),FoodIngredient.foodId,`Food`.`name` from FoodIngredient  INNER JOIN Food on Food.id = FoodIngredient.foodId GROUP by FoodIngredient.foodId ';
  connection.query(sqlText, (err, result) => {
      result.map(index=>{//yemeklerin hepsini dönüyor
        //console.log(index);//yemekler
        connection.query('select * from FoodIngredient WHERE foodId ='+index.foodId, (err, result2) => {//yemeklerin malzemelrinş dönüyor
          
          let op = req.body.ingredient.every(element => result2.indexOf(element) > -1);
          console.log(result2);
      });
          
      });
    res.json({result});
  });
});


module.exports = router;
