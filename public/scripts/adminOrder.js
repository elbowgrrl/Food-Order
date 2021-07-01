$(() => {
  const loadOrders = () => {
    const orderId = $('#reqParam').text();
    console.log("orderID", orderId);
    $.get(`/api/admin/${orderId}`)
      .then((order) => {
        renderOrders(order);
        console.log("6 order", order);
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
