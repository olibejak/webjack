import { useState } from 'react';
import { PlayerJson } from '../Types';

export const usePlayers = () => {
    const [players, setPlayers] = useState<PlayerJson[]>([]);

    const addPlayer = (name: string, id: string) => {
        setPlayers((prevPlayers) => [
            ...prevPlayers, 
            { id, name, chipBalance: 1000 }
        ]);
    };

    const updateBalance = (id: string, amount: number) => {
        setPlayers((prev) => 
            prev.map(p => p.id === id ? { ...p, chipBalance: p.chipBalance + amount } : p)
        );
    };

    return {
        players,
        setPlayers,
        addPlayer,
        updateBalance
    };
};
