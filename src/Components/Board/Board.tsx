import React, { useState, useEffect, useRef } from 'react';
import PlayerSlot from './PlayerSlot';
import DealerSlot from './DealerSlot';
import DeckSlot from './DeckSlot';
import './Board.css';
import {Dealer, Game, Player} from "../../Game/Game";
import {PlayerJson} from "../../Game/Types";

function Board() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [activePlayerIndex, setActivePlayerIndex] = useState(0);
    const [dealer, setDealer] = useState<Dealer>(Dealer.getInstance);
    const [game, setGame] = useState<Game>(Game.getInstance);
    const [locked, setLocked] = useState(false);
    const playerSlotRef = useRef<HTMLDivElement>(null);
    let standingCount = 0;

    // Load players from local storage on component mount
    useEffect(() => {
        dealer || setDealer(Dealer.getInstance);
        // game || setGame(Game.getInstance);
        // setPlayers(game.getPlayers());
    }, []);

    // useEffect(() => {
    //     // Scroll to active player when it changes
    //     if (playerSlotRef.current && playerSlotRef.current.childNodes[activePlayerIndex]) {
    //         const activePlayerElement = playerSlotRef.current.childNodes[activePlayerIndex] as HTMLElement;
    //         activePlayerElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    //     }
    // }, [activePlayerIndex, players]);

    const handleHit = async () => {
        setLocked(true)
        const updatedPlayers = [...players];
        await updatedPlayers[activePlayerIndex].drawCard();
        setPlayers(updatedPlayers);
        setActivePlayer();
        setLocked(false)
    };

    const handleStand = () => {
        setLocked(true)
        const updatedPlayers = [...players];
        updatedPlayers[activePlayerIndex].setIsStanding(true);
        updatedPlayers[activePlayerIndex].setIsPlaying(false);

        let nextPlayerIndex = (activePlayerIndex + 1) % players.length;
        for (let i = 0; i < players.length - 1; ++i) {
            if (!updatedPlayers[nextPlayerIndex].getIsStanding())
                break;
            nextPlayerIndex = (nextPlayerIndex + 1) % players.length;
        }
        if (nextPlayerIndex === activePlayerIndex) {
            handleEnd();
        } else {
            updatedPlayers[nextPlayerIndex].setIsPlaying(true);
            setActivePlayerIndex(nextPlayerIndex);
        }

        setPlayers(updatedPlayers);
        setLocked(false)
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

    const handleEnd = async () => {
        const updatedPlayers = [...players];
        for (let i = 0; i < players.length; ++i)
            players[i].resetHand(); // Add the card to the active player
        setPlayers(updatedPlayers);
        players[activePlayerIndex].setIsStanding(false);
        await dealer.executeEnd();
    }

    return (
        <div className="board">
            <div className="dealer-container">
                <DealerSlot
                    handValueToString={dealer.getHandValueToString()}
                    dealerHand={dealer.getHand()}
                />
                <DeckSlot/>
            </div>
            {locked && (
                <div className="overlay active">
                    <div className="spinner"></div>
                </div>
            )}
            <div className={"action-button-container"}
                style={locked ? {opacity: "0"} : {}}>
                <button id="hit" onClick={handleHit} disabled={locked}
                        className={locked ? 'disabled-button' : ''}>
                    HIT
                </button>
                <button id="stand" onClick={handleStand} disabled={locked}
                    className={locked ? 'disabled-button' : ''} >
                    STAND
                </button>
            </div>
            <div className="player-slot-container">
                {players.map((player, index) => (
                    <PlayerSlot
                        key={index}
                        name={player.getName()}
                        chipBalance={player.getChipBalance()}
                        playerHand={player.getHand()}
                        isActive={index === activePlayerIndex}
                        isStanding={player.getIsStanding()}
                        handValueToString={player.getHandValueToString()}
                    />
                ))}
            </div>
        </div>
    );
}

export default Board;