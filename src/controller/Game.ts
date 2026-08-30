import {PlayerJson} from "./Types";
import {Player} from "./Player";
import {Dealer} from "./Dealer";

export class Game {
    private static instance: Game;
    private static deckId: string | undefined;
    private dealer: Dealer;
    private players: Player[];
    private isPlaying: boolean;
    public update = 0;

    private constructor(dealer: Dealer) {
        this.dealer = dealer;
        this.players = [];
        this.isPlaying = false;
    }

    // Singleton
    public static getInstance(): Game {
        if (!Game.instance) {
            // Pass the Dealer instance as a parameter to the constructor
            const dealerInstance = Dealer.getInstance();
            Game.instance = new Game(dealerInstance);
            // initialize deck as static, for drawing cards by players
            this.initializeDeck()
                .then(deckId => this.deckId = deckId);
        }
        return Game.instance;
    }

    // fetch new deck from The Deck API
    private static async initializeDeck(): Promise<string | undefined> {
        try {
            const response = await fetch('https://www.deckofcardsapi.com/api/deck/new/');
            const data = await response.json();
            if (data.success) {
                console.info(data.deck_id);
                return data.deck_id;
            }
        } catch (exception) {
            console.error('Failed to fetch a new deck', exception);
        }
    }

    // Draw two cards for each player and one for dealer
    public async startGame(stopLoading: () => void):Promise<void> {
        if (!Game.getDeckId()) return;
        this.isPlaying = true;
        this.dealer.reset();
        console.info("Starting Game");
        try {
            await fetch(`https://www.deckofcardsapi.com/api/deck/${Game.getDeckId()}/shuffle/`);
            await this.dealer.drawCard();
            stopLoading();
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < this.players.length; j++) {
                    let tmpPlayer = this.players[j];
                    tmpPlayer.setBlackJack(false);
                    await tmpPlayer.drawCard();
                    if (tmpPlayer.getHandValue() === 21) {
                        tmpPlayer.setBlackJack(true);
                        tmpPlayer.setIsStanding(true)
                    }
                    // Drawing delay
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
            }
        } catch (exception) {
            console.error("Failed to start the game", exception);
        }
    }

    // Finish dealer drawing and evaluate game
    public async endGame():Promise<void> {
        console.info("Ending Game");
        try {
            await this.dealer.finishDrawing();
            // Delay calculations from dealer animations
            await new Promise(resolve => setTimeout(resolve, 3000));
            const dealerHandValue = this.dealer.getHandValue();
            for (let i = 0; i < this.players.length; i++) {
                const tmpPlayer = this.players[i]
                const tmpPlayerHandValue = tmpPlayer.getHandValue();
                tmpPlayer.resetBetIncome();
                if (tmpPlayer.getBlackJack() || (dealerHandValue > 21 && tmpPlayerHandValue <= 21) ||
                    (dealerHandValue < tmpPlayerHandValue && tmpPlayerHandValue <= 21))
                        tmpPlayer.handleBet(true);
                else if ((dealerHandValue <= 21 && dealerHandValue > tmpPlayerHandValue) || tmpPlayerHandValue > 21)
                    tmpPlayer.handleBet(false);
                if (tmpPlayer.getChipBalance() <= 0)
                    this.players = this.players.filter(player => player.getId() !== tmpPlayer.getId());
                else
                    tmpPlayer.reset()
                this.savePlayerState();
            }
        } catch (exception) {
            console.error("Failed to end the game", exception);
        }
        this.isPlaying = false;
    }

    // Save current state of players to local storage
    public savePlayerState(): void {
        const playersToSave: PlayerJson[] = [];
        for (let i = 0; i < this.players.length; i++) {
            const tmpPlayer = this.players[i];
            playersToSave.push({id: tmpPlayer.getId(), name: tmpPlayer.getName(), chipBalance: tmpPlayer.getChipBalance()});
        }
        localStorage.setItem("playersData", JSON.stringify(playersToSave));
    }

    // Get players from local storage
    public getPlayers(): Player[] {
        const playersData = localStorage.getItem('playersData');
        const playersJson: PlayerJson[] = playersData ? JSON.parse(playersData) : [];
        const playerInstances = playersJson.map((playerJson: PlayerJson) => new Player(playerJson));
        this.players = playerInstances;
        return playerInstances;
    }

    public static getDeckId(): string | undefined {
        return this.deckId;
    }

    public getIsPlaying(): boolean {
        return this.isPlaying;
    }
}