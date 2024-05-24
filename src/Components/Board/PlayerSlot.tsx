import React, {useEffect, useState} from 'react';
import {Card} from '../../Game/Types';
import './Board.css';

interface PlayerSlotProps {
    name: string;
    chipBalance: number;
    playerHand: Card[];
    isActive: boolean;
    isStanding: boolean
    handValueToString: string;
}

const PlayerSlot: React.FC<PlayerSlotProps> =
    ({name, chipBalance, playerHand, isActive, isStanding, handValueToString}) => {
    const [hand, setHand] = useState<Card[]>(playerHand);
    const [newCard, setNewCard] = useState<Card | null>(null);

    // Update newCard for animation
    useEffect(() => {
        setHand(playerHand);
        setNewCard(playerHand.slice(-1)[0])
    }, [playerHand]);


    useEffect(() => {
        if (newCard) {
            setTimeout(() => setNewCard(null), 300); // Clear new card after animation
        }
    }, [newCard]);

    return (
        <div className="player-slot">
            <div className={`card-container ${isActive && 'playing'} ${isStanding && 'standing'}`}>
                {hand.map((card, index) => (
                    <img
                        key={index}
                        className={`card ${newCard && card.code === newCard.code ? 'enter' : ''}`}
                        src={card.image}
                        alt={`Dealer card ${index + 1}`}
                        style={{top: `${index * -20 + 60}px`, left: `${index * 20}px`}}
                    />
                ))}
            </div>
            <ul className="player-info" id="playing">
                <li>{handValueToString}</li>
                <li>{name}</li>
                <li>
                    {chipBalance} {chipBalance === 1 ? ' chip' : ' chips'}
                </li>
            </ul>
        </div>
    );
};

export default PlayerSlot;