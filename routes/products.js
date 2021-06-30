const express = require('express');
const router = express.Router();
const productQueries = require('../routes/productQueries');

router.get('/', (req, res) => {
  productQueries.getProducts()
    .then((product) => {
      res.json(product);
    })
    .catch((error) => {
      console.log('Error message', error);
    })
});

router.get('/:id', (req, res) => {
  productQueries.getProductById(req.params.id)
    .then((product) => {
      res.json(product);
    });
});


module.exports = router;
