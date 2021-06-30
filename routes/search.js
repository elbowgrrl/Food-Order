const express = require("express");
const router = express.Router();

const searchRoutes = (db) => {
  //api/search/:foodName
  router.get("/:foodName", (req, res) => {
    console.log("req.params", req.params);
    const reqParam = req.params.foodName.slice(1, -1);
    const search = `%${reqParam}%`;
    db.query(`
    SELECT * FROM foods
    WHERE foods.name LIKE $1;
    `, [search])
    .then((response) => {
      res.json(response.rows);
      //const search = response.rows
      //res.render("search", {search})
    })
    .catch((error) => {
      console.log(error);
    })
  })

  return router;
}

module.exports = searchRoutes;
