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
  let response = {};

   connection.query('select Food.id, group_concat(Ingredient.id) as Ingredient from Food left JOIN FoodIngredient on FoodIngredient.foodId = Food.id left join Ingredient on Ingredient.id = FoodIngredient.ıngredientId group by Food.id;', (err, result) => {
    result.forEach(element => {
      const array = element.Ingredient.split(',');
      console.log(array);
    });
    res.json(result);
  });



  /*req.body.ingredient.forEach((element) =>{
    console.log(element);
  });
  res.json('asd');*/
});


module.exports = router;
