var http = require('http');

module.exports = function(appResponse, url, month){
  http.get(url, function(response) {
    var str = '';

    response.on('data', function(chunk) {
        str += chunk;
    });

    response.on('end', function(){
      var origin_json = JSON.parse(str);
      var new_json = [];

      for (var i = 0; i < origin_json.length; i++) {
        if(origin_json[i].month === month) {
          new_json.push(origin_json[i]);
        }
      }

      appResponse.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
      appResponse.end(JSON.stringify(new_json));
    });
  });
};
