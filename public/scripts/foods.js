// eslint-disable-next-line no-undef
$(() => {
  console.log("ready!");

  // fetch the products
  const loadFoods = () => {
    // eslint-disable-next-line no-undef
    $.get(`/api/foods`)
      .then((foods) => {
        console.log(foods);
        renderFoods(foods.reverse());
      });
  };


  const createFoodElement = (food) => {
    // eslint-disable-next-line no-undef
    const $food = $(`
      <div class="foods">
        <h2>Product Name: ${food.name}</h2>
        <h3>Price: $${food.price}</h3>
      </div>
    `);
    return $food;
  };

  const renderFoods = (foods) => {
    // eslint-disable-next-line no-undef
    const $foodList = $('body');
    $foodList.empty();
    for (const food of foods) {
      $foodList.append(createFoodElement(food));
    }
  };

  loadFoods();
});


