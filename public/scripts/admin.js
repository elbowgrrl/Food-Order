// eslint-disable-next-line no-undef
$(() => {
  console.log("hi");
  const loadOrders = () => {
    // eslint-disable-next-line no-undef
    $.get('/api/admin')
      .then((orders) => {
        console.log(orders);
        renderOrders(orders);
      });
  };

  const displayOrderElement = (order) => {
    // eslint-disable-next-line no-undef
    const $order = $(`
      <div class="order">
        <h3>Order Number: ${order.id}</h3>
        <h3>Order Time: ${order.order_time}</h3>
        <h3>Special_Instruction: ${order.special_instructions}</h3>
      </div>
    `);
    return $order;
  };

  const renderOrders = (orders) => {
    // eslint-disable-next-line no-undef
    const $orderList = $('');
    $orderList.empty();

    for (const order of orders) {
      $orderList.prepend(displayOrderElement(order));
    }
  };
  loadOrders();
});
