
# get         /foods
  * looking at all foods
  * searching

# get         /foods/:id
  * display specific food

# patch/put   /foods/:id
  * category? (optional)
# post        /foods

# delete      /foods/:id
  * remove item from cart




# get         /cart
  * see foods on carts
  * see total price

# patch/put   /cart/:id
  

# post   /cart/:id
  * adding food to cart
  * add quantity to cart
  * post special requirements



# get  /login
  * display login form
# post /login/:id
  * user can login
# post /logout

# get /user (? or user/:id?) 
  * see order history


# get /checkout
  * see user info and payment method 
  * order completion time
# post /checkout/:id
  * ordering food



# get /admin
  * owner sees orders

# patch or post /admin/:id 
  * can accept order
  * infrom food completion
  * inform order completion