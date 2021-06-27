const db = require('./db');

const getCart = () => {
  db.query('SELECT * FROM orders')
    .then((response) => {
      return response.rows;
    })
    .catch((error) => {
      console.log("Error message: ", error);
      return;
    });
};

// const getCartById = (id) => {
//   db.query('SELECT * FROM carts WHERE id = $1', [id])
//     .then((response) => {
//       return response.rows[0];
//     })
//     .catch((error) => {
//       console.log("Error message: ", error);
//       return;
//     });
// };

// const postCartById = (options) => {
//   const queryParams = [];
//   const queryStr = ``;

//   if (options.addFood) {
//     queryParams.push(`${options.addFood}`);
//     queryStr += `INSERT INTO carts (user_id, item_id price, quantity)
//     VALUES (VALUE OF PRICE, VALUE OF QUANTITY)`,
//   }
// }

module.exports = {
  getCart,
  getCartById
};
