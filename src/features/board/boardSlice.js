const wordPairs = [
  "Provider",
  "Provider",
  "selector",
  "selector",
  "useSelector()",
  "useSelector()",
  "useDispatch()",
  "useDispatch()",
  "Pure Function",
  "Pure Function",
  "react-redux",
  "react-redux",
];
const randomWords = () => {
  let words = [];
  let newWordPairs = [...wordPairs];
  const reps = newWordPairs.length;
  for (let i = 0; i < reps; i++) {
    const wordIndex = Math.floor(Math.random() * newWordPairs.length);
    words.push(newWordPairs[wordIndex]);
    newWordPairs.splice(wordIndex, 1);
  }
  return words;
};

// Create actions
// Randomize cards array and set false for all visible and matched properties
export const setBoard = () => {
  const words = randomWords();
  return {
    type: "board/setBoard",
    payload: words,
  };
};
// Set visible property of flipped card to true: display card content
export const flipCard = (id) => {
  return {
    type: "board/flipCard",
    payload: id,
  };
};
// Set visible property of flipped but unmatched cards to false: hide card content
export const resetCards = () => {
  return {
    type: "board/resetCards",
  };
};

// Create initialState and Reducer
const initialBoardState = [
  { id: 0, contents: "Provider", visible: false, matched: false },
  { id: 1, contents: "Provider", visible: false, matched: false },
  { id: 2, contents: "selector", visible: false, matched: false },
  { id: 3, contents: "selector", visible: false, matched: false },
  { id: 4, contents: "useSelector()", visible: false, matched: false },
  { id: 5, contents: "useSelector()", visible: false, matched: false },
  { id: 6, contents: "useDispatch()", visible: false, matched: false },
  { id: 7, contents: "useDispatch()", visible: false, matched: false },
  { id: 8, contents: "Pure Function", visible: false, matched: false },
  { id: 9, contents: "Pure Function", visible: false, matched: false },
  { id: 10, contents: "react-redux", visible: false, matched: false },
  { id: 11, contents: "react-redux", visible: false, matched: false },
];
export const boardReducer = (boardState = initialBoardState, action) => {
  switch (action.type) {
    case "board/setBoard": {
      let setState = [];
      action.payload.forEach((element, index) =>
        setState.push({
          id: index,
          contents: element,
          visible: false,
          matched: false,
        })
      );
      return setState;
    }
    case "board/flipCard": {
      let flipState = [...boardState];
      const cardId = action.payload;
      flipState[cardId] = { ...boardState[cardId], visible: true };
      const [index1, index2] = flipState
        .filter((card) => card.visible)
        .map((card) => card.id);
      if (index2 !== undefined) {
        const card1 = flipState[index1];
        const card2 = flipState[index2];
        if (card1.contents === card2.contents) {
          flipState[index1] = { ...card1, visible: false, matched: true };
          flipState[index2] = { ...card2, visible: false, matched: true };
        }
      }
      return flipState;
    }
    case "board/resetCards":
      return boardState.map((card) => ({ ...card, visible: false }));
    default:
      return boardState;
  }
};

// Create selectors
// Select id and contents from cards, to create cards grid
export const selectBoard = (state) => {
  return state.board.map((card) => ({
    id: card.id,
    contents: card.contents,
  }));
};
// Select card ids that have visible property is true
export const selectVisibleIds = (state) => {
  return state.board.filter((card) => card.visible).map((card) => card.id);
};
// Select card ids that have matched property is true
export const selectMatchedIds = (state) => {
  return state.board.filter((card) => card.matched).map((card) => card.id);
};