const http = require('http');
const path = require("path");
const { logSpecial, getLogs } = require("./utils/log");
const { requestListener, helpRequestListener, getRequestCount } = require("./events/requestListener");
const { errorListener } = require('./events/errorListener');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3001;

const user = process.argv[2] || "anonim";

const server = http.createServer((req, res) => {

  const clientBaseURL = req.headers.origin;
  console.log(clientBaseURL);
  const requestURL = new URL(req.url, clientBaseURL);
  const queryParams = new URLSearchParams(requestURL.searchParams);
  requestURL.search = "";

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204; // No Content but ok
    res.end();
    return;
  }

  if (requestURL.pathname.endsWith("/request")) {
    if(!req.headers.accept.includes("application/json")) {
      res.statusCode = 406;
      res.setHeader('Conetnt-Type', "text/plain");
      res.end("вы ожидаете ответ формат который сервер не поддерживает");
    }

    if (req.method === "POST") {
      let body = '';
      
      req.on("data",(data) => {
        body += data
      })
      req.on("end", () => {
        const {countLogs} = JSON.parse(body);
        getLogs(countLogs).then(response => {
          res.setHeader("Content-Type","application/json")
          res.statusCode = 200;
          res.end(JSON.stringify(response))
        })

      })
      req.on("error", (err) => {
        errorListener.emit("error",err);
      })

    } else if (req.method === "GET") {

    }
  }

  let requestCounter = getRequestCount();

  if (requestCounter === 1) {
    requestListener.emit("request-first", req.url);
  } else {
    requestListener.emit("request", req.url);
  }

});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/  ---------->   //user -- [${user}]`);
});