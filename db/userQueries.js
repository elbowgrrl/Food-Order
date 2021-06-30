const db = require('./db');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then((response) => {
      console.log("response: ", response.rows);
      return response.rows;
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = {
  getUsers
};
