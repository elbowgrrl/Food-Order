$(() => {
  const loadOrders = () => {
    const orderId = $('#reqParam').text();
    $.get(`/api/admin/${orderId}`)
      .then((order) => {
        renderOrders(order);
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

  const renderOrders = (order) => {
    const $orderList = $('#orderInfo');
    const display = displayOrderElement(order);
    console.log("display: ", display);
    $orderList.html(displayOrderElement(order));
  };
  loadOrders();
});
