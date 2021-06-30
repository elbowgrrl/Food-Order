const express = require('express');
const router  = express.Router();

module.exports = () => {

  router.get('/', (req, res) => {
    res.json({ success: true });
  });

  router.post("/", (req, res) => {
    res.json({ success: true });
  });

  return router;
};



