const express = require('express');
const router = express.Router();
const adminQueries = require('../db/adminQueries');

router.get('/', (req, res) => {
  adminQueries.getAdmin()
    .then((admin) => {
      res.json(admin);
    })
    .catch((error) => {
      console.log("Error message: ", error);
    });
});

router.patch('/:id', (req, res) => {
  adminQueries.patchAdmin()
    .then((admin) => {
      res.json(admin);
    })
    .catch((error) => {
      console.log("Error message: ", error);
    });
});

module.exports = router;
