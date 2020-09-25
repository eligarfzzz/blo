$(document).ready(function () {});
let artApp = new Vue({
  el: "#art_list",
  data: {
    arts: webData.articles,
  },
});

let rep_app = new Vue({
  el: "#rep_list",
  data: {
    reps: webData.repos,
  },
});
