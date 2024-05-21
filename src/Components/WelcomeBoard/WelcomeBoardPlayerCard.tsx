import React from 'react';
import { IoPersonRemoveSharp  } from 'react-icons/io5';
import {PlayerJson} from "../../Game/Types"

interface WelcomeBoardPlayerCardProps {
    index: number;
    player: PlayerJson;
    removePlayer: (player: PlayerJson) => void;
    updatePlayer: (updatedPlayer: PlayerJson) => void;
}

const WelcomeBoardPlayerCard: React.FC<WelcomeBoardPlayerCardProps>
    = ({index, player, removePlayer, updatePlayer,}) => {
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedPlayer = { ...player, name: e.target.value };
        updatePlayer(updatedPlayer);
    };

    const handleChipBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedPlayer = { ...player, chipBalance: parseInt(e.target.value) };
        updatePlayer(updatedPlayer);
    };

    return (
        <li className="player-card">
            <button onClick={() => removePlayer(player)}>
                <IoPersonRemoveSharp />
            </button>
            <label className="label1" key={`player-${index}-name`}>Name:</label>
            <input id={`player-${index}-name`}
                   className="input1"
                   type="text"
                   value={player.name}
                   onChange={handleNameChange}
            />
            <label className="label2" key={`player-${index}-chip-balance`}>Chip balance:</label>
            <input id={`player-${index}-chip-balance`}
                   className="input2"
                   type="number"
                   value={player.chipBalance.toString()}
                   onChange={handleChipBalanceChange}
            />
        </li>
    );
}

export default WelcomeBoardPlayerCard;