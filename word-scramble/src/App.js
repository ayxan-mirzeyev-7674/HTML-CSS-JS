import { useEffect, useState } from "react";
import "./App.css";
import Word from "./components/Word";

function App() {
  const [words, setWords] = useState([]);
  const [wordsDefs, setWordsDefs] = useState([]);
  const [wordId, setWordId] = useState(0);
  const [points, setPoints] = useState(0);

  const WORDS_API_URL = "https://random-word-api.vercel.app/api?words=10";
  const DEFS_API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  useEffect(() => {
    fetch(WORDS_API_URL)
      .then((response) => response.json())
      .then((data) => setWords(data));
  }, []);

  useEffect(() => {
    // Fetch definitions for each word
    const fetchDefinitions = async () => {
      const defsPromises = words.map(async (word) => {
        const response = await fetch(`${DEFS_API_URL}${word}`);
        const data = await response.json();
        return {
          word,
          definition:
            data[0]?.meanings[0]?.definitions[0]?.definition || "Not found",
        };
      });

      const defs = await Promise.all(defsPromises);
      setWordsDefs(defs.filter((def) => def.definition !== "Not found"));
    };

    if (words.length > 0) {
      fetchDefinitions();
    }
  }, [words]);

  useEffect(() => {
    wordsDefs.length > 0 && console.log(wordsDefs);
  }, [wordsDefs]);

  const nextLevel = (st) => {
    if (wordId !== wordsDefs.length - 1) {
      setPoints((prev) => prev + st);
      setWordId((prev) => prev + 1);
    }
  };

  useEffect(() => {
    console.log(points, wordId);
  }, [points]);

  return (
    <div className="main">
      {wordsDefs.length > 0 && (
        <Word
          data={wordsDefs[wordId]}
          onNext={(st) => nextLevel(st)}
          level={{ current: wordId, all: wordsDefs.length }}
        />
      )}
    </div>
  );
}

export default App;
