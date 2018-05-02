window.onload = function() {
  var JSONData;

  $.getJSON("https://api.github.com/users", function(oData){
    JSONData = oData;
    setupVue(JSONData);
  });

  function setupVue(p_jsonData) {
    var VApp = new Vue({
      el: '#app',
      data: {
        iSearch: "",
        oData: p_jsonData
      },
      computed: {
        oDFiltered: function() {
          if(this.iSearch != ""){
            var self = this;
            return this.oData.filter(function(object){
              return object.login.indexOf(self.iSearch) > -1;
            })
          } else {
            return this.oData;
          }
        }
      }
    })
  }
};
