$(() => {
  const loadOrders = () => {
    $.get('/api/admin')
      .then((orders) => {
        console.log(orders);
        renderOrders(orders);
      });
  };

  const displayOrderElement = (order) => {
    const $order = $(`
        <tr>
          <td>${order.id}</td>
          <td>${order.order_time}</td>
          <td>${order.special_instructions}</td>
          <td>
            <a href="/admin/${order.id}">Detailed Order Information</a>
          </td>
        </tr>
    `);
    return $order;
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
