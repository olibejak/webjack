import {Simulate} from "react-dom/test-utils";
import resize = Simulate.resize;
import {useState} from "react";
type Player = {
    id: string;
    name: string;
    chipBalance: number;
};
function Board() {
    // @ts-ignore
    const players = JSON.parse(localStorage.getItem('playersData'));
    return (
        <div className="container">
            <div className="dealer-slot">
                <p>Dealer</p>
            </div>
            <div className="deck-slot">
                <img className={"card"} src="https://www.deckofcardsapi.com/static/img/back.png" alt="Card Back"/>
            </div>
            <div className="player-slots">
                {players.map((player: Player, index: number) => (
                    <div className="player-slot" key={player.id}>
                        <p>{player.name}</p>
                    </div>))}
            </div>
        </div>
    );

    function playerSlots() {
        return (
            <div className="c">
                <img src="https://www.deckofcardsapi.com/static/img/back.png" alt="Card Back"/>
            </div>
        );
    }
}

export default Board;