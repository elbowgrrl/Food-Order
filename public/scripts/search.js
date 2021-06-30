$(() => {
  const $searchForm = $("#search-box");
  $searchForm.submit(function(event) {
    event.preventDefualt();
    const data = $(this).serialize();

    $.get(`/api/search/${data}`)
      .then(() => {
        loadFoods();
        $searchForm[0].reset();
      });
  });
});
