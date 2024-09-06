import React, { useState, useEffect } from "react";
import TypingInput from "./TypingInput";
import ParagraphForm from "./ParagraphForm";
import "./Game.css";

const defaultParagraphs = {
  easy: "This is an easy paragraph for typing.",
  medium: "Typing speed improves with practice and patience.",
  hard: "Consistent typing practice will lead to proficiency and efficiency."
};

const Game = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const [paragraphs, setParagraphs] = useState(defaultParagraphs);
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedWords, setTypedWords] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  // Load the selected paragraph based on difficulty
  useEffect(() => {
    const selectedParagraph = paragraphs[difficulty];
    setWords(selectedParagraph.split(" "));
    setTypedWords([]);
    setCurrentWordIndex(0);
    setStartTime(null);
    setEndTime(null);
    setAccuracy(100); // Reset accuracy on difficulty change
  }, [difficulty, paragraphs]);

  // Handle typing input and track WPM, accuracy, and correctness of words
  const handleWordTyped = (typedWord) => {
    if (!startTime) setStartTime(Date.now());

    const correct = words[currentWordIndex] === typedWord.trim();
    setTypedWords((prev) => [...prev, { word: typedWord.trim(), correct }]);
    setCurrentWordIndex(currentWordIndex + 1);

    // Check if this is the last word to stop the timer
    if (currentWordIndex === words.length - 1) {
      setEndTime(Date.now());
    }

    // Calculate WPM if typing is still ongoing
    if (!endTime) {
      const elapsedMinutes = (Date.now() - startTime) / 1000 / 60;
      setWpm(((currentWordIndex + 1) / elapsedMinutes).toFixed(2));
    }

    // Calculate Accuracy
    const correctWords = typedWords.filter(word => word.correct).length + (correct ? 1 : 0);
    const totalWordsTyped = currentWordIndex + 1;
    setAccuracy(((correctWords / totalWordsTyped) * 100).toFixed(2));
  };

  // Calculate final WPM when typing is done
  useEffect(() => {
    if (endTime && startTime) {
      const elapsedMinutes = (endTime - startTime) / 1000 / 60;
      setWpm(((currentWordIndex) / elapsedMinutes).toFixed(2));
    }
  }, [endTime, startTime, currentWordIndex]);

  const handleParagraphSubmit = (newParagraph, level) => {
    setParagraphs((prev) => ({
      ...prev,
      [level]: newParagraph
    }));
  };

  return (
    <div className="game-container">
      <h2>Typing Game</h2>

      {/* Instructions */}
      <div className="instructions">
        <h4>How to Play</h4>
        <p>Select a difficulty level, and the paragraph will appear. Type the paragraph as quickly and accurately as you can.</p>
        <p>
          <strong>WPM (Words Per Minute):</strong> This measures your typing speed, calculated by how many words you type correctly per minute.
        </p>
        <p>
          <strong>Accuracy:</strong> This measures how accurate your typing is, shown as a percentage of correct words compared to total words typed.
        </p>
        <p>Once you type a word and press the space bar, it will be locked. You cannot go back and correct previous words.</p>
      </div>

      {/* Difficulty Selection */}
      <div className="difficulty-selector">
        <label>Select Difficulty:</label>
        <div>
          <input
            type="radio"
            value="easy"
            checked={difficulty === "easy"}
            onChange={(e) => setDifficulty(e.target.value)}
          />
          Easy
          <input
            type="radio"
            value="medium"
            checked={difficulty === "medium"}
            onChange={(e) => setDifficulty(e.target.value)}
          />
          Medium
          <input
            type="radio"
            value="hard"
            checked={difficulty === "hard"}
            onChange={(e) => setDifficulty(e.target.value)}
          />
          Hard
        </div>
      </div>

      {/* Paragraph Display */}
      <div className="paragraph">
        {words.map((word, index) => (
          <span
            key={index}
            className={`word ${
              index < currentWordIndex
                ? typedWords[index]?.correct
                  ? "correct"
                  : "incorrect"
                : ""
            }`}
          >
            {word + " "}
          </span>
        ))}
      </div>

      {/* Typing Input with Feedback */}
      <TypingInput
        onWordTyped={handleWordTyped}
        currentWord={words[currentWordIndex]}
        isCorrect={
          words[currentWordIndex]
            ? typedWords[currentWordIndex]?.word === words[currentWordIndex]
            : true
        }
      />

      {/* WPM and Accuracy Display */}
      <div className="stats">
        <p>WPM: <span>{wpm}</span></p>
        <p>Accuracy: <span>{accuracy}%</span></p>
      </div>

      {/* Paragraph Creation Form */}
      <ParagraphForm onSubmit={handleParagraphSubmit} />
    </div>
  );
};

export default Game;
