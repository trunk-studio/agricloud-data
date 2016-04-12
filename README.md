# AgriBasket JSON Data

[http://data.coa.gov.tw/Service/OpenData/DataFileService.aspx?UnitId=061](http://data.coa.gov.tw/Service/OpenData/DataFileService.aspx?UnitId=061)

## Usage

### 列出類別的清單
requestAPI.list('資料來源ID');
```
requestAPI.list('061');
```

### 列出特定月份的全部蔬果
requestAPI.month('資料來源ID', '你要的月份');
```
requestAPI.month('061', '3');
```

## Run
```
node app.js
```

## Output Path
`/json`
