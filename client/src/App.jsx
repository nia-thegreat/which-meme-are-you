import { useEffect, useState } from "react";

function App() {
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/meme")
      .then((response) => response.json())
      .then((data) => {
        setMeme(data);
      });
  }, []);

  return (
    <div>
      <h1>Which Meme Are You?</h1>

      {meme ? (
        <>
          <h2>{meme.meme}</h2>
          <p>{meme.description}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;