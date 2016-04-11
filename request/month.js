var config = require('../config');
var http = require('http');
var fs = require('fs');

module.exports = function(unitId, targetMonth) {
  http.get(config.url + '?UnitId=' + unitId, function(res) {
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

      fs.writeFile("./json/month/" + targetMonth + ".json", JSON.stringify(result), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("Done: month-" + targetMonth);
        }
      });

    });
  });
};
