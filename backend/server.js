const WebSocketServer = require("ws").Server
const express = require('express');
const app = express();
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
app.use(cors())
app.use(express.json());
const db = new sqlite3.Database("./appDatabase.db");
db.serialize();


app.get("/api", (req, res)=>{
  res.send("From server")
})

app.post("/api/query", (req, res)=>{
  const userQueryCommand = req.body.query;
  db.all(userQueryCommand, [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
})

const server = app.listen(5001, () => {
  console.log("Backend running on port 5001");
});

let totalRows;
db.get("SELECT COUNT(*) as totalRows FROM Customers", [], (err, row) => {
  totalRows = row.totalRows;
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  db.on("trace", (sql) => {
    console.log("SQL: ", sql);
  });
  console.log("Connected to client")
  let timeOut;
  let interval;

  ws.on("message", (data) => {
    const {delayTime, durationTime} = JSON.parse(data.toString())
    console.log("Delay time : ", delayTime);
    console.log("Duration time : ", durationTime);

    timeOut = setTimeout(function(){
      
      console.log("Starting timeout")
        
      interval = setInterval(function() {
        randomValue = Math.floor(Math.random() * (1000 - 1 + 1)) + 1
        randomRow = Math.floor(Math.random() * (totalRows - 1 + 1)) + 1
        console.log(randomRow);
        db.run("UPDATE Customers SET Updates = (?) where CustomerID = (?)", [randomValue, randomRow], (err) => {
          if (err) {
            console.error(err)
          }
        });
        ws.send(randomValue)
        db.all("SELECT * FROM Customers", [], (err, rows) => {
          if (err){
            console.error(err);
            return;
          }
          ws.send(rows);
        })

      }, 2000) // 2 seconds 

    }, delayTime * 1000)
    
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocketServer.OPEN) {
        client.send(data);
      }
    });
  });

  ws.on("close", () => {
    console.log("Frontend connection closed");
    clearTimeout(timeOut);
    clearInterval(interval);
  });

});

