import React, { useState, useEffect, useRef } from 'react';
import PlayerSlot from './PlayerSlot';
import DealerSlot from './DealerSlot';
import DeckSlot from './DeckSlot';
import './Board.css';
import {Player} from "../../Game/Game";
import {PlayerJson} from "../../Game/Types";

function Board() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [activePlayerIndex, setActivePlayerIndex] = useState(0);
    const playerSlotRef = useRef<HTMLDivElement>(null);
    let standingCount = 0;

    // Load players from local storage on component mount
    useEffect(() => {
        const playersData = localStorage.getItem('playersData');
        const playersJson = playersData ? JSON.parse(playersData) : [];
        const playerInstances = playersJson.map((playerJson: PlayerJson) => new Player(playerJson));
        playerInstances[0].setIsPlaying(true);
        setPlayers(playerInstances);
    }, []);

    // useEffect(() => {
    //     // Scroll to active player when it changes
    //     if (playerSlotRef.current && playerSlotRef.current.childNodes[activePlayerIndex]) {
    //         const activePlayerElement = playerSlotRef.current.childNodes[activePlayerIndex] as HTMLElement;
    //         activePlayerElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    //     }
    // }, [activePlayerIndex, players]);

    const handleHit = async () => {
        const updatedPlayers = [...players];
        await updatedPlayers[activePlayerIndex].drawCard();
        setPlayers(updatedPlayers);
        setActivePlayer();
    };

    const handleStand = () => {
        const updatedPlayers = [...players];
        updatedPlayers[activePlayerIndex].setIsStanding(true);
        updatedPlayers[activePlayerIndex].setIsPlaying(false);

        let nextPlayerIndex = (activePlayerIndex + 1) % players.length;
        while (updatedPlayers[nextPlayerIndex].getIsStanding()) {
            nextPlayerIndex = (nextPlayerIndex + 1) % players.length;
        }

        if (nextPlayerIndex === activePlayerIndex) {
            handleEnd();
        } else {
            updatedPlayers[nextPlayerIndex].setIsPlaying(true);
            setActivePlayerIndex(nextPlayerIndex);
        }

        setPlayers(updatedPlayers);
    };

    const setActivePlayer = () => {
        let nextPlayerIndex = activePlayerIndex;
        for (let i = 0; i < players.length; i++) {
            nextPlayerIndex = (nextPlayerIndex + 1) % players.length;
            if (!players[nextPlayerIndex].getIsStanding()) {
                setActivePlayerIndex(nextPlayerIndex);
                return;
            }
        }
        handleEnd();
    }

    const handleEnd = () => {
        console.log("reset");
        const updatedPlayers = [...players];
        players[activePlayerIndex].resetHand(); // Add the card to the active player
        setPlayers(updatedPlayers);
        players[activePlayerIndex].setIsStanding(false);
    }

    return (
        <div className="board">
            <div className="dealer-container">
                <DealerSlot />
                <DeckSlot />
            </div>
            <div className="player-slot-container">
                {players.map((player, index) => (
                    <PlayerSlot
                        key={index}
                        player={player}
                        isActive={index === activePlayerIndex}
                        // onClick={() => setActivePlayerIndex(index)}
                    />
                ))}
            </div>
            <div className="action-button-container">
                <button id="hit" onClick={handleHit}>
                    HIT
                </button>
                <button id="stand" onClick={handleStand}>
                    STAND
                </button>
            </div>
        </div>
    );
}

export default Board;