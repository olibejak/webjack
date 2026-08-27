import {useState} from "react";
import "./WelcomeBoard.css";
import WelcomeBoardPlayerContainer from "./WelcomeBoardPlayerContainer";
import WelcomeBoardAbout from "./WelcomeBoardAbout";
import {PlayerJson} from "../../Game/Types";
import START_GAME_SOUND from "../../Media/Sounds/OK_LETS_GO.mp3";

function WelcomeBoard({onStartGame}: {onStartGame: any}) {

    const [numOfPlayers] = useState(1);
    const [activeTab, setActiveTab] = useState<'players' | 'about'>('players');

    const handleStartGame = () => {
        if (!checkPlayers()) {
            return;
        }
        
        const audio = new Audio(START_GAME_SOUND);
        audio.play();

        onStartGame(numOfPlayers);
    }

    const checkPlayers = () => {
        const playerData = localStorage.getItem("playersData")
        const players = (playerData ? JSON.parse(playerData) : []);

        if (players.some((player: PlayerJson) => 
            !checkPlayerName(player.name) || !checkPlayerBalance(player.chipBalance))) {
            alert("Every player must have a name and positive balance")
            return false;
        }

        return true;
    }

    const checkPlayerName = (name: string) => {
        return name.trim() !== '';
    }
    
    const checkPlayerBalance = (balance: Number) => {
        return balance !== null && balance > 0;
    }

    return (
        <div className={"welcomeForm"}>
            <h1>Welcome to Webjack!</h1>
            <div className={"tab-buttons"}>
                <button
                    id={"players-button"} 
                    onClick={() => setActiveTab("players")}
                    className={activeTab === 'players' ? 'active' : ''}
                >
                    Players
                </button>
                <button
                    id={"about-button"} 
                    onClick={() => setActiveTab("about")}
                    className={activeTab === 'about' ? 'active' : ''}
                >
                    About
                </button>
            </div>
            <div className="tab-content">
                {activeTab === 'players' ? (
                    <>
                    <WelcomeBoardPlayerContainer />
                    <button
                        id={"start-button"}
                        onClick={handleStartGame}>Start Game
                        </button>
                    </>
                ) : (
                    <WelcomeBoardAbout />
                )}
            </div>
            </div>
    )
}

export default WelcomeBoard;
