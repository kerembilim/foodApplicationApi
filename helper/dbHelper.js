const mysql = require('mysql');

module.exports = () => {
  return mysql.createConnection({
    host: '51.136.56.78',
    user: 'root',
    password: 'my-secret-pw',
    database: 'FoodDb'
  });
}