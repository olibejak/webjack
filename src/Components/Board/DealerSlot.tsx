import React, { useEffect, useState } from "react";
import {Dealer} from "../../Game/Dealer";
import { Card } from "../../Game/Types";
import './Board.css';
import {Game} from "../../Game/Game";

const DealerSlot = () => {

    const game = Game.getInstance();
    const dealer = Dealer.getInstance();
    const [hand, setHand] = useState<Card[]>(dealer.getHand());
    const [newCard, setNewCard] = useState<Card | null>(null);

    useEffect(() => {
        if (newCard) {
            setTimeout(() => setNewCard(null), 300); // Clear new card after animation
        }
    }, [newCard]);

    // Update player hand and new card for animation
    useEffect(() => {
        const handleChange = (updatedPlayer: Dealer) => {
            setHand([...updatedPlayer.getHand()]);
            setNewCard(updatedPlayer.getHand().slice(-1)[0]);
        };

        dealer.setOnChangeListener(handleChange); // Listener for dealer hand changes

        return () => {
            dealer.setOnChangeListener(null);  // Clean up listener on unmount
        };
    }, [dealer]);

    return (
        <div className="player-slot">
            <ul className="player-info">
                <li>Dealer</li>
                <li>{dealer.getHandValueToString() || "\u00A0"}</li>
            </ul>
            <div className="card-container">
                {
                    hand.length > 0 && // second not showed card
                    <img
                        className={`card ${hand.length > 1 ? "enter" : ""} card-back`}
                        src={"https://www.deckofcardsapi.com/static/img/back.png"}
                        alt={`Dealer turned card`}
                        style={{top: `${-20 + 60}px`, left: `${20}px`}}
                    />
                }
                {hand.map((card, index) => (
                    <img
                        key={index}
                        className={`card ${newCard && card.code === newCard.code ? 'enter' : ''}`}
                        src={card.image}
                        alt={`Dealer card ${index + 1}`}
                        style={{top: `${index * -20 + 60}px`, left: `${index * 20}px` }}
                    />
                ))}
                {game.getIsPlaying()}
            </div>
        </div>
    );
};

export default DealerSlot;