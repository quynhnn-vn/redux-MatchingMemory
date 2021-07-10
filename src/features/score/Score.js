import React from "react";
import { useSelector } from "react-redux";
import { selectMatchedIds, selectBoard } from "../board/boardSlice";

// Score displays the number of matched cards
export const Score = () => {
  // Retrieve array of current cards board and matched cards
  const currentBoard = useSelector(selectBoard);
  const cardsMatched = useSelector(selectMatchedIds);
  // Display number of matched card pairs
  return (
    <div className="score-container">
      <h2>
        <span>Score: {Math.floor(cardsMatched.length / 2)}</span>
        <br/>
        {currentBoard.length === cardsMatched.length && (
          <span>"Yay! You did it!"</span>
        )}
      </h2>
    </div>
  );
};
