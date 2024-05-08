
type Player = {
    id: string;
    name: string;
    chipBalance: number;
};
function Board() {
    const playersDataString = localStorage.getItem('playersData');
    const players = playersDataString ? JSON.parse(playersDataString) : [];
    return (
        <div className="container">
            <div className="dealer-slot">
                <p>Dealer</p>
            </div>
            <div className="deck-slot">
                <img className={"card"} src="https://www.deckofcardsapi.com/static/img/back.png" alt="Card Back"/>
            </div>
            <div className="player-slots">
                {players.map((player: Player) => (
                    <div className="player-slot" key={player.id}>
                        <p>{player.name}</p>
                    </div>))}
            </div>
        </div>
    );
}

export default Board;