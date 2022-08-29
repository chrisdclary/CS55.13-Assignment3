// import core modules
const fs = require("fs").promises;
const http = require("http");

// function that responds to http requests
const requestListener = function(req, res) {
  // output the request url
  console.log(req.url);

  if (req.url === "/") {
    fs.readFile( __dirname + '/app.html' ).then(
      contents => {
        // set http response header entry
        res.setHeader("Content-Type", "text/html; charset=UTF-8");
        //return 200 OK status
        res.writeHead(200);
        // sent back file contents and close response
        res.end(contents);
      }
    );
  } else {
    fs.readFile( __dirname + "/resources.json").then(
      contents => {
        //set http response header entry
        res.setHeader("Content-Type", "application/json; charset=UTF-8");
        // return 200 OK status
        res.writeHead(200);
        // send back file contents and close response
        res.end(contents);
      }
    );
  }
}

// create instance of http server
const server = http.createServer(requestListener);

// define IP address and TCP port for our server to listen on
const host = "0.0.0.0";
const port = "8080";

// call listen method to start listening for http requests
server.listen(
  port, 
  host, 
  () => {
    console.log('Server is running.');
  }
);
