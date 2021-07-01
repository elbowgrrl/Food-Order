/* eslint-disable no-undef */
$(() => {
  //console.log("ajax in!!!");
  const $searchForm = $('#search-box');

  $searchForm.submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    $.get(`/api/search/${data}`)
      .then((foods) => {
        console.log(foods);
        renderSearch(foods);
        $searchForm[0].reset();
      });
  });

  const displaySearchFood = (food) => {
    const $food = (`
    <article class="menu-item">
    <header class="menu-header">
      <span>${food.name}</span>
      <span>$${food.price / 100}</span>
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

    return $food;
  };

  const renderSearch = (foods) => {
    const $mainContainer = $('#main-container');
    $mainContainer.empty();
    for (const food of foods) {
      $mainContainer.append(displaySearchFood(food));
    }
    // console.log(foods);
    if (foods.length === 0) {
      $mainContainer.append(`
    <article class="menu-item">
    <header class="menu-header">
      <span>No food found</span>
    </header>
    <body>
    </body>
    <footer class="menu-footer">
      <button type="submit" class="confirm"><a href="/">Find more food</a></button>
    </footer>
    </article>
    `);
    }
  };
});
