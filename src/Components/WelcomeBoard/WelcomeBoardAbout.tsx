function WelcomeBoardAbout() {

    return (
        <div className={"info"}>
                <article>
                    <p>This site is a university project for subject KAJ at CTU FEE made by Jakub Oliberius.</p>
                    <h3>Game information:</h3>
                    <ul>
                        <li>The blue highlighted player has turn</li>
                        <li>The red highlighted player is standing</li>
                        <li>Cards from deck can be dragged and dropped to the active player area for triggering hit</li>
                        <li>Player can change bet pre game</li>
                        <li>Player data are stored in local storage</li>
                        <li>Players with no chips will be removed (to add them back just navigate back here)</li>
                    </ul>
                    <h3>Links:</h3>
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
                </article>
            </div>
    )
}

export default WelcomeBoardAbout;
