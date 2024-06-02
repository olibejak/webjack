import React, {useEffect, useState} from 'react';
import {Card} from '../../Game/Types';
import './Board.css';
import {Game} from "../../Game/Game";
import {Player} from "../../Game/Player";

interface PlayerSlotProps {
    player: Player;
    isActive: boolean; // blue highlight of the active player
    hit: () => void;
}

const PlayerSlot: React.FC<PlayerSlotProps> = ({ player, isActive, hit }) => {
    const [hand, setHand] = useState<Card[]>(player.getHand());
    const [newCard, setNewCard] = useState<Card | null>(null);
    const game = Game.getInstance();

    const [newBet, setNewBet] = useState<number | null>(Math.floor(player.getChipBalance() / 3) || 1);

    useEffect(() => {
        if (newCard) {
            setTimeout(() => setNewCard(null), 300);  // Clear new card after animation
        }
    }, [newCard]);

    // Update player hand and new card for animation
    useEffect(() => {
        const handleChange = (updatedPlayer: Player) => {
            setHand([...updatedPlayer.getHand()]);
            setNewCard(updatedPlayer.getHand().slice(-1)[0]);
        };

        player.setOnChangeListener(handleChange); // Listener for dealer hand changes

        return () => {
            player.setOnChangeListener(null); // Clean up listener on unmount
        };
    }, [player]);

    // bet input handler
    const setBet = (bet: React.ChangeEvent<HTMLInputElement>) => {
        let betVal = parseInt(bet.target.value);
        if (!betVal) { // empty input
            setNewBet(null)
        } else if (betVal > 0 && betVal <= player.getChipBalance()) { // valid input
            player.setBet(betVal);
            setNewBet(betVal);
        } else { // invalid input
            setNewBet(player.getBet());
        }
    }

    // Trigger hit when card dragged to active player
    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (isActive) {
            hit();
        }
    };

    // Deck card DnD
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    return (
        <div
            className="player-slot"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <div className={`card-container ${isActive && game.getIsPlaying() && 'playing'} ${player.getIsStanding() && 'standing'}`}>
                {
                    game.getIsPlaying() ?
                        hand.map((card, index) => (
                            <img
                                key={index}
                                className={`card ${newCard && card.code === newCard.code ? 'enter' : ''}`}
                                src={card.image}
                                alt={`Dealer card ${index + 1}`}
                                style={{ top: `${index * -20 + 60}px`, left: `${index * 20}px` }}
                            />
                        )) :
                        <ul className={"player-info"}>
                            <li>{player.getBlackJack() && "Black Jack"}</li>
                            <li style={player.getBetOutcome().startsWith('+') ? { color: "lightgreen" } : { color: "red" }}>
                                {player.getBetOutcome()}</li>
                            <li>
                                {player.getChipBalance()} {player.getChipBalance() === 1 ? ' chip' : ' chips'}
                            </li>
                            <li>
                                <label htmlFor={`bet-${player.getId}`}>Bet: </label>
                                <input type={"number"} min={1} id={`bet-${player.getId}`} max={player.getChipBalance()}
                                       onInput={setBet} value={newBet ? newBet : ""}></input>
                            </li>
                        </ul>
                }
            </div>
            <ul className="player-info" id="playing">
                <li>{player.getHandValueToString() || player.getLastGameHandValue() || "\u00A0"}</li>
                <li>{player.getName()}</li>
            </ul>
        </div>
    );
};

export default PlayerSlot;