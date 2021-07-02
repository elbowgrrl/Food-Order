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
    console.log("food", food);
    const $food = (`
    <article class="search-item">
    <header class="search-header">
      <span>${food.name}</span>
      <span>$${food.price / 100}</span>
    </header>
    <body>
    <img class="food-image" src="${food.url_image}">
    </body>
    <footer class="search-footer">
      <button data-food-id="${food.id}" class="confirm">Add to cart</button>
      <button data-food-id="${food.id}"class="confirm" id="more-info">More info</button>
    </footer>
    </article>
    `);
    return $food;
  };

  const createMoreInfoElement = function (food) {
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
      <a href="/"><input class="confirm" type="button" value="Back to Menu" /></a>
    </footer>
  </article>
    `;
    return $moreInfo;
  };

  const renderSearch = (foods) => {
    const $mainContainer = $('#main-container');
    $mainContainer.empty();
    for (const food of foods) {
      $mainContainer.append(displaySearchFood(food));

      const $moreInfoButton = $(`#more-info[data-food-id="${food.id}"]`);
      $moreInfoButton.on("click", function(event){
      console.log("more info button");
      event.preventDefault();
      $('#main-container').html(createMoreInfoElement(food));
      });

    }
    if (foods.length === 0) {
      $mainContainer.append(`
    <article class="search-item">
    <header class="search-header">
      <span>No food found</span>
    </header>
    <body>
    </body>
    <footer class="search-footer">
      <button type="submit" id="find-more-food" class="confirm"><a href="/">Find more food</a></button>
    </footer>
    </article>
    `);
    }
  };
});


