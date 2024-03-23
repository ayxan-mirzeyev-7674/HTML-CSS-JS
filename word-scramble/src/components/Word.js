import { useEffect, useState } from "react";
import styles from "./Word.module.css";

function Word({ data, onNext, level }) {
  const [wordArray, setWordArray] = useState([]);
  const [written, setWritten] = useState([]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log(event.key, 2);
      if (event.key === "Backspace") {
        for (let i = written.length - 1; i > -1; i--) {
          if (written[i].letter !== undefined) {
            removeLetter(i, written[i].letter, written[i].key, event);
            break;
          }
        }
      } else {
        for (let i = 0; i < wordArray.length; i++) {
          if (wordArray[i] === event.key) {
            addLetter(i, wordArray[i], event);
            console.log("Found", i);
            break;
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // Cleanup the event listener when the component unmounts
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [wordArray]);

  useEffect(() => {
    setWordArray(data.word.split("").sort(() => Math.random() - 0.5));
    setWritten(data.word.split("").map((word) => ""));
  }, [data]);

  useEffect(() => {
    let wrWord = written.map((obj) => obj.letter).join("");
    if (wrWord === data.word) {
      onNext(1);
      setSelected(0);
    }
  }, [written]);

  useEffect(() => {
    console.log(wordArray);
  }, [wordArray]);

  const addLetter = (index, letter, event) => {
    event.preventDefault();
    console.log(index);
    let data = written;
    written[selected] = { key: index, letter: letter };
    setWritten([...data]);
    let wordData = wordArray;
    wordArray[index] = "";
    setWordArray([...wordData]);
    regulateSelected();
    //setSelected((prev) => prev + 1);
    console.log(data);
    console.log(selected);
  };

  const removeLetter = (index, letter, key, event) => {
    event.preventDefault();
    console.log(index, letter, key);
    let wordData = wordArray;
    wordArray[key] = letter;
    setWordArray([...wordData]);
    console.log(wordData);
    let data = written;
    written[index] = "";
    setWritten([...data]);
    regulateSelected();
  };

  const regulateSelected = () => {
    for (let i = 0; i < written.length; i++) {
      if (written[i].letter === undefined) {
        setSelected(i);
        return true;
      }
    }
    setSelected(written.length);
  };

  return (
    <div className={styles.main}>
      <div style={{ fontSize: "27px", fontWeight: "bold" }}>
        Level {level.current + 1}/{level.all}
      </div>
      <p className={styles.definition}>
        <span className={styles.definitionSpan}>{data.definition}</span>
      </p>
      <div className={styles.letterDiv}>
        {written?.map(({ key, letter }, index) => (
          <button
            key={index}
            className={
              selected === index
                ? styles.selectedLetterBox
                : letter === undefined
                ? styles.wrLetterBox
                : styles.letterBox
            }
            onClick={() =>
              letter !== undefined
                ? removeLetter(index, letter, key, event)
                : () => false
            }
          >
            {letter}
          </button>
        ))}
      </div>
      <div className={styles.letterDiv}>
        {wordArray.map((letter, index) => (
          <button
            onClick={() => {
              addLetter(index, letter, event);
            }}
            key={index}
            className={styles.letterBox}
            disabled={letter === ""}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Word;
