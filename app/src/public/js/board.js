"use strict";
$("#search").click(function () {
  let searchVal = $("#search-input").val();
  window.location.replace(`/board/list?value=${searchVal}`);
});
