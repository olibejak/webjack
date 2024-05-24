import React, { useState, useEffect } from 'react';
import './App.css';
import WelcomeForm from "./Components/WelcomeBoard/WelcomeBoard";
import Board from "./Components/Board/Board";
import Navbar from "./Components/Navbar/Navbar";
import {v4 as uuidv4} from "uuid";
import {Game, Dealer} from "./Game/Game"

function App() {

  const [gameStarted, setGameStarted] = useState(false);
  const [game, setGame] = useState<Game>();

  /**
   * Deleting playerData and initializing with empty player on ctr + F5
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'F5') {
        setGameStarted(false);
        const defaultPlayer = JSON.stringify([{ id: uuidv4(), name: '', chipBalance: 100 }]);
        localStorage.setItem('playersData', defaultPlayer);
        console.log('Game restarted:', gameStarted);
        window.removeEventListener('keydown', handleKeyDown);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
  }, [gameStarted]);

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
      <>
        {/* Conditionally render either WelcomeForm or Board based on gameStarted state */}
        {gameStarted ? (
            <>
              <Navbar restartGame={() => handleRestartGame()} />
              <Board/>
            </>
        ) : (
            <WelcomeForm onStartGame={handleStartGame}/>
        )}
      </>
  );
}

export default App;
