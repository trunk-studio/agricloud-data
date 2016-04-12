var requestAPI = require('./request');
var unitId = '061';

for(var i = 1; i <= 12; i++) {
  // 列出特定月份的所有蔬果
  requestAPI.month(unitId, i.toString());
}

// 只列出全部蔬果的種類
requestAPI.list(unitId);
