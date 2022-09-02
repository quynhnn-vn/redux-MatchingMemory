import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectVisibleIds, flipCard, selectMatchedIds, resetCards } from "../../boardSlice";
import cardLogo from ".card.jpeg"

// let cardLogo =
//  "https://static-assets.codecademy.com/Courses/Learn-Redux/matching-game/codecademy_logo.png";

// Card displays the card content when flipped over
export const Card = ({ id, contents }) => {
  // Retrieve IDs of flipped cards
  const visibleIds = useSelector(selectVisibleIds);
  // Retrieve IDs of matched cards
  const matchedIds = useSelector(selectMatchedIds);

  const dispatch = useDispatch();

  // Handle showing content of a card
  const flipHandler = (id) => {
    dispatch(flipCard(id));
  };
  // Handle hiding content of cards
  const resetHandler = () => {
    dispatch(resetCards());
  }

  let click = () => flipHandler(id);

  // Set the default style and image for unflipped cards
  let cardStyle = "resting";
  let cardText = (
    <img className="logo-placeholder" alt="Card option" src={cardLogo} />
  );

  // Show the content of cards if they are flipped or matched
  if (visibleIds.includes(id) || matchedIds.includes(id)) {
    cardText = contents;
  }

  // Change the style if matched cards
  if (matchedIds.includes(id)) {
    cardStyle = "matched";
  }

  // Change the style if unmatched cards
  // and stop flipping when two cards have been flipped
  if (visibleIds.length === 2) {
    if (visibleIds.includes(id) && !matchedIds.includes(id)) {
      cardStyle = "no-match";
    }
    // By clicking any card: show only flipped card and hide another unmatched cards 
    click = () => {
      resetHandler();
      flipHandler(id);
    };
  }

  return (
    <button className={`card ${cardStyle}`} onClick={click}>
      {cardText}
    </button>
  );
};
