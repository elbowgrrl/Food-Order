-- Drop and recreate Users table (Example)
CREATE DATABASE midterm;


DROP TABLE IF EXISTS carts CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  order_time TIMESTAMP DEFAULT now(),
  complete_time TIMESTAMP DEFAULT now(),
  is_paid BOOLEAN DEFAULT false,
  is_delivered BOOLEAN DEFAULT false,
  is_ready BOOLEAN DEFAULT false
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  price INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  net_price INTEGER NOT NULL
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  url_image VARCHAR(255) NOT NULL,
  price INTEGER  NOT NULL DEFAULT 0,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  quantity SMALLINT NOT NULL,
  is_ready BOOLEAN DEFAULT false,
  special_instructions TEXT,
  is_available BOOLEAN DEFAULT true,
  cooking_time INTEGER NOT NULL,
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE carts (
  id SERIAL PRIMARY KEY NOT NULL,
  item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  price INTEGER NOT NULL,
  quantity INTEGER NOT NULL
);

CREATE TABLE payments (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  payment_time TIMESTAMP DEFAULT now(),
  creditcard VARCHAR(255),
  expiryDate SMALLINT NOT NULL,
  cvv_number SMALLINT NOT NULL,
  total_amount INTEGER NOT NULL
);
