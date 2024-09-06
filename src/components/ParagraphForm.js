import React, { useState } from "react";
import "./ParagraphForm.css";

const ParagraphForm = ({ onSubmit }) => {
  const [level, setLevel] = useState("easy");
  const [paragraph, setParagraph] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (paragraph.trim()) {
      onSubmit(paragraph, level);
      setParagraph("");
    }
  };

  return (
    <div className="paragraph-form">
      <h3>Create Your Own Paragraph</h3>
      <form onSubmit={handleFormSubmit}>
        <label>Select Difficulty:</label>
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <textarea
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
          placeholder="Enter your paragraph here..."
          rows={5}
          cols={50}
        />

        <button type="submit">Submit Paragraph</button>
      </form>
    </div>
  );
};

export default ParagraphForm;
