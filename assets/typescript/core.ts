window.onload = () => {
  var JSONData;

  $.getJSON("https://api.github.com/users", function(oData){
    JSONData = oData;
    setupVue(JSONData);
  });

  function setupVue(p_jsonData : object) {
    var VUEApp = new Vue({
      el: '#app',
      data: p_jsonData
    })
  }
};
