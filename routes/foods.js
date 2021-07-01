const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const query = `SELECT * FROM foods LIMIT 9`;
    db.query(query)
      .then(data => {
        const foods = data.rows;
        res.json(foods);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/", (req, res) => {
    const query = `SELECT * FROM foods where id = $1;`;
    db.query(query)
      .then(data => {
        const foods = data.rows;
        res.json(foods);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};




