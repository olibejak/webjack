import React, { useEffect, useState } from 'react';
import WelcomeBoardPlayerCard from './WelcomeBoardPlayerCard';
import { IoPersonAddSharp } from "react-icons/io5";
import {PlayerJson} from "../../Game/Types"
import { v4 as uuidv4 } from 'uuid';

function WelcomeBoardPlayerContainer() {
    const newPlayerDefault: PlayerJson = { id: uuidv4(), name: '', chipBalance: 100 };
    const playersDataString = localStorage.getItem('playersData');
    const [players, setPlayers] = useState<PlayerJson[]>(playersDataString ? JSON.parse(playersDataString) : []);

    const addPlayer = () => {
        setPlayers(prevPlayers => [...prevPlayers, newPlayerDefault]);
    };

    const removePlayer = (playerToRemove: PlayerJson) => {
        const updatedPlayers = players.filter(player => player !== playerToRemove);
        if (updatedPlayers.length === 0) {
            updatedPlayers.push(newPlayerDefault);
        }
        setPlayers(updatedPlayers);
    };

    const updatePlayer = (updatedPlayer: PlayerJson) => {
        const updatedPlayers = players.map(player =>
            player.id === updatedPlayer.id ? updatedPlayer : player
        );
        setPlayers(updatedPlayers);
    };

    useEffect(() => {
        // Save the updated players JSON to localStorage
        localStorage.setItem('playersData', JSON.stringify(players));
    }, [players]);

    return (
        <div className={"player-container"}>
            <h2>Players:</h2>
            <ul id="👤">
                {players.map((player, index) => (
                    <WelcomeBoardPlayerCard
                        key={index}
                        index={index}
                        player={player}
                        removePlayer={removePlayer}
                        updatePlayer={updatePlayer}
                    />
                ))}
                {players.length < 6 && (
                    <li className="player-card">
                        <button onClick={addPlayer}>
                            <IoPersonAddSharp />
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default WelcomeBoardPlayerContainer;