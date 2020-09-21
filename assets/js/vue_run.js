$(document).ready(function () {});
var app = new Vue({
  el: "#art_list",
  data: {
    arts: webData.articles,
  },
});
