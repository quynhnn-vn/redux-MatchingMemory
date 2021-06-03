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
      Matched Pairs: {Math.floor(cardsMatched.length / 2)}
      {currentBoard.length === cardsMatched.length && <p>You win !</p>}
    </div>
  );
};
