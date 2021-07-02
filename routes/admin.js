const express = require('express');
const router = express.Router();
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// /api/admin
const adminRoutes = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM orders;`)
      .then((response) => {
        res.json(response.rows);
      })
      .catch((error) => {
        console.log("Error message: ", error);
      });
  });
  // /api/admin/:orderId
  router.get("/:orderid", (req, res) => {
    const reqParams = req.params.orderid;
    db.query(`
    SELECT orders.id,
           foods.name,
           order_foods.quantity AS quantity,
           foods.price AS price,
           SUM(foods.price*quantity) AS total_price,
           orders.special_instructions AS special_instruction
    FROM orders
    JOIN order_foods ON order_foods.order_id = orders.id
    JOIN foods ON food_id = foods.id
    WHERE orders.id = $1
    GROUP BY orders.id,
             foods.name,
             order_foods.quantity,
             foods.price,
             orders.special_instructions
    ;`, [reqParams])
      .then((response) => {
        res.json(response.rows);
      })
      .catch((error) => {
        console.log("Error message: ", error);
      });
  });

  router.post("/:orderId", (req, res) => {
    const reqParams = req.params.orderId;
    console.log(reqParams);
    db.query(`
    DELETE FROM orders WHERE orders.id = $1;
    `, [reqParams])
      .catch((error) => {
        console.log("Error message: ", error);
      });

    client.messages
      .create({
        body: 'Order is completed. Please come and pick up',
        from: process.env.YOOMMI_CONTACT,
        to: process.env.CUSTOMER_CONTACT
      })
      .then(message => console.log(message.sid))
      .catch(error => console.log(error.message));
    res.json({ success: true });
  });

  return router;
};

module.exports = adminRoutes;


