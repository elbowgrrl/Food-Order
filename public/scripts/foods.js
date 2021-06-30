/* eslint-disable no-undef */
$(() => {


  // fetch the products
  const loadFoods = () => {
    $.get(`/api/foods`)
      .then((foods) => {
        renderFoods(foods);
      });
  };

  const checkoutList = {};
  const createFoodElement = (food) => {
    const $foodPrice = food.price / 100;
    const $food = $(`
    <article class="menu-item">
      <header class="menu-header">
        <span>${food.name}</span>
        <span>$${$foodPrice}</span>
      </header>
      <body>
      <img class="food-image" src="${food.url_image}">
      </body>
      <footer class="menu-footer">
      <button type="submit" class="confirm">Add to cart</button>
      <button type="submit" class="more-info">More info</button>
    </footer>
    </article>
    `);


    let quantity = 0;
    const $addToCart = $(`.confirm`)
      .click(function() {
        const object = {};
        quantity++;
        const { name, price, id } = food;
        object['name'] = name;
        object['price'] = price;
        object['foodId'] = id;
        object['totalPrice'] = price * quantity;
        object['quantity'] = quantity;
        checkoutList[id] = object;
      });
    const $moreInfo = $(`.more-info`)
      .click(function() {});


    return $food;
  };

  const renderFoods = (foods) => {
    //Please keep this ID
    const $foodList = $('#main-container');
    $foodList.empty();
    for (const food of foods) {
      $foodList.append(createFoodElement(food));
    }
  };

  const $cart = $(`#cart`)
    .click(function() {
      const $checkout = $(`
        <article class="center">
          <header>
            <span class="title">Checkout</span>
            <span class="customer-name">Customer Name</span>
          </header>
          <table>
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Item</th>
                <th>Remove</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Pizza</td>
                <td><button type="submit" class="confirm">Remove</button></td>
                <td>$16.99</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Burger</td>
                <td><button type="submit" class="confirm">Remove</button></td>
                <td>$12.99</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Bubble Tea</td>
                <td><button type="submit" class="confirm">Remove</button></td>
                <td>$7.99</td>
              </tr>
            </tbody>
            <tfoot>
              <td>Special Instructions</td>
              <td></td>
              <td></td>
              <td><textarea placeholder="Please enter any special instructions for your order here"
                  name="special-instructions" rows="5" cols="33"></textarea></td>
            </tfoot>
          </table>
          <footer class="center">
            <button type="submit" class="confirm">Place Order</button>
            <span class="footer-text">Order Total: </span>
          </footer>
        </article>
      `);
    });

  loadFoods();
});











