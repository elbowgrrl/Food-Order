const express = require('express');
const router  = express.Router();
const productQueries = require('../db/productQueries');
// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


router.get('/', (req, res) => {
  productQueries.getProducts()
    .then((products) => {
      res.json({products});
    });
  res.render('index');
});

module.exports = router;
