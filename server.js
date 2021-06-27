// load .env data into process.env
require('dotenv').config();

// Web server config

const express    = require('express');
const bodyParser = require('body-parser');
const sass       = require('node-sass-middleware');
const morgan     = require('morgan');
const db = require('./db/db');
const app        = express();
const PORT       = process.env.PORT || 8080;


// PG database client/connection setup


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/styles', sass({
  src: __dirname + '/styles',
  dest: __dirname + '/public/styles',
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const widgetsRoutes = require('./routes/widgets');
const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const indexRoutes = require('./routes/index');
const { checkout } = require('./routes/users');
//---------------------------------------
const cartRoutes = require('./routes/cart');
const checkoutRoutes = require('./routes/checkout');
const productsRoutes = require('./routes/admin');
//---------------------------------------
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own

app.use('/api/users', usersRoutes);
app.use('/api/widgets', widgetsRoutes(db));
app.use('/home', indexRoutes);
//---------------------------------------
app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/admin', adminRoutes);
//---------------------------------------

// Note: mount other resources here, using the same pattern above


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
