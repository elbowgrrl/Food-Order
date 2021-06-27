const express = require('express');
const router = express.Router();
const cartQueries = require('../db/cartQueries');

router.get('/', (req, res) => {
  cartQueries.getCart()
    .then((cart) => {
      res.json(cart);
    })
    .catch((error) => {
      console.log("Error message: ", error);
    });
});

router.patch('/:id', (req, res) => {
  cartQueries.getCartById()
    .then((cart) => {
      res.jason(cart);
    })
    .catch((error) => {
      console.log("Error message: ", error);
    });
});

router.post('/:id', (req, res) => {
  cartQueries.postCartById()
    .then((cart) => {
      res.json(cart);
    });
});

module.exports = router;
