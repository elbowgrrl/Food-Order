$(() => {
  const order_id = $('#order_id').val()
  if (order_id == null) {
    return;
  }
  const loadOrders = () => {
    $.get(`/api/admin/${order_id}`)
      .then((orders) => {
        renderOrders(orders);
      });
  };

  const displayOrderElement = (order) => {
    const $orderHtml = (`
    <tr>
      <td class="cart-table">${order.name}</td>
      <td class="cart-table">${order.quantity}</td>
      <td class="cart-table">$${order.price / 100}</td>
    </tr>
    `);
    return $orderHtml;
  };

  const renderOrders = (orders) => {
    const $orderList = $('#admin-order-container');
    const $orders = $(`
      <article class="cart-article">
        <header class="cart-article-header">
          <span class="title">Order id: ${orders[0].id}</span>
          <span class="customer-name">Customer Name: Tester</span>
        </header>
          <div>
            <table class="cart-table">
              <thead id="tableRow">
                <tr>
                  <th>Food name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
                <span id="order_info"></span>
              </thead>
              <tbody class='food-container'>
              </tbody>
            </table>
          </div>
          <div>
          </div>
        <footer class="cart-article-footer">
        <div id="total_price"></div>
        <div id="special_instruction"></div>
        <form id="notify">
          <button type="submit" class="confirm">Notify customer</button>
        </form>
        </footer>
      </article>
    `);
    $orderList.append($orders);

    let totalPrice = 0;
    $orderRow = $('#tableRow');

    for (let i = 0; i < orders.length; i++) {
      totalPrice += parseInt(orders[i].total_price);
      if (i < orders.length - 1) {
        $orderRow.append(displayOrderElement(orders[i]));
      }
      if (i === orders.length - 1) {
        console.log("orders info ", orders);
        $orderRow.append(displayOrderElement(orders[i]));
        $('#total_price').append(`<h4>Total price : $${totalPrice / 100}</h4>`);
        $('#special_instruction').append(`<h4>Special instruction: ${orders[0].special_instruction}</h4>`);
      }
    }
  };

  const $orderList = $("#admin-order-container");

  $orderList.on("submit", "#notify", function(event){
    event.preventDefault();
    alert("Message sent to the customer!");
    $.post(`/api/admin/${order_id}`);
    window.location.href = '/admin';
  });

  loadOrders();
});
