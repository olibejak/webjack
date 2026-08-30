import React, { useState, useEffect } from 'react';
import PlayerSlot from './PlayerSlot';
import DealerSlot from './DealerSlot';
import DeckSlot from './DeckSlot';
import './Board.css';
import {Game} from "../../Game/Game";
import {Dealer} from "../../Game/Dealer";
import {Player} from "../../Game/Player";

interface BoardProps {
    dealer: Dealer;
    game: Game;
    restartGame?: () => void
}


const Board: React.FC<BoardProps> = ({dealer, game, restartGame}) => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [activePlayerIndex, setActivePlayerIndex] = useState(-1);
    const [loading, setLoading] = useState<boolean>(false); // loading indicator
    const [locked, setLocked] = useState(false); // locks action buttons
    const [preGame, setPreGame] = useState<boolean>(); // Shows bets

    // Load players from local storage and reset dealer
    useEffect(() => {
        setPlayers(game.getPlayers());
        dealer.reset();
        setPreGame(true);
    }, [dealer, game]);

    const handleStart = async () => {
        setLocked(true);
        // setPlayers(game.getPlayers());
        setLoading(true);
        await game.startGame(() => setLoading(false));
        setPreGame(false);
        setActivePlayerIndex(-1);
        await setActivePlayer();
        setLocked(false);
    }

    const handleHit = async () => {
        setLocked(true)
        setLoading(true);
        await players[activePlayerIndex].drawCard();
        setLoading(false);
        await setActivePlayer();
        setLocked(false)
    };

    const handleStand = async () => {
        setLocked(true)
        players[activePlayerIndex].setIsStanding(true);
        await setActivePlayer();
        setLocked(false)
    };

    // Tries to find active player
    // If every player stands, ends the game
    const setActivePlayer = async () => {
        let nextPlayerIndex = activePlayerIndex;
        for (let i = 0; i < players.length; i++) {
            nextPlayerIndex = (nextPlayerIndex + 1) % players.length;
            if (!players[nextPlayerIndex].getIsStanding()) {
                setActivePlayerIndex(nextPlayerIndex);
                return;
            }
        }
        await handleEnd();
    }

    const handleEnd = async () => {
        await game.endGame();
        setPreGame(true);
    }

    return (
        <div className="board">
            <div className="dealer-container">
                <DealerSlot />
                <DeckSlot />
            </div>
            {loading && (
                <div className="overlay active">
                    <div className="spinner"></div>
                </div>
            )}
            <div className={"action-button-container"}
                 style={locked ? {opacity: "0"} : {}}>
                {preGame ?
                    <>
                        <button id={"start"} onClick={handleStart} disabled={!preGame || locked}
                                className={locked ? 'disabled-button' : ''}>
                            PLAY
                        </button>
                        <button id={"go-back"} onClick={restartGame} disabled={!preGame || locked}
                                className={locked ? 'disabled-button' : ''}>
                            BACK
                        </button>
                    </>
                    :
                    <>
                        <button id="hit" onClick={handleHit} disabled={locked}
                                className={locked ? 'disabled-button' : ''}>
                            HIT
                        </button>
                        <button id="stand" onClick={handleStand} disabled={locked}
                                className={locked ? 'disabled-button' : ''}>
                            STAND
                        </button>
                    </>
                }
            </div>
            <div className="player-slot-container">
                {players.map((player, index) => (
                    <PlayerSlot
                        key={index}
                        player={player}
                        isActive={index === activePlayerIndex}
                        hit={handleHit}
                    />
                ))}
            </div>
        </div>
    )
}

export default Board;