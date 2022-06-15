const express = require("express")
const path = require("path")

// var mysql = require("mysql");
const { Sequelize } = require('sequelize');

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

/*let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'classroom_db'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL classroom_db database!");

  connection.query("SELECT RoomNumber, Latitude, Longitude FROM classrooms", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});*/

const sequelize = new Sequelize('mysql', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')

const adminJs = new AdminJS({
  databases: [],
  rootPath: '/admin',
})

const router = AdminJSExpress.buildRouter(adminJs)

app.use(express.static('src'));
app.use(adminJs.options.rootPath, router);

app.get('*', function(req, res){
  // res.send('404 Page not found', 404);
  res.sendFile(path.join(__dirname, 'src/404.html'))
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/index.html`);
  console.log(`AdminJS panel is at http://${hostname}:${port}/admin`);
  // console.log(module);
});

