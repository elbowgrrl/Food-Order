const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {

    const order = req.body;

    for (const food in order) {

      const { userId, instruction, foodId, quantity } = food;

      const values = [userId, instruction, foodId, quantity];

      const query = `
      INSERT INTO orders (user_id, special_instructions)
      VALUES ($1, $2);

      INSERT INTO order_foods (order_id, food_id, quantity)
      VALUES ($3, $4);

      SELECT quantity, foods.name, special_instructions
      FROM orders
      JOIN order_foods ON orders.id = order_id
      JOIN foods ON food_id = foods.id;
      `;

      db.query(query, values)
        .then(data => {
          const foods = data.rows;
          res.json({ foods });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message});
        });
    }
  });
  return router;
};
