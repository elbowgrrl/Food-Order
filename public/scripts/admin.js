/* eslint-disable no-undef */
$(() => {
  const loadOrders = () => {
    $.get('/api/admin')
      .then((orders) => {
        // console.log(orders);
        renderOrders(orders);
      });
  };

  const displayOrderElement = (order) => {
    const orderTime = order.order_time.slice(12, 16);
    const orderDate = order.order_time.slice(0, 10);
    const $order = $(`
    <article class="cart-order">
      <header class="table-header">
        <span class="title">Order ID: ${order.id}</span>
        <span class="customer-name">Customer ID: ${order.user_id}</span>
      </header>
      <div class="Rtable Rtable--2cols">
        <div class="Rtable-cell"><h3>Order Placed At</h3></div>
        <div class="Rtable-cell"><h3>Special Instructions</h3></div>
        <div class="Rtable-cell">${orderDate} at ${orderTime}</div>
        <div class="Rtable-cell">${order.special_instructions}</div>
     </div>
      <footer class="table-footer">
      <a href="/admin/${order.id}"><input class="confirm" type="button" value="View Order" /></a>

      </footer>
    </article>
    `);
    return $order;
  };

  const renderOrders = (orders) => {
    const $orderList = $('#order-container');
    $orderList.empty();
    for (const order of orders) {
      $orderList.append(displayOrderElement(order));
    }
  };

  loadOrders();
});
