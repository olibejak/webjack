import {Card, PlayerJson} from "./Types";

export class AbstractPlayer {

    protected hand: Card[];
    protected game: Game
    protected handValue: number;
    protected handValueToString: string;

    protected constructor() {
        this.hand = [];
        this.game = Game.getInstance()
        this.handValue = 0;
        this.handValueToString = ""
    }

    countHand() {
        let handValue = 0;
        let acesInHand = 0;
        let twoOptions = false;

        for (let card of this.hand) {
            if (card.value === "ACE")
                ++acesInHand;
            else if (["JACK", "QUEEN", "KING"].includes(card.value))
                handValue += 10;
            else
                handValue += parseInt(card.value);
        }

        for (let i = 0; i < acesInHand; ++i) {
            if (handValue + 11 <= 21) {
                handValue += 11;
                twoOptions = true;
            } else
                ++handValue;
        }
        console.log(handValue)
        this.handValue = handValue;
        this.handValueToString = `${twoOptions ? `${handValue - 10} / ` : ''}${handValue}`;
    }

    async drawCard() {
        try {
            const response: Response = await
                fetch(`https://www.deckofcardsapi.com/api/deck/${this.game.getDeckId()}/draw/?count=1`);
            const data = await response.json();
            console.log(data)
            if (data.success) {
                console.info(data.cards[0].value);
                this.hand = [...this.hand, data.cards[0]];
            }
        } catch (error) {
            console.error("Failed to draw a card", error);
        }
        this.countHand();
    }

    public resetHand() {
        this.hand = [];
        this.handValue = 0;
        this.handValueToString = '';
    }

    public getHand() {
        return this.hand;
    }

    public getCard(index: number) {
        return this.hand[index];
    }

    public getHandValueToString() {
        return this.handValueToString;
    }

    public getHandValue() {
        return this.handValue;
    }
}

export class Player extends AbstractPlayer {

    private id: string;
    private name: string;
    private chipBalance: number;
    private isPlaying: boolean;
    private isStanding: boolean;
    private bet: number;

    public constructor(public player: PlayerJson) {
        super();
        this.id = player.id;
        this.name = player.name;
        this.chipBalance = player.chipBalance;
        this.isPlaying = false;
        this.isStanding = false;
        this.bet = 0;
    }

    public resetHand() {
        super.resetHand();
        this.isPlaying = false;
        this.isStanding = false;
    }

    public getBet() {
        return this.bet;
    }

    public setBet(bet: number) {
        this.bet = bet;
    }

    public getName() {
        return this.name;
    }

    public handleBet(win: boolean) {
        win ? this.chipBalance += this.bet : this.chipBalance -= this.bet;
        this.bet = 0;
    }

    public getChipBalance() {
        return this.chipBalance;
    }

    public getIsStanding(){
        return this.isStanding;
    }

    public getIsPlaying() {
        return this.isPlaying;
    }

    public setIsStanding(isStanding: boolean) {
        this.isStanding = isStanding;
    }

    public setIsPlaying(isPlaying: boolean) {
        this.isPlaying = isPlaying;
    }
}

export class Dealer extends AbstractPlayer {
    private static instance: Dealer;

    private constructor() {
        super();
    }

    public async executeEnd() {
        while (this.handValue < 17)
            await this.drawCard();
    }

    // Singleton
    public static getInstance(): Dealer {
        if (!Dealer.instance) {
            Dealer.instance = new Dealer();
        }
        return Dealer.instance;
    }
}

export class Game {
    private static instance: Game;
    private deckId: string | undefined;
    private dealer: Dealer;
    private players: Player[];

    private constructor() {
        this.fetchDeck().then(deckId => this.deckId = deckId);
        this.dealer = Dealer.getInstance();
        this.players = [];
    }

    // Singleton
    public static getInstance(): Game {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

    private async fetchDeck() {
        try {
            const response: Response = await fetch('https://www.deckofcardsapi.com/api/deck/new/');
            const data = await response.json();
            if (data.success) {
                console.info(data.deck_id);
                return data.deck_id;
            }
        } catch (exception) {
            console.error("Failed to fetch a new deck", exception);
        }
    }

    public getPlayers() {
        const playersData = localStorage.getItem('playersData');
        const playersJson = playersData ? JSON.parse(playersData) : [];
        const playerInstances = playersJson.map((playerJson: PlayerJson) => new Player(playerJson));
        playerInstances[0].setIsPlaying(true);
        this.players = playerInstances;
        return playerInstances;
    }

    public getResults(players: Player[], dealer: Dealer) {
        for (let i = 0; i < players.length; ++i) {
            players[i].getHandValue() > dealer.getHandValue() ?
                players[i].handleBet(true) : players[i].handleBet(false);
        }
    }

    public getDeckId() {
        return this.deckId;
    }
}