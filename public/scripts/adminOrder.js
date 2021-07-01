/* eslint-disable no-undef */
$(() => {

  const loadOrders = () => {
    const orderId = $('#reqParam').text();
    // console.log("orderID", orderId);
    $.get(`/api/admin/${orderId}`)
      .then((orders) => {
        renderOrders(orders);
      });
  };
  const displayOrderElement = (order) => {
    const $orderHtml = (`
        <div>
          <h4>food name : ${order.name}</h4>
          <h4>food name : ${order.user_name}</h4>
          <h4>quantity : ${order.quantity}</h4>
          <h4>price : $${order.price / 100}</h4>
        </div>
    `);
    return $orderHtml;
  };

  const displayStartOrEndOrderElement = (order) => {
    //  console.log(order);
    const $orderHtml = (`
        <form>
          <h4>food name : ${order.name}</h4>
          <h4>food name : ${order.user_name}</h4>
          <h4>quantity : ${order.quantity}</h4>
          <h4>price : $${order.price / 100}</h4>
        </form>
    `);
    return $orderHtml;
  };

  const renderOrders = (orders) => {
    let totalPrice = 0;
    const $orderList = $('#orderInfo');
    // console.log("Orders: ", orders);
    $orderList.empty();
    if (orders.length !== 0) {
      $orderList.append(`<h4>order id : ${orders[0].id}</h4>`);
    }
    for (let i = 0; i < orders.length; i++) {
      totalPrice += parseInt(orders[i].total_price);
      if (i < orders.length - 1) {
        $orderList.append(displayOrderElement(orders[i]));
      }
      if (i === orders.length - 1) {
        $orderList.append(displayStartOrEndOrderElement(orders[i]));
        $orderList.append(`<h4>total price : $${totalPrice / 100}</h4>`);
      }
    }
  };

  const $notifyForm = $('#notifyCustomer');
  $notifyForm.submit(function(event) {
    event.preventDefault();
    // console.log("notify form button submitted!");
    $.post(`/api/admin/:orderId`);
  });

  loadOrders();
});
