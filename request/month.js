var http = require('http');

module.exports = function(appResponse, url, targetMonth){
  http.get(url, function(res) {
    var str = '';

    res.on('data', function(chunk) {
        str += chunk;
    });

    res.on('end', function(){
      var origin_json = JSON.parse(str);
      var result = [];

      /* 過濾 Start */
      for(var i = 0; i < origin_json.length; i++) {
        if(origin_json[i].month === targetMonth) {
          result.push(origin_json[i]);
        }
      }
      /* 過濾 End */

      appResponse.end(JSON.stringify(result));
    });
  });
};
