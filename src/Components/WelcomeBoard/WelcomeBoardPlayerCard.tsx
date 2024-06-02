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

    // Save name to local storage - remove special chars and handle max length
    const handleNameChange = (newName: React.ChangeEvent<HTMLInputElement>) => {
        let newNameVal = newName.target.value.replace(/[^\w\s]/gi, "");
        if (newNameVal.length > 20) return;
        const updatedPlayer =
            { ...player, name: newNameVal};
        updatePlayer(updatedPlayer);
    };

    // Save chip balance to local storage - handle max number value
    const handleChipBalanceChange = (newBalance: React.ChangeEvent<HTMLInputElement>) => {
        let newBalanceVal = parseInt(newBalance.target.value);
        if (newBalanceVal > 9999999999) return;
        const updatedPlayer = { ...player, chipBalance: newBalanceVal };
        updatePlayer(updatedPlayer);
    };

    return (
        <li className="player-card">
            <button onClick={() => removePlayer(player)}>
                <IoPersonRemoveSharp />
            </button>
            <label className="label1" htmlFor={`player-${index}-name`}>Name:</label>
            <input id={`player-${index}-name`}
                   className="input1"
                   type="text"
                   placeholder={"Insert your name"}
                   value={player.name}
                   onChange={handleNameChange}
            />
            <label className="label2" htmlFor={`player-${index}-chip-balance`}>Chip balance:</label>
            <input id={`player-${index}-chip-balance`}
                   className="input2"
                   type="number"
                   maxLength={10}
                   max={9999999999}
                   placeholder={"Insert your chip balance"}
                   value={player.chipBalance.toString()}
                   onChange={handleChipBalanceChange}
            />
        </li>
    );
}

export default WelcomeBoardPlayerCard;