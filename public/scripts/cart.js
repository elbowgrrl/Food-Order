/* eslint-disable no-undef */
$(() => {


  $(`#cart`).click(function() {
    renderFoodList(foodList);
  });


  const getTotalPrice = (foodList) => {
    let totalPrice = 0;
    for (const key in foodList) {
      const { price, quantity } = foodList[key];
      totalPrice += price * quantity;
      console.log(totalPrice);
    }
    return totalPrice;
  };


  const renderFoodList = (foodList) => {
    const $foodList = $('.main-container');
    $foodList.empty();


    const $checkout = $(`
      <article class="center">
        <header>
          <span class="title">Checkout</span>
          <span class="customer-name">Customer Name</span>
        </header>
          <div>
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
            </table>
          </div>
          <div>
            <form id='place-order'>
               <label for="special_instructions">Special Instructions</label>
               <textarea placeholder="Please enter any special instructions for your order here" name="special_instructions" rows="5" cols="33"></textarea>
                <button type="submit" class="confirm">Place Order</ button>
            </form>
          </div>
        <footer class="center">
          <span class="footer-text"></span>
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


    $(`.footer-text`).text(`Order Total: $${getTotalPrice(foodList)}`);


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


    const $placeOrder = $(`#place-order`)
      .submit(function(event) {
        event.preventDefault();
        const data = $(this).serializeArray();
        const { name, value } = data[0];
        foodList[name] = value;

        $.post('/api/checkout', foodList)
          .then(() => {
            $placeOrder[0].reset();
            alert("Thank you for the order!!");
          });
      });
  };


  const createFoodElement = function(foodInfo) {
    const { id, price, quantity, name } = foodInfo;
    let $food = `
      <tr id='table${id}'>
        <td>${quantity}</td>
        <td>${name}</td>
        <td><button type="submit" class="reduce-quantity" id='${id}'>Remove</button></td>
        <td>$${price}</td>
        <td>$${price * quantity}</td>
      </tr>
    `;
    return $food;
  };


});











