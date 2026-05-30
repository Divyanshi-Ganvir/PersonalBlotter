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

app.listen(5001, () => {
  console.log("Backend running on port 5001");
});