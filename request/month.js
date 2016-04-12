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

      /* 過濾 Start */
      for(var i = 0; i < origin_json.length; i++) {
        if(origin_json[i].month == targetMonth) {
          var isDuplicate = false;
          for(var j = 0; j < result.length; j++) {
            if(result[j].title === origin_json[i].crop) {
              isDuplicate = true;
              var isValueDuplicate = false;

              for(var k = 0; k < result[j].props.month.length; k++) {
                if(result[j].props.month[k] === origin_json[i].month) isValueDuplicate = true;
              }
              if(!isValueDuplicate) result[j].props.month.push(origin_json[i].month);

              isValueDuplicate = false;
              for(var k = 0; k < result[j].props.variety.length; k++) {
                if(result[j].props.variety[k] === origin_json[i].variety) isValueDuplicate = true;
              }
              if(!isValueDuplicate) result[j].props.variety.push(origin_json[i].variety);

              isValueDuplicate = false;
              for(var k = 0; k < result[j].props.county.length; k++) {
                if(result[j].props.county[k] === origin_json[i].county) isValueDuplicate = true;
              }
              if(!isValueDuplicate) result[j].props.county.push(origin_json[i].county);
            }
          }
          if(!isDuplicate) {
            var obj = eval('({"title":"' + origin_json[i].crop + '","props":{"type":"' +
            origin_json[i].type + '","month":[],"variety":[],"county":[]}})');
            result.push(obj);
          }
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
