# AgriBasket JSON Data

[http://data.coa.gov.tw/Service/OpenData/DataFileService.aspx?UnitId=061](http://data.coa.gov.tw/Service/OpenData/DataFileService.aspx?UnitId=061)

## Usage
```
var requestAPI = require('./request');
```

### 列出特定月份的全部蔬果
requestAPI.month('目的Unit-Id', '你要的月份');
```
requestAPI.month('061', '1');
```

### 列出類別的清單
requestAPI.list('目的Unit-Id');
```
requestAPI.list('061');
```

## Run
```
node app.js
```

## Output Path
`/json`
