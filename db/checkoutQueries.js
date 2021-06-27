const db = require('./db');

const getCheckout = () => {
  return db
    .query('SELECT * FROM orders WHERE is_paid = 1')
    .then((response) => {
      return response.rows;
    })
    .catch((error) => {
      console.log("Error message:", error);
    });
}

const getCheckoutById = (id) => {
  return db
    .query('SELECT * FROM orders WHERE orders.id = $1', [id])
    .then((response) => {
      return response.rows[0];
    })
}

module.exports = {
  getCheckout,
  getCheckoutById
}
