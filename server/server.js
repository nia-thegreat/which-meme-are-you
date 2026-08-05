const questions = require("./data/questions");

const cors = require("cors");

const express = require("express");

const results = require("./data/results");

const app = express();

app.use(cors());

const PORT = process.env.PORT || 5000;


app.get("/api/questions", (req, res) => {
  res.json(questions);
});

app.get("/api/results", (req, res) => {
  res.json(results);
});

app.listen(PORT,() => 
{console.log(`Server running on http://localhost:${PORT}`);});


 