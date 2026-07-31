import { useEffect, useState } from "react";
import "./App.css";
import pepe from "./assets/memes/pepe.webp";
import cheems from "./assets/memes/cheems.jpeg";
import gigachad from "./assets/memes/gigachad.jpeg";
import cryingCat from "./assets/memes/Crying_Cat.jpg";

const memeImages = {
  "pepe.webp": pepe,
  "cheems.jpeg": cheems,
  "gigachad.jpeg": gigachad,
  "Crying_Cat.jpg": cryingCat,
};


function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [results, setResults] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      });

      fetch("http://localhost:5000/api/results")
  .then((response) => response.json())
  .then((data) => {
    setResults(data);
  });

  }, []);
  

   const handleAnswer = (meme) => {
  const updatedAnswers = [...answers, meme];
  setAnswers(updatedAnswers);

  if (currentQuestion < questions.length - 1) {
    setCurrentQuestion(currentQuestion + 1);
  } else {
    console.log(updatedAnswers);
    setQuizFinished(true);
  }
};

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

const restartQuiz = () => {
  setCurrentQuestion(0);
  setAnswers([]);
  setQuizFinished(false);
};

const progress = (answers.length / questions.length) * 100;

if (quizFinished) {

  const winner = getResult();

  return (
    <div className="App">
      <h1>{winner}</h1>

      <img
        src={memeImages[results[winner]?.image]}
        alt={winner}
        className="meme-image"
      />

      <p>{results[winner]?.description}</p>
     
      <button onClick={restartQuiz}>
       Try Again
       </button>
    </div>
  );
}
   

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
        <div classname="options">
        {questions[currentQuestion].options.map((option) => (

          <button
            key={option.text}
            onClick={() => handleAnswer(option.meme)} >
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