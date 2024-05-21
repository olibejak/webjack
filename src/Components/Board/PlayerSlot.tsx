import React, {useEffect, useState} from 'react';
import {Card, PlayerJson} from '../../Game/Types';
import './Board.css';
import {Player} from "../../Game/Game";

interface PlayerSlotProps {
    player: Player;
    isActive: boolean;
    // onClick: () => void;
}

const PlayerSlot: React.FC<PlayerSlotProps> = ({ player, isActive}) => {
    const [hand, setHand] = useState<Card[]>(player.getHand());
    const [newCard, setNewCard] = useState<Card | null>(null);
    // const [isPlaying, setIsPlaying] = useState(false);
    const [isStanding, setIsStanding] = useState(false);

    useEffect(() => {
        setHand(player.getHand());
        setNewCard(player.getHand().slice(-1)[0])
    }, [player.getHand()]);

    useEffect(() => {
        setIsStanding(player.getIsStanding());
    }, [player.getIsStanding]);

    // useEffect(() => {
    //     setIsPlaying(player.getIsPlaying());
    // }, [player.getIsPlaying]);

    useEffect(() => {
        if (newCard) {
            setTimeout(() => setNewCard(null), 300); // Clear new card after animation
        }
    }, [newCard]);

    return (
        <div className="player-slot">
            <div className={`card-container ${isActive ? 'playing' : ''}`}>
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
                <li>{player.getName()}</li>
                <li>
                    {player.getChipBalance()} {player.getChipBalance() === 1 ? ' chip' : ' chips'}
                </li>
            </ul>
        </div>
    );
};

export default PlayerSlot;