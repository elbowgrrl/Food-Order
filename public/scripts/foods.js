/* eslint-disable no-undef */
const foodList = {};

$(() => {
  // fetch the products
  const loadFoods = () => {
    $.get(`/api/foods`)
      .then((foods) => {
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
    $foodList.append(foodContainer.join(', '));


    $(".add-to-cart").click((event) => {

      const id = parseInt(event.target.id);

      for (const food of foods) {
        if (food.id === id) {
          foodList[id] = food;
        }
      }
      if (!foodList[id]['quantity']) {
        foodList[id]['quantity'] = 1;
      } else {
        foodList[id]['quantity'] += 1;
      }
      console.log(foodList);
    });

    $(".more-info-button").click((event) => {
      const $foodContainer = $(".main-container");
      const id = parseInt(event.target.id);
      $foodContainer.empty();
      console.log("id", id);
      $foodContainer.append(createMoreInfoElement(id));

    });


  };


});



const createFoodElement = function(food) {
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
    <footer class="menu-footer">
      <button class='add-to-cart' id="${food.id}">Add to cart</button>
      <button class="more-info-button" id='${food.id}'>More info</button>
    </footer>
  </article>
  `;

  return $foodInfo;
};

const createMoreInfoElement = function(id) {
  priceInCents = id.price / 100;
  const $moreInfo = `
  <article class="menu-item">
  <header class="menu-header">
    <span>${id.name}</span>
    <span>$${priceInCents}</span>
  </header>
  <body>
    <img class="food-image" src="${id.url_image}">
  </body>
  <footer class="menu-footer">
    <button class='add-to-cart' id="${id.id}">Add to cart</button>
    <button class="more-info-button" id='${id.id}'>More info</button>
  </footer>
</article>
  `;

  return $moreInfo;
};
