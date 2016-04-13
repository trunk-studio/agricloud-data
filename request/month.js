var config = require('../config');
var http = require('http');
var fs = require('fs');

module.exports = function(unitId, targetMonth) {
  http.get(config.url + '?UnitId=' + unitId, function(res) {
    var str = '';

    res.on('data', function(chunk) {
        str += chunk;
    });

    res.on('end', function() {
      var origin_json = JSON.parse(str);
      var result = [];
      var resultMonth = [];

      /* 列出所有水果 Start */
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

      /* 過濾 Start */
      for(var i = 0; i < origin_json.length; i++) {
        if(origin_json[i].month == targetMonth) {
          var isDuplicate = false;
          for(var j = 0; j < resultMonth.length; j++) {
            if(resultMonth[j].title === origin_json[i].crop) {
              isDuplicate = true;
              var isValueDuplicate = false;

              for(var k = 0; k < resultMonth[j].month.length; k++) {
                if(resultMonth[j].month[k] === origin_json[i].month) isValueDuplicate = true;
              }
              if(!isValueDuplicate) resultMonth[j].month.push(origin_json[i].month);

              isValueDuplicate = false;
              for(var k = 0; k < resultMonth[j].variety.length; k++) {
                if(resultMonth[j].variety[k] === origin_json[i].variety) isValueDuplicate = true;
              }
              if(!isValueDuplicate) resultMonth[j].variety.push(origin_json[i].variety);

              isValueDuplicate = false;
              for(var k = 0; k < resultMonth[j].county.length; k++) {
                if(resultMonth[j].county[k] === origin_json[i].county) isValueDuplicate = true;
              }
              if(!isValueDuplicate) resultMonth[j].county.push(origin_json[i].county);
            }
          }
          if(!isDuplicate) {
            var key = 0;
            for(var j = 0; j < result.length; j++) {
              if(result[j].title === origin_json[i].crop) {
                key = j;
                break;
              }
            }
            var obj = eval('({"title":"' + origin_json[i].crop + '","type":"' +
            origin_json[i].type + '","key":"' + (key + 1) + '","month":[],"variety":[],"county":[]})');
            resultMonth.push(obj);
          }
        }
      }
      /* 過濾 End */

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
