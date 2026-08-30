import React, { createContext, useContext, useState } from 'react';
import { GameContextType } from ./ContextTypes.ts;
import { usePlayers } from ../hooks/usePlayers.ts;
import { useGame } from ../hooks/useGame.ts;

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider = ({ children }) => {
    const [players, setPlayers] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);

export const GameProvider = ({ children }: { children: ReactNode }) => {

    const playersLogic = usePlayers();
    const gameLogic = useGame();
    
    const value = {
        ...playersLogic,
        ...gameLogic,
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};
