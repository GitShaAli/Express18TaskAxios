const express = require("express");
const mysql = require("mysql2");
const Sequelize = require('sequelize');
const cors = require("cors");

const app = express();
app.use(express.json()); 

app.use(cors());

const userRoutes = require('./userRoutes');


const db = mysql.createPool({
    host: 'localhost', 
    user: 'root',
    password: 'passmeinyme123',
    database: 'node-complete', 
});

app.use('/', userRoutes);


app.listen(4000,()=>{
    console.log('listening')
})

app.get("/userIn", (req, res) => {
    
    db.query("SELECT * FROM userchecker", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  
  

  app.post("/userIn", (req, res) => {
    const insertQuery = "INSERT INTO userchecker SET ?";
    db.query(insertQuery, req.body, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(req.body);
      }
    });
  });

  app.delete("/userIn/:id", (req, res) => {
    db.query(
      "DELETE FROM userchecker WHERE id = ?",
      req.params.id,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  }); 
  

// module.exports = sequelize;

