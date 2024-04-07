import React, { useState, useEffect } from 'react';
import { IoPersonAdd } from "react-icons/io5";
import './App.css';
import WelcomeForm from "./Components/WelcomeBoard";
import Board from "./Components/Board";
import WelcomeBoardPlayerCard from "./Components/./WelcomeBoardPlayerCard";
import BackgroundMusic from "./Components/BackgroundMusic";

function App() {

  const [gameStarted, setGameStarted] = useState(false);

  // Define a function to handle game start
  const handleStartGame = () => {
    setGameStarted(true);
  };

  // Define a function to handle game restart
  const handleRestartGame = () => {
    setGameStarted(false);
    localStorage.removeItem('gameStarted'); // Clear game state from localStorage
  };

  // Load game state from localStorage on component mount
  useEffect(() => {
    const isGameStarted = localStorage.getItem('gameStarted');
    if (isGameStarted === 'true') {
      setGameStarted(true);
    }
  }, []);

  // Save game state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('gameStarted', String(gameStarted));
  }, [gameStarted]);

  return (
      <div>
          <BackgroundMusic />
        {/* Conditionally render either WelcomeForm or Board based on gameStarted state */}
        {gameStarted ? (
            <>
              <Board />
              <button onClick={handleRestartGame}>Restart Game</button>
            </>
        ) : (
            <WelcomeForm onStartGame={handleStartGame}/>
        )}
      </div>
  );
  // return <WelcomeBoardPlayerCard name={"Jakub"} chipBalance={100}></WelcomeBoardPlayerCard>;
}

export default App;
