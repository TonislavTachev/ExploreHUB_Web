const mysql = require('mysql');
module.exports = () =>{
 
 const db = mysql.createPool({host: "swpro-db.mysql.database.azure.com", user: "swprodb@swpro-db",
 password:'cts5-2019', 
 database: 'explorehub', 
 port: 3306, 
},
console.log("Database connected!"))
   db.on('connection', function (connection) {
  console.log('DB Connection established');

  db.on('error', function (err) {
    console.error(new Date(), 'MySQL error', err.code);
  });
  db.on('close', function (err) {
    console.error(new Date(), 'MySQL close', err);
  });

});
return db;
};