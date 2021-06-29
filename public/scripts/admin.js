$(() => {
  console.log("hi");
  const loadOrders = () => {
    $.get('/admin')
      .then((orders) => {
        renderOrders(orders);
      });
  };

  const displayOrderElement = (order) => {
    const $order = $(`
      <div class="order">
        <h3>Order Number: ${order.id}</h3>
        <h3>Order Time: ${order.order_time}</h3>
        <h3>Special_Instruction: ${order.special_instructions}</h3>
      </div>
    `);
    return $order;
  }
  const renderOrders = (orders) => {
    const $orderList = $('#orderList');
    $orderList.empty();

    for (const order of orders) {
      $orderList.prepend(displayOrderElement(order));
    }
  };
  loadOrders();
});
