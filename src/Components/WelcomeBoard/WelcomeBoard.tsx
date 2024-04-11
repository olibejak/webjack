import {useState} from "react";
import "./WelcomeBoard.css";
import WelcomeBoardPlayerContainer from "./WelcomeBoardPlayerContainer";
import {Player} from "../Types";

function WelcomeBoard({onStartGame}: {onStartGame: any}) {

    const [numOfPlayers] = useState(1);

    const handleStartGame = () => {
        const playerData = localStorage.getItem("playersData")
        const players = (playerData ? JSON.parse(playerData) : []);
        if (players.length > 0 && players.every((player: Player) => player.name.trim() !== '' && player.chipBalance !== null))
            onStartGame(numOfPlayers);
        else
            alert("Please fill all players' data");
    }

    return (
        <div className={"welcomeForm"}>
            <h1>Welcome to Webjack!</h1>
            <WelcomeBoardPlayerContainer/>
            <div>
                <h2>Info</h2>
            </div>
            <button
                id={"start-button"}
                onClick={handleStartGame}>Start Game</button>
        </div>
    )
}

export default WelcomeBoard;