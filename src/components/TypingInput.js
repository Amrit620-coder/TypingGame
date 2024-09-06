import React, { useState } from "react";
import "./TypingInput.css";

const TypingInput = ({ onWordTyped, currentWord, isCorrect }) => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.endsWith(" ")) {
      onWordTyped(value.trim());
      setInput("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Start typing..."
        autoFocus
        className={isCorrect ? "" : "error"}
      />
    </div>
  );
};

export default TypingInput;
