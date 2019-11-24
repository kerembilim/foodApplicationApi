var express = require('express');
var router = express.Router();

const dbConnection = require('../helper/dbHelper');
const connection = dbConnection();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/all', async(req, res, next) =>{
  connection.query('SELECT * FROM Food', (err, result) => {
    res.json({result});
  });
});

router.post('/calculate', async(req, res, next) =>{
  let response = {};

   connection.query('select Food.*, group_concat(Ingredient.id) as Ingredient from Food left JOIN FoodIngredient on FoodIngredient.foodId = Food.id left join Ingredient on Ingredient.id = FoodIngredient.ıngredientId group by Food.id;', (err, result) => {
    let response = [];
    result.forEach(element => {//herbir yemek için
      const array = element.Ingredient.split(',');
      let array2 = [];
      for(let i = 0 ; i < array.length ; i++)
      {
        array2[i] = parseInt(array[i]);
      }
      const malzemeSay = array2.length;
      let totalSay = 1;
      for(let i = 0; i < req.body.ingredient.length ; i++)
      {
        if(array2.indexOf(req.body.ingredient[i]) > 0)
        {
          totalSay ++;
        }
      }
      if(malzemeSay === totalSay)
      {
        response.push(element);
      }
    });



    res.json(response);
  });



  /*req.body.ingredient.forEach((element) =>{
    console.log(element);
  });
  res.json('asd');*/
});


module.exports = router;
