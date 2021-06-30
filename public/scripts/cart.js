/* eslint-disable no-undef */
$(() => {

  $(`#cart`).click(function() {
    renderFoodList(foodList);
  });


  const renderFoodList = (foodList) => {
    const $foodList = $('.menu-container');
    $foodList.empty();

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
              <th>Net Price</th>
            </tr>
          </thead>
          <tbody class='food-container'>
          </tbody>
          <tfoot>
            <td>Special Instructions</td>
            <td></td>
            <td></td>
            <td><textarea placeholder="Please enter any   special instructions for your order here"
                name="special_instructions" rows="5"  cols="33"></textarea></td>
          </tfoot>
        </table>
        <footer class="center">
          <button type="submit" class="confirm">Place Order</ button>
          <span class="footer-text">Order Total: </span>
        </footer>
      </article>
    `);
    $foodList.append($checkout);

    const $foodContainer = $(`.food-container`);
    let foodContainer = [];
    for (const foodInfo in foodList) {
      foodContainer.push(createFoodElement(foodList[foodInfo]));
    }
    $foodContainer.append(foodContainer.join(', '));

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

  };

  const createFoodElement = function(foodInfo) {
    const { id, price, quantity, name } = foodInfo;
    let $food = `
      <tr id='table${id}'>
        <td>${quantity}</td>
        <td>${name}</td>
        <td><button type="submit" class="reduce-quantity" id='${foodInfo.id}'>Remove</button></td>
        <td>$${price}</td>
        <td>$${price * quantity}</td>
      </tr>
    `;
    return $food;
  };





});











