const express = require('express');
const router = express.Router();

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

  router.get("/:id", (req, res) => {
    const reqParams = req.params.id;
    db.query(`SELECT * FROM orders WHERE id = $1;`, [reqParams])
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((error) => {
        console.log("Error message: ", error);
      });
  })

  return router;
};

module.exports = adminRoutes;
