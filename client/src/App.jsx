import { useEffect, useState } from "react";     //import stmnts
import "./App.css";
import pepe from "./assets/memes/pepe.webp";
import cheems from "./assets/memes/cheems.jpeg";
import gigachad from "./assets/memes/gigachad.jpeg";
import cryingCat from "./assets/memes/Crying_Cat.jpg";
import sideEyeCat from "./assets/memes/sideeyecat.jpeg";
import moai from "./assets/memes/moai.jpeg";
import clown from "./assets/memes/clown.jpg";
import npc from "./assets/memes/npc.jpeg";



const memeImages = {
  "pepe.webp": pepe,
  "cheems.jpeg": cheems,
  "gigachad.jpeg": gigachad,
  "Crying_Cat.jpg": cryingCat,
  "sideeyecat.jpeg": sideEyeCat,
  "moai.jpeg": moai,
  "clown.jpg": clown,
  "npc.jpeg": npc,

};


function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [results, setResults] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    fetch("https://which-meme-are-you.onrender.com/api/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      });

      fetch("https://which-meme-are-you.onrender.com/api/results")
  .then((response) => response.json())
  .then((data) => {
    setResults(data);
  });

  }, []);


  
  //handle answer

  const handleAnswer = (meme) => {
  // Turn the clicked button purple
  setSelectedOption(meme);

  const updatedAnswers = [...answers, meme];
  setAnswers(updatedAnswers);

  // Wait 500ms before moving on
  setTimeout(() => {

    // Remove the purple selection
    setSelectedOption(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {

      window.gtag?.("event", "quiz_completed");

      setQuizFinished(true);
    }

  }, 500);
};



//get result

const getResult = () => {
  const counts = {};

  answers.forEach((meme) => {
    counts[meme] = (counts[meme] || 0) + 1;
  });

  let winner = "";

  for (const meme in counts) {
    if (
      winner === "" ||
      counts[meme] > counts[winner]
    ) {
      winner = meme;
    }
  }

  return winner;
};


//restart quiz

const restartQuiz = () => {
  setCurrentQuestion(0);
  setAnswers([]);
  setQuizFinished(false);
};


//calculate progress

const progress = (answers.length / questions.length) * 100;


//landing page

if (!gameStarted) {
  return (
    <div className="landing-page">

      <div className="landing-card">

        <h1>🎭 MemeVerse</h1>

        <p className="subtitle">
          Discover your inner meme.
        </p>

        <p className="description">
          Take fun personality quizzes, unlock hilarious results,
          and more mini games coming soon.
        </p>

        <button
          className="start-btn"
          onClick={() => {

          window.gtag?.("event", "quiz_started");
    
         setGameStarted(true)}}
        >
          Start Quiz
        </button>

      </div>

    </div>
  );
}


//result page


if (quizFinished) {

  const winner = getResult();

  window.gtag?.("event", "meme_result_viewed", { meme_name: winner  });
  
  return (
    <div className="App">

      <h1>Your Meme Is...</h1>

<img
  src={memeImages[results[winner]?.image]}
  alt={winner}
  className="meme-image"
/>

<h2>{winner}</h2>

<p className="result-description">
  {results[winner]?.description}
</p>

<div className="footer-credit">
  Made by <strong>nia_thegreat</strong> ·{" "}
  <a
    href="https://github.com/nia-thegreat"
    target="_blank"
    rel="noopener noreferrer"
  >
    GitHub
  </a>
</div>

<button onClick={restartQuiz}>
  🔄 Play Again
</button>

    </div>
  );
}
   

//main render

  return (
    <div className="App">
      <h1>Which Meme Are You?</h1>

      <div className="progress-bar">
      <div
    className="progress-fill"
    style={{ width: `${progress}%` }}
     ></div>
    </div>

      {questions.length > 0 ? (
        <>
        <h2>{questions[currentQuestion].question}</h2>
        <div className="options">
        {questions[currentQuestion].options.map((option) => (

          <button
          key={option.text}
          className={selectedOption === option.meme ? "selected" : ""}
          onClick={() => handleAnswer(option.meme)}
           >
          {option.text}
          </button>
  
      ))}
      </div>

        </>
      ) : (
        <p>Loading...</p>
      )}

    </div>
  );
  
}

export default App;