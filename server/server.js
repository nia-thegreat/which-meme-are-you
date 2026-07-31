const questions = require("./data/questions");

const cors = require("cors");

const express = require("express");

const app = express();

app.use(cors());

const PORT = 5000;

app.get("/api/meme", (req,res) => 
{ res.json({
    meme: "pepe",
    description: "you are calm untilsm1 says group project"
});
});

app.get("/api/questions", (req, res) => {
  res.json(questions);
});

app.listen(PORT,() => 
{console.log(`Server running on http://localhost:${PORT}`);});


 