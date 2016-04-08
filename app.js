var http = require('http');
var requestMonth = require('./month');

var url = 'http://data.coa.gov.tw/Service/OpenData/DataFileService.aspx?UnitId=061';

var server = http.createServer(function (request, response) {
  requestMonth(response, url, '2');
});

server.listen(5000);
