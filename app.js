const express = require("express")
const path = require('path')

var mysql = require('mysql');

const hostname = '127.0.0.1';
const port = 3000;



const server = express();

server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'src/html/index.html'))
});




server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  // console.log(module);
});