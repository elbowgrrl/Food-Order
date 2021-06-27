const express = require('express');
const router = express.Router();
const checkoutQueries = require('../db/checkoutQueries');
const { checkout } = require('./users');

router.get('/', (req, res) => {
  checkoutQueries.getCheckout()
    .then((checkout) => {
      res.json(checkout);
    });
});

router.get('/:id', (req, res) => {
  checkoutQueries.getCheckoutById()
    .then((checkout) => {
      res.json(checkout);
    });
});

module.exports = router;
