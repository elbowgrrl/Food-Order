// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
// eslint-disable-next-line no-unused-vars
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require("cookie-session");
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(cookieSession({
  name: "session",
  keys: ["secret keys"]
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const foodsRoutes = require("./routes/foods");
const checkoutRoutes = require("./routes/checkout");
const widgetsRoutes = require("./routes/widgets");
const adminRoutes = require("./routes/admin");
const searchRoutes = require("./routes/search");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/foods", foodsRoutes(db));
app.use("/api/checkout", checkoutRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/admin", adminRoutes(db));
app.use("/api/search", searchRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("menu");
});

app.get('/login/:id', (req, res) => {
  req.session.userId = req.params.id;
  res.redirect('/');
});

app.get("/admin", (req, res) => {
  res.render("admin");
});

app.get("/admin/:orderid", (req, res) => {
  const reqParam = req.params.orderid;
  res.render("adminOrder" , { reqParam });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
