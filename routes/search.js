const express = require("express");
const router = express.Router();

const searchRoutes = (db) => {
  //api/search/:foodName
  router.get("/:foodName", (req, res) => {
    // console.log("req.params.foodName: ", req.params.foodName);
    const reqParam = req.params.foodName.split("=")[1];
    // console.log("reqParam after split: ", reqParam);
    const reqParamSplit = reqParam.slice(1, -1);
    const search = `%${reqParamSplit}%`;
    db.query(`
    SELECT * FROM foods
    WHERE foods.name LIKE $1;
    `, [search])
    .then((response) => {
      res.json(response.rows);
    })
    .catch((error) => {
      console.log(error);
    })
  })

  return router;
}

module.exports = searchRoutes;
