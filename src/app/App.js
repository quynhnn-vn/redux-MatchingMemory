import "./App.css";
import React from "react";
import { Score } from "../features/score/Score";
import { Board } from "../features/board/Board";
import { useDispatch } from "react-redux";
import { setBoard } from "../features/board/boardSlice";

// App renders the Score and Board components
const App = () => {
    const dispatch = useDispatch();
    // Create card board in the first render
    dispatch(setBoard());
    
    // Create new card board when clicked New Game button
    const startGameHandler = () => {
        dispatch(setBoard());
    }

    return (
        <div className="App">
            <Score />
            <Board />
            <footer className="footer">
                <button className="start-button" onClick={startGameHandler}>
                    New Game
                </button>
            </footer>
        </div>
    )
};
export default App;