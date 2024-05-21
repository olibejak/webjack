import {useState} from "react";
import "./WelcomeBoard.css";
import WelcomeBoardPlayerContainer from "./WelcomeBoardPlayerContainer";
import {PlayerJson} from "../../Game/Types";

function WelcomeBoard({onStartGame}: {onStartGame: any}) {

    const [numOfPlayers] = useState(1);

    const handleStartGame = () => {
        const playerData = localStorage.getItem("playersData")
        const players = (playerData ? JSON.parse(playerData) : []);
        if (players.length > 0 && players.every((player: PlayerJson) => player.name.trim() !== '' && player.chipBalance !== null))
            onStartGame(numOfPlayers);
        else
            alert("Please fill all players' data");
    }

    return (
        <div className={"welcomeForm"}>
            <h1>Welcome to Webjack!</h1>
            <WelcomeBoardPlayerContainer/>
            <div className={"info"}>
                <h2>About:</h2>
                <article>
                    <p>
                         About Blackjack: <a href={"https://en.wikipedia.org/wiki/Blackjack"}
                                             target="_blank"
                                             rel="noreferrer noopener">
                                                Wikipedia</a>
                    </p>
                    <p>
                        API used: <a href={"https://www.deckofcardsapi.com"}
                                     target="_blank"
                                     rel="noreferrer noopener">
                                        Deck of Cards</a>
                    </p>
                    <p>Music used:</p>
                    <ul>
                        <li>
                            <a href={"https://www.youtube.com/watch?v=46MiO8jWR3Q&ab_channel=RobDiesALot"}
                               target="_blank"
                               rel="noreferrer noopener">
                                  Rob Dies A Lot - GAMBA</a>
                        </li>
                        <li>
                            <a href={"https://g.co/kgs/hjNj5rG"}
                               target="_blank"
                               rel="noreferrer noopener">
                                  Portal - Radio Music</a>
                        </li>
                        <li>
                            <a href={"https://www.youtube.com/watch?v=V2LpXOKWjus&ab_channel=buricin"}
                               target="_blank"
                               rel="noreferrer noopener">
                                  Milan Buričin - Sólo pro prádelní hrnec</a>
                        </li>
                    </ul>
                </article>
            </div>
            <button
                id={"start-button"}
                onClick={handleStartGame}>Start Game</button>
        </div>
    )
}

export default WelcomeBoard;