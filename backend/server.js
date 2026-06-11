const WebSocketServer = require("ws").Server
const express = require('express');
const app = express();
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
app.use(cors())
app.use(express.json());
const db = new sqlite3.Database("./appDatabase.db");


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

app.post("/api/updates", (req, res) => {
  const {delayTime, durationTime} = req.body
  setTimeout(function(){
    res.json({ message: "Successful connection" });
  }, 5000)
  
})

const server = app.listen(5001, () => {
  console.log("Backend running on port 5001");
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Connected to client")
  ws.on("message", (data) => {
    console.log("data from client : ", data);
    const interval = setInterval(function() {
      ws.send("repeated message")
    }, 5000)
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocketServer.OPEN) {
        client.send(data);
      }
    });
  });
});