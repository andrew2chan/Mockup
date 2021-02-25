const http = require('http');
const data = require('./data.json')

const hostname = '127.0.0.1';
const port = '8080';

const server = http.createServer((req,res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type','application/json');

  var url = req.url;

  if(url === '/getData') {
    res.end(JSON.stringify(data), () => {
      console.log("Data sent");
    })
  }
});

server.listen(port, hostname, () => {
  console.log("This is running on port :" + port)
})
