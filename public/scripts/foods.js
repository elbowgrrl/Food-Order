/* eslint-disable no-undef */
const foodList = {};

$(() => {
  // fetch the products
  const loadFoods = () => {
    $.get(`/api/foods`).then((foods) => {
      renderFoods(foods.reverse());
    });
  };
  loadFoods();

  const renderFoods = (foods) => {
    const $foodList = $(".main-container");
    $foodList.empty();
    let foodContainer = [];
    for (const food of foods) {
      foodContainer.push(createFoodElement(food));
    }
    $foodList.append(foodContainer.join(" "));

    $(".add-to-cart").click((event) => {
      const id = parseInt(event.target.id);

      for (const food of foods) {
        if (food.id === id) {
          foodList[id] = food;
        }
      }
      if (!foodList[id]["quantity"]) {
        foodList[id]["quantity"] = 1;
      } else {
        foodList[id]["quantity"] += 1;
      }
    });

    $(".more-info-button").click((event) => {
      const $foodContainer = $(".main-container");
      const id = parseInt(event.target.id);
      console.log("id", id);
      $foodContainer.empty();
      $.get(`/api/foods/${id}`)
        .then((food) => {
          const element = createMoreInfoElement(food);
          $foodContainer.append(element);

          $("#back-to-menu").click((event) => {
            const $foodContainer = $(".main-container");
            $foodContainer.empty();
            console.log("clicked", event);
            $.get(`/api/foods`)
              .then((foods) => {
                renderFoods(foods.reverse());
              });
          });

        });
    });
  };



  $(`#cart`).click(function() {
    renderFoodList(foodList);
  });


  const getTotalPrice = (foodList) => {
    let totalPrice = 0;
    for (const key in foodList) {
      const { price, quantity } = foodList[key];
      totalPrice += price * quantity;
    }
    return totalPrice;
  };

  const getEstimatedTime = (foodList) => {
    let longestlongest = 0;
    let numberOfDishes = 0;
    console.log(foodList);
    for (const key in foodList) {
      // eslint-disable-next-line camelcase
      const { cooking_time, quantity } = foodList[key];
      // eslint-disable-next-line camelcase
      if (longestlongest < cooking_time * quantity) {
        // eslint-disable-next-line camelcase
        longestlongest = cooking_time * quantity;
      }
      numberOfDishes += 1 * quantity;
    }
    return longestlongest + (2 * numberOfDishes);
  };

  const renderFoodList = (foodList) => {
    const $foodList = $('.main-container');
    $foodList.empty();


    const $checkout = $(`
      <article class="cart-article">
        <button id='back-memu'>Back to menu</button>
        <h1>Checkout</h1>
        <div class='cart-table-box'>
          <table class="cart-table">
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Item</th>
                <th>Price</th>
                <th>Net Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody class='food-container'>
            </tbody>
          </table>
        </div>
        <div>
          <form id="place_order">
            <span class="footer-text"></span>
            <span class="estimated-time"></span>
            <br>
            <label for="special_instructions">Special Instructions</label>
             <textarea placeholder="Please enter any special instructions for your order here" name="special_instructions" rows="5"></textarea>
             <button type="submit" class="confirm">Place Order</ button>
          </form>

        </div>

      </article>
    `);


    $foodList.append($checkout);


    const $foodContainer = $(`.food-container`);
    let foodContainer = [];
    for (const foodInfo in foodList) {
      foodContainer.push(createFoodList(foodList[foodInfo]));
    }


    $foodContainer.append(foodContainer.join(', '));


    $(`.footer-text`).text(`Order Total: $${getTotalPrice(foodList) / 100}`);

    $(`.estimated-time`).text(`Estimated Order Completion Time: ${getEstimatedTime(foodList)} min(s)`);

    $(".reduce-quantity").click((event) => {
      const id = event.target.id;
      if (foodList[id].quantity <= 1) {
        delete foodList[id];
      }
      if (foodList[id]) {
        foodList[id].quantity -= 1;
      }
      renderFoodList(foodList);
    });

    const $placeOrder = $("#place_order")
      .submit(function(event) {
        // alert("Hello");
        event.preventDefault();
        const data = $(this).serializeArray();
        const { name, value } = data[0];
        foodList[name] = value;

        $.post('/api/checkout', foodList)
          .then(() => {
            $placeOrder[0].reset();
            alert("Thank you for the order!!");
            const $foodContainer = $(".main-container");
            $foodContainer.empty();
            $.get(`/api/foods`)
              .then((foods) => {
                renderFoods(foods.reverse());
              });
          });
      });

    $("#back-memu").click(() => {
      const $foodContainer = $(".main-container");
      $foodContainer.empty();
      $.get(`/api/foods`)
        .then((foods) => {
          renderFoods(foods.reverse());
        });
    });
  };


  const createFoodList = function(foodInfo) {
    const { id, price, quantity, name } = foodInfo;
    let $food = `
      <tr id='table${id}'>
        <td class="cart-table">${quantity}</td>
        <td class="cart-table">${name}</td>
        <td class="cart-table">$${price / 100}</td>
        <td class="cart-table">$${(price * quantity) / 100}</td>
        <td class="cart-table"><button type="submit" class="reduce-quantity" id='${id}'>Remove</button></td>
      </tr>
    `;
    return $food;
  };



});



const createFoodElement = function (food) {
  price = food.price / 100;
  const $foodInfo = `
  <article class="menu-item">
    <header class="menu-header">
      <span>${food.name}</span>
      <span>$${price}</span>
    </header>
    <body>
      <img class="food-image" src="${food.url_image}">
    </body>
    <div class="menu-footer">
      <button class='add-to-cart' id="${food.id}">Add to cart</button>
      <button class="more-info-button" id='${food.id}'>More info</button>
    </div>
  </article>
  `;

  return $foodInfo;
};

const createMoreInfoElement = function(food) {
  const $moreInfo = `
  <article id="more-info-item">
  <header class="menu-header">
    <span>${food.name}</span>
    <span>$${food.price / 100}</span>
  </header>
  <div class="more-info-body">
  <body>
    <img class="food-image" src="${food.url_image}">
    <p>${food.description}</p>
  </body>
  </div>
  <footer class="menu-footer">
    <button class="confirm" id="back-to-menu">Back to Menu</button>
  </footer>
</article>
  `;

  return $moreInfo;
};
