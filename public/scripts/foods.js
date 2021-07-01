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

    });
  };


  const createFoodElement = function(food) {
    const $foodInfo = `
    <article class="menu-item">
      <header class="menu-header">
        <span>${food.name}</span>
        <span>$${food.price}</span>
      </header>
      <body>
        <img class="food-image" src="${food.url_image}">
      </body>
      <footer class="menu-footer">
        <button class='confirm add-to-cart' id="${food.id}">Add to cart</button>
        <button class="more-info" id='${food.id}'>More info</button>
      </footer>
    </article>
    `;

    return $foodInfo;
  };

});
