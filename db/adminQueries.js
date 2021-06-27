const db = require('./db');

const getAdmin = () => {
  db.query('SELECT * FROM admin;')
    .then((response) => {
      response.rows;
    })
    .catch((error) => {
      console.log("Error message: ", error);
      return;
    });
};

const patchAdmin = (id) => {
  db.query('UPDATE items SET is_ready = 1 WHERE items.id = $1;', [id])
    .then((response) => {
      return response.rows[0];
    })
    .catch((error) => {
      console.log("Error message: ", error);
      return;
    });
}

module.exports = {
  getAdmin,
  patchAdmin
}
