import React, { useEffect, useState } from 'react';
import WelcomeBoardPlayerCard from './WelcomeBoardPlayerCard';
import { IoPersonAddSharp } from "react-icons/io5";
import {PlayerJson} from "../../Game/Types"
import { v4 as uuidv4 } from 'uuid';

function WelcomeBoardPlayerContainer() {
    const playersDataString = localStorage.getItem('playersData');
    const [players, setPlayers] = useState<PlayerJson[]>(
        playersDataString ? JSON.parse(playersDataString) : [{ id: uuidv4(), name: "Player 1", chipBalance: 100 }]);

    const addPlayer = () => {
        setPlayers(prevPlayers => {
        const playerName = `Player ${prevPlayers.length + 1}`;
        const newPlayer = { id: uuidv4(), name: playerName, chipBalance: 100 }; 
        
        return [...prevPlayers, newPlayer];
    });
    };

    const removePlayer = (playerIdToRemove: string) => {
        const updatedPlayers = players.filter(player => player.id !== playerIdToRemove);
    
        setPlayers(updatedPlayers);
    
        if (updatedPlayers.length === 0) {
        addPlayer();
        }
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
