var http = require('http');
var requestMonth = require('./request/month');
var requestList = require('./request/list');

var url = 'http://data.coa.gov.tw/Service/OpenData/DataFileService.aspx?UnitId=061';

var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
  // requestMonth(response, url, '2');
  requestList(response, url);
});

server.listen(5000);
