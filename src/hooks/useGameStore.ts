import { GameContext } from ../context/GameContext.tsx;

export const useGameStore = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGameStore must be inside GameProvider");
    }
    return context;
};
