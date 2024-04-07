import {useState} from "react";
import "./WelcomeBoard.css";
import WelcomeBoardPlayerContainer from "./WelcomeBoardPlayerContainer";

function WelcomeBoard({onStartGame}: {onStartGame: any}) {

    const [numOfPlayers] = useState(1);

    const handleStartGame = () => {
        onStartGame(numOfPlayers);
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

// <input type={"number"}
//        value={numDecks}
//        onChange={handleChangeNumDecks}
//        onKeyDown={handleKeyDown}
//        min={1}
//        max={10}/>
// <button onClick={handleDecrementDecks}>-</button>
// <button onClick={handleIncrementDecks}>+</button>

export default WelcomeBoard;