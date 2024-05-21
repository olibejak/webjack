import {Card, PlayerJson} from "./Types";

export class AbstractPlayer {

    protected hand: Card[];
    protected game: Game;

    protected constructor() {
        this.hand = [];
        this.game = Game.getInstance()
    }

    countHand() {

    }

    async drawCard() {
        try {
            const response: Response = await
                fetch(`https://www.deckofcardsapi.com/api/deck/${this.game.getDeckId()}/draw/?count=1`);
            const data = await response.json();
            console.log(data)
            if (data.success) {
                this.hand = [...this.hand, data.cards[0]];
                console.info(this.hand);
            }
        } catch (error) {
            console.error("Failed to draw a card", error);
        }
    }

    public resetHand() {
        return this.hand = [];
    }

    public getHand() {
        return this.hand;
    }

    public getCard(index: number) {
        return this.hand[index];
    }
}

export class Player extends AbstractPlayer {

    private id: string;
    private name: string;
    private chipBalance: number;
    private isPlaying: boolean;
    private isStanding: boolean;

    public constructor(public player: PlayerJson) {
        super();
        this.id = player.id;
        this.name = player.name;
        this.chipBalance = player.chipBalance;
        this.isPlaying = false;
        this.isStanding = false;
    }

    public getName() {
        return this.name;
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

    private constructor() {
        this.fetchDeck().then(deckId => this.deckId = deckId);
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
        // console.log("deck")
        // return this.deckId;
    }

    public getDeckId() {
        return this.deckId;
    }
}