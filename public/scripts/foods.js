$(() => {
  console.log("ready!");

  const loadFoods = () => {
    // fetch the products
    $.get(`/api/foods`)
      .then((foods) => {
        console.log(foods);
        renderFoods(foods.reverse());
      });
  };


  const createFoodElement = (food) => {
    const $food = $(`
      <div class="foods">
        <h2>Product Name: ${food.name}</h2>
        <h3>Price: $${food.price}</h3>
      </div>
    `);
    return $food;
  };

  const renderFoods = (foods) => {
    const $foodList = $('body');
    $foodList.empty();
    for (const food of foods) {
      $foodList.append(createFoodElement(food));
    }
  };

  loadFoods();
});


