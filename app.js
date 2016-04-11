var requestAPI = require('./request');

for(var i = 1; i <= 12; i++) {
  // month(Unit-Id, Month) -> 列出特定月份的所有蔬果
  requestAPI.month('061', i.toString());
}

// list(Unit-Id) -> 只列出全部蔬果的種類
requestAPI.list('061');
