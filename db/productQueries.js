const db = require('./db');

const getProducts = () => {
  return db
    .query('SELECT * FROM widgets;')
    .then((response) => {
      console.log("reponse", response.rows);
      return response.rows;
    })
    .catch((error) => {
      console.error("Error message:", error);
    });
};

module.exports = {
  getProducts
};
