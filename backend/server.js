const express = require('express')
const app = express()
const sqlite3 = require("sqlite3").verbose();
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = new sqlite3.Database("./database.db")

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});