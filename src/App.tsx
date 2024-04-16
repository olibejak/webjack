import React, { useState, useEffect } from 'react';
import './App.css';
import WelcomeForm from "./Components/WelcomeBoard/WelcomeBoard";
import Board from "./Components/Board";
import BackgroundMusic from "./Components/BackgroundMusic/BackgroundMusic";
import {v4 as uuidv4} from "uuid";

function App() {

  const [gameStarted, setGameStarted] = useState(false);

  /**
   * Deleting playerData and initializing with empty player on ctr + F5
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // window.addEventListener('keydown', handleKeyDown);
      if (event.ctrlKey && event.key === 'F5') {
        localStorage.getItem('playersData');
        const defaultPlayer = JSON.stringify([{id : uuidv4(), name: '', chipBalance: 100 }]);
        localStorage.setItem('playersData', defaultPlayer);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
