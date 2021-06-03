import React from "react";
import { CardRow } from "./cardRow/CardRow";
import { useSelector } from "react-redux";
import { selectBoard } from "./boardSlice";

// Board creates a card grid for gameplay
export const Board = () => {
  // Retrieve cards array, each card has id and contents property
  const currentBoard = useSelector(selectBoard);
  // Calculate the number of CardRow components
  const numberOfCards = currentBoard.length;
  const columns = 3;
  const rows = Math.floor(numberOfCards / columns);
  // Add cards for each column
  const getRowCards = (row) => {
    let rowCards = [];
    for (let j = 0; j < columns; j++) {
      const cardIndex = row * columns + j;
      rowCards.push(currentBoard[cardIndex]);
    }
    return rowCards;
  };
  // Create an array containing CardRow components
  let content = [];
  for (let row = 0; row < rows; row++) {
    const rowCards = getRowCards(row);
    content.push(<CardRow key={row} cards={rowCards} />);
  }
  // Render array of CardRow components
  return <div className="cards-container">{content}</div>;
};
