var http = require('http');

module.exports = function(appResponse, url){
  http.get(url, function(res) {
    var str = '';

    res.on('data', function(chunk) {
        str += chunk;
    });

    res.on('end', function(){
      var origin_json = JSON.parse(str);
      var result = [];

      /* 列出所有水果 Start */
      for(var i = 0; i < origin_json.length; i++) {
        var isDuplicate = false;
        for(var j = 0; j < result.length; j++) {
          if(origin_json[i].crop === result[j]) {
            isDuplicate = true;
          }
        }
        if(!isDuplicate) result.push(origin_json[i].crop);
      }
      /* End */

      appResponse.end(JSON.stringify(result));
    });
  });
};
