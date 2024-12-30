import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

export default function QuoteBox() {
  const [quote, setQuote] = useState({ text: "Loading...", author: "" });
  const [color, setColor] = useState("#333"); // Initial color

  const fetchQuote = async () => {
    const response = await fetch(
      "https://api.api-ninjas.com/v1/quotes?category=inspirational",
      {
        headers: {
          "X-Api-Key": "JTW9I21Z12yMtgVQlTaHUQ==SBCyMnrhge3YeAlz", // Replace with your API key
        },
      }
    );
    const data = await response.json();
    setQuote({ text: data[0].quote, author: data[0].author });
    generateRandomColor(); // Change color with each new quote
  };

  const generateRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setColor(randomColor);
    document.body.style.backgroundColor = randomColor; // Apply background color to body
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div
      id="quote-box"
      style={{
        color: color, // Apply dynamic color to text
      }}
    >
      <p id="text">"{quote.text}"</p>
      <p id="author">- {quote.author}</p>
      <div className="action_btns">
        <button
          id="new-quote"
          style={{ backgroundColor: color }}
          onClick={fetchQuote}
        >
          New Quote
        </button>
        <div style={{ display: "flex", gap: "0.8rem" }}>
          <a
            id="tweet-quote"
            style={{ backgroundColor: color }}
            href={`https://twitter.com/intent/tweet?text="${quote.text}" - ${quote.author}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            className="tweet-quote"
            style={{ backgroundColor: color }}
            href={`https://www.facebook.com/sharer/sharer.php?u=https://quote-sharing-app.example&quote="${quote.text}" - ${quote.author}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </div>
      </div>
    </div>
  );
}
