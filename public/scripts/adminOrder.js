$(() => {
  const loadOrders = () => {
    const orderId = $('#reqParam').text();
    $.get(`/api/admin/${orderId}`)
      .then((orders) => {
        renderOrders(orders);
      });
  };

  const displayOrderElement = (order) => {
    const $orderHtml = (`
        <div>
          <h4>order id : ${order.id}</h4>
          <h4>order name : ${order.name}</h4>
          <h4>order total price :${order.total_price}</h4>
        </div>
    `);
    return $orderHtml;
  };

  const renderOrders = (orders) => {
    const $orderList = $('#orderInfo');
    $orderList.empty();

    for (const order of orders) {
      $orderList.append(displayOrderElement(order));
    }
  };

  loadOrders();
});
