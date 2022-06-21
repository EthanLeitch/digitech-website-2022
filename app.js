const express = require("express")
const path = require("path")


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



// Load sequelize
/*const sequelize = new Sequelize({
  dialect: 'mysql',
  dialectOptions: {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'classroom_db',
  }
});*/


const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
// import sequelize
const { Sequelize, DataTypes } = require('sequelize');
//AdminJS.registerAdapter(AdminJSExpress)

const sequelize = new Sequelize("classroom_db", "root", "password", {
  host: '127.0.0.1',
  dialect: 'mysql'
  //operatorsAliases: false
});
/*
// Setup sequelize model
const Classrooms = sequelize.define('classrooms', {
  // Model attributes are defined here
  RoomNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Latitude: {
    type: DataTypes.DECIMAL
  },
  Longitude: {
    type: DataTypes.DECIMAL
  }
});*/

async function myfunction(){
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully to classroom database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    sequelize.close();
  }
}

function start() {
  return myfunction();
}

// Call start
(async() => {
  console.log('Checking mysql authentication');

  await start();
  
})();


// `sequelize.define` also returns the model
//console.log('Classrooms model created:', Classrooms === sequelize.models.Classrooms); // true





const adminJs = new AdminJS({
  databases: [],
  rootPath: '/admin',
});

const router = AdminJSExpress.buildRouter(adminJs);

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
