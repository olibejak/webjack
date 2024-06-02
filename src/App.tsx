import React, { useState, useEffect } from 'react';
import './App.css';
import WelcomeForm from "./Components/WelcomeBoard/WelcomeBoard";
import Board from "./Components/Board/Board";
import Navbar from "./Components/Navbar/Navbar";
import {v4 as uuidv4} from "uuid";
import {Game} from "./Game/Game"
import {Dealer} from "./Game/Dealer";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [dealer, setDealer] = useState<Dealer | null>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '#/welcome');

  // Initiate or update Game and Dealer
  useEffect(() => {
    setGame(Game.getInstance());
    setDealer(Dealer.getInstance());
  }, [gameStarted]);

  // Reset players data and game start on ctr + F5
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
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameStarted]);

  // History and main (Welcome Board and Board) component swapping
      useEffect(() => {
        const handleHashChange = () => {
          setCurrentRoute(window.location.hash);
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => {
          window.removeEventListener('hashchange', handleHashChange);
        };
      }, []);

      const handleStartGame = () => {
        setGameStarted(true);
        window.location.hash = '#/board';
      };

      // Remove game started from local storage and change location to welcome board
      const handleRestartGame = () => {
        setGameStarted(false);
        localStorage.removeItem('gameStarted'); // Clear game state from localStorage
        window.location.hash = '#/welcome';
      };

      // set correct location depending on gameStarted from localStorage
      useEffect(() => {
        const isGameStarted = localStorage.getItem('gameStarted');
        if (isGameStarted === 'true') {
          setGameStarted(true);
          window.location.hash = '#/board';
        } else {
          window.location.hash = '#/welcome';
        }
      }, []);

      // set game started local storage
      useEffect(() => {
        localStorage.setItem('gameStarted', String(gameStarted));
      }, [gameStarted]);

  return (
      <>
        {currentRoute === '#/welcome' && (
            <WelcomeForm onStartGame={handleStartGame} />
        )}
        {currentRoute === '#/board' && dealer && game && (
            <>
              <Navbar />
              <Board dealer={dealer} game={game} restartGame={handleRestartGame} />
            </>
        )}
        {currentRoute === '#/board' && (!dealer || !game) && (
            <p>Please reload the page</p>
        )}
      </>
  );
}

export default App;
