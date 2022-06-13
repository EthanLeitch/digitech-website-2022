const express = require("express")
const path = require("path")

var mysql = require("mysql");

const hostname = '127.0.0.1';
const port = 3000;



const app = express();

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'classrooms'
});



/*app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'src/html/index.html'))
});



app.get('*', function(req, res){
  // res.send('404 Page not found', 404);
  res.sendFile(path.join(__dirname, 'src/html/404.html'))
});*/

app.use(express.static('src'));

app.get('*', function(req, res){
  // res.send('404 Page not found', 404);
  res.sendFile(path.join(__dirname, 'src/html/404.html'))
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/html/index.html`);
  // console.log(module);
});

