const express = require('express');
const router  = express.Router();


const getIdAndQuantity = (data) => {
  const array = [];
  for (const each in data) {
    const { id, quantity} = data[each];
    array.push([parseInt(id), parseInt(quantity)]);
  }
  return array;
};


module.exports = (db) => {

  router.get('/', (req, res) => {
    res.json({ success: true });
  });

  router.post("/", (req, res) => {
    const userId = req.session.userId;
    const data = req.body;
    const specialInstruction = data['special_instructions'];
    delete data['special_instructions'];
    const FoodIdsAndQuantities = getIdAndQuantity(data);
    let orderId = 0;

    db.query(`
      INSERT INTO orders (user_id, special_instructions)
      VALUES($1, $2) RETURNING id;
      `, [userId, specialInstruction])
      .then(id => {
        orderId = id.rows[0].id;
      })
      .then(() => {
        for (const IdAndQuantity of FoodIdsAndQuantities) {
          IdAndQuantity.unshift(orderId);
          console.log(IdAndQuantity);
          db.query(`
          INSERT INTO order_foods (order_id, food_id, quantity)
          VALUES($1, $2, $3);
          `, IdAndQuantity);
        }
      });


    res.json({ success: true });
  });

  return router;
};



