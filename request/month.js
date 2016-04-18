var config = require('../config');
var http = require('http');
var fs = require('fs');

module.exports = function(unitId, targetMonth) {
  http.get(config.url + '?UnitId=' + unitId, function(res) {
    var str = '';

    res.setEncoding('utf8');

    res.on('data', function(chunk) {
        str += chunk;
    });

    res.on('end', function() {
      var origin_json = JSON.parse(str);
      var result = [];
      var resultMonth = [];

      /* 列出所有水果 */
      for(var i = 0; i < origin_json.length; i++) {
        var isDuplicate = false;
        for(var j = 0; j < result.length; j++) {
          if(result[j].title === origin_json[i].crop) {
            isDuplicate = true;
            var isValueDuplicate = false;

            for(var k = 0; k < result[j].month.length; k++) {
              if(result[j].month[k] === origin_json[i].month) isValueDuplicate = true;
            }
            if(!isValueDuplicate) result[j].month.push(origin_json[i].month);

            isValueDuplicate = false;
            for(var k = 0; k < result[j].variety.length; k++) {
              if(result[j].variety[k] === origin_json[i].variety) isValueDuplicate = true;
            }
            if(!isValueDuplicate) result[j].variety.push(origin_json[i].variety);

            isValueDuplicate = false;
            for(var k = 0; k < result[j].county.length; k++) {
              if(result[j].county[k] === origin_json[i].county) isValueDuplicate = true;
            }
            if(!isValueDuplicate) result[j].county.push(origin_json[i].county);
          }
        }
        if(!isDuplicate) {
          var obj = eval('({"title":"' + origin_json[i].crop + '","type":"' +
          origin_json[i].type + '","month":[],"variety":[],"county":[]})');
          result.push(obj);
        }
      }

      /* 塞選特定月份 */
      for (var i = 0; i < result.length; i++) {
        var key = 0;
        var containsMonth = false;
        for (var j = 0; j < result[i].month.length; j++) {
          if(result[i].month[j] === targetMonth) {
            containsMonth = true;
            key = i;
            break;
          }
        }
        if(containsMonth) {
          result[i]["key"] = (key + 1).toString();
          resultMonth.push(result[i]);
        }
      }

      fs.writeFile("./json/month/" + targetMonth + ".json", JSON.stringify(resultMonth), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("Done: month-" + targetMonth);
        }
      });

    });
  });
};
