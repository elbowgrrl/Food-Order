$(() => {
  const loadOrders = () => {
    $.get('/api/admin')
      .then((orders) => {
        console.log(orders);
        renderOrders(orders);
      });
  };

  const displayOrderElement = (order) => {
    console.log("11 order", order);
    const $order = $(`
    <article class="cart-order">
    <header class="table-header">
      <span class="title">Order ID: ${order.id}</span>
      <span class="customer-name">Customer ID: ${order.user_id}</span>
    </header>
  <div class="Rtable Rtable--4cols">

  <div class="Rtable-cell"><h3>Order Time</h3></div>
  <div class="Rtable-cell"><h3>Special Instructions</h3></div>

  <div class="Rtable-cell">${order.order_time}</div>
  <div class="Rtable-cell">${order.special_instructions}</div>

  </div>
  <footer class="table-footer">
  <a href="/admin/${order.id}">View Order</a>
  </footer>
  </article>
    `);
    return $order;
  };

//   <tr>
//   <td>${order.id}</td>
//   <td>${order.order_time}</td>
//   <td>${order.special_instructions}</td>
//   <td>
//     <a href="/admin/${order.id}">Detailed Order Information</a>
//   </td>
// </tr>

  const renderOrders = (orders) => {
    console.log("inside render orders", orders)
    const $orderList = $('#order-container');
    $orderList.empty();

    for (const order of orders) {
      $orderList.append(displayOrderElement(order));
    }
  };
  loadOrders();
});
