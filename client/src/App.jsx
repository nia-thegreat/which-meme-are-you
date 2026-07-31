import { useEffect, useState } from "react";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
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

if (quizFinished) {
    return (
      <div>
        <h1>you are....</h1>
        <h2>{getResult()}</h2>
      </div>
    );
  }
   

  return (
    <div>
      <h1>Which Meme Are You?</h1>

      {questions.length > 0 ? (
        <>
        <h2>{questions[currentQuestion].question}</h2>

        {questions[currentQuestion].options.map((option) => (

          <button
            key={option.text}
            onClick={() => handleAnswer(option.meme)} >
            {option.text}
          </button>
  
      ))}

          <button onClick={() => setCurrentQuestion(currentQuestion + 1)} >
            Next
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}

    </div>
  );
  
}

export default App;