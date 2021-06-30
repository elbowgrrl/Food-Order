const { response } = require('express');
const db = require('./db');

const getProducts = () => {
  return db
    .query('SELECT * FROM items;')
    .then((response) => {
      console.log("reponse", response.rows);
      return response.rows;
    })
    .catch((error) => {
      console.error("Error message:", error);
    });
};

const getProductsById = (id) => {
  return db
    .query('SELECT * FROM items WHERE id = 1')
    .then((response) => {
      return response.rows[0];
    })
    .catch((error) => {
      console.error("Error message:", error);
    });
}

module.exports = {
  getProducts,
  getProductsById
};
