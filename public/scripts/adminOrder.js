/* eslint-disable no-undef */
$(() => {

  const loadOrders = () => {
    const orderId = $('#reqParam').text();
    console.log("orderID", orderId);
    $.get(`/api/admin/${orderId}`)
      .then((orders) => {
        renderOrders(orders);
      });
  };
  const displayOrderElement = (order) => {
    const $orderHtml = (`
        <div>
          <h4>food name : ${order.name}</h4>
          <h4>quantity : ${order.quantity}</h4>
          <h4>price : $${order.price / 100}</h4>
        </div>
    `);
    return $orderHtml;
  };

  const displayStartOrEndOrderElement = (order) => {
    console.log(order);
    const $orderHtml = (`
        <form>
          <h4>food name : ${order.name}</h4>
          <h4>quantity : ${order.quantity}</h4>
          <h4>price : $${order.price / 100}</h4>
          <h4>total price :$${order.total_price / 100}</h4>
        </form>
    `);
    return $orderHtml;
  };

  const renderOrders = (orders) => {
    const $orderList = $('#orderInfo');
    console.log(orders);
    $orderList.empty();
    if (orders.length !== 0) {
      $orderList.append(`<h4>order id : ${orders[0].id}</h4>`);
    }
    for (let i = 0; i < orders.length; i++) {
      if (i === 0 || i === orders.length - 1) {
        $orderList.append(displayStartOrEndOrderElement(orders[i]));
      }
      if (i < orders.length - 1 && i !== 0) {
        $orderList.append(displayOrderElement(orders[i]));
      }
    }
  };

  const $notifyForm = $('#notifyCustomer');
  $notifyForm.submit(function(event) {
    event.preventDefault();
    console.log("notify form button submitted!");
    $.post(`/api/admin/:orderId`);
  });

  loadOrders();
});
