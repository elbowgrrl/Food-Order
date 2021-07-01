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
  // const displayOrderElement = (order) => {
  //   const $orderHtml = (`
  //   <article class="cart-order">
  //       <div>
  //         <h4>food name : ${order.name}</h4>
  //         <h4>quantity : ${order.quantity}</h4>
  //         <h4>price : $${order.price / 100}</h4>
  //       </div>
  //   </article>
  //   `);
  //   return $orderHtml;
  // };


  const displayOrderElement = (order) => {

    //  console.log(order);
    const $orderHtml = (`
    <article class="cart-order">
    <div class="Rtable Rtable--3cols">
      <div class="Rtable-cell">food name</div>
      <div class="Rtable-cell">quantity</div>
      <div class="Rtable-cell">price</div>
      <div class="Rtable-cell">${order.name}</div>
      <div class="Rtable-cell">${order.quantity}</div>
      <div class="Rtable-cell">$${order.price / 100}</div>
    </div>
    </article>
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
        $orderList.append(displayOrderElement(orders[i]));
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
