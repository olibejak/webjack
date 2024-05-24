import { Dealer } from "../../Game/Game";
import React, { useEffect, useState } from "react";
import { Card } from "../../Game/Types"; // Adjust the import according to your file structure
import './Board.css';

interface DealerSlotProps {
    handValueToString: string;
    dealerHand: Card[];
}

const DealerSlot: React.FC<DealerSlotProps> = ({dealerHand, handValueToString}) => {
    const dealer = Dealer.getInstance();
    const [hand, setHand] = useState<Card[]>(dealerHand);
    const [newCard, setNewCard] = useState<Card | null>(null);

    useEffect(() => {
        setHand(dealerHand);
        setNewCard(dealerHand.slice(-1)[0])
    }, [dealerHand]);

    const drawCard = async () => {
        await dealer.drawCard();
        const latestCard = dealer.getHand().slice(-1)[0];
        setNewCard(latestCard); // Set the new card
        setHand([...dealer.getHand()]);

        // Remove the new card animation class after the animation completes
        setTimeout(() => {
            setNewCard(null);
        }, 500); // Match this duration with the CSS animation duration
    };

    return (
        <div className="player-slot">
            <ul className="player-info">
                <li>Dealer</li>
                <li>{handValueToString}</li>
            </ul>
            <div className="card-container">
                {hand.map((card, index) => (
                    <img
                        key={index}
                        className={`card ${newCard && card.code === newCard.code ? 'enter' : ''}`}
                        src={card.image}
                        alt={`Dealer card ${index + 1}`}
                        style={{ top: `${index * -20 + 60}px`, left: `${index * 20}px` }}
                    />
                ))}
            </div>
        </div>
    );
}

export default DealerSlot;