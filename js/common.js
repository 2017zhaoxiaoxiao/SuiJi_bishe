function isNullOrEmpty (value) {
    if ((value == null || value == undefined || value == "null" || value == "undefined" || value.toString() == "")) {
      return true;
    } else {
      return false;
  
    }
  }

  var formatDate = function (date) {  
    var Y = date.getFullYear();  
    var M = date.getMonth() + 1;  
    var D = date.getDate();  
    var h = date.getHours();                  //小时
    var m = date.getMinutes();                //分
    var s = date.getSeconds();
    M = M < 10 ? '0' + M : M;  
    D = D < 10 ? ('0' + D) : D;  
    return Y + '-' + M + '-' + D +" "+ h +':'+ m +':' + s;  
};