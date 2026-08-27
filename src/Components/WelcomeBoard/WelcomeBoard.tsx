import {useState} from "react";
import "./WelcomeBoard.css";
import WelcomeBoardPlayerContainer from "./WelcomeBoardPlayerContainer";
import WelcomeBoardAbout from "./WelcomeBoardAbout";
import {PlayerJson} from "../../Game/Types";
import START_GAME_SOUND from "../../Media/Sounds/OK_LETS_GO.mp3";

function WelcomeBoard({onStartGame}: {onStartGame: any}) {

    const [numOfPlayers] = useState(1);

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

        if (players.length < 0) {
            alert("Game must include at least one player!")
            return false;
        }

        if (players.every((player: PlayerJson) => 
            !checkPlayerName(player.name) || !checkPlayerBalance(player.chipBalance))) {
            alert("Every player must have a name and positive balance")
            return false;
        }

        return true;
    }

    const checkPlayerName = (name: String) => {
        return name.trim() !== '';
    }
    
    const checkPlayerBalance = (balance: Number) => {
        return balance !== null && balance > 0;
    }

    return (
        <div className={"welcomeForm"}>
            <h1>Welcome to Webjack!</h1>
            <WelcomeBoardPlayerContainer/>
            <WelcomeBoardAbout/>
            <button
                id={"start-button"}
                onClick={handleStartGame}>Start Game
            </button>
        </div>
    )
}

export default WelcomeBoard;
