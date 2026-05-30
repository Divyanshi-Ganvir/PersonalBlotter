const express = require('express');
const app = express();
const sqlite3 = require("sqlite3").verbose();

// Remove the cors import and replace with this:
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

const db = new sqlite3.Database("./appDatabase.db");

app.get("/customers", (req, res) => {
  db.all("SELECT * FROM Customers", [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.listen(5001, () => {
  console.log("Backend running on port 5001");
});