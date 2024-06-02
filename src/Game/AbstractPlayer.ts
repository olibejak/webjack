import {Card} from "./Types";
import {Game} from "./Game";

export abstract class AbstractPlayer {

    protected hand: Card[];
    public handValue: number;
    protected handValueToString: string;
    private onChange: ((player: this) => void) | undefined | null;

    protected constructor() {
        this.hand = [];
        this.handValue = 0;
        this.handValueToString = ""
    }

    protected countHand() {
        let handValue = 0;
        let acesInHand = 0;
        let twoOptions = false;

        // Sum aces and calc their value at the end
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

        this.handValue = handValue;
        this.handValueToString = `${twoOptions && handValue !== 21 ? `${handValue - 10} / ` : ''}${handValue}`;
    }

    // Parser for removing second option when not needed anymore
    public parseHandValueToString() {
        if (this.handValueToString.includes("/")) {
            const parts = this.handValueToString.split("/").map(part => part.trim())
            this.handValueToString = parts[1] || this.handValueToString;
        }
    }

    // Fetches card from TheDeckAPI
    public async drawCard() {
        try {
            const response: Response = await
                fetch(`https://www.deckofcardsapi.com/api/deck/${Game.getDeckId()}/draw/?count=1`);
            const data = await response.json();
            if (data.success) {
                console.info("Successfully drawn card", data.cards[0]);
                this.hand = [...this.hand, data.cards[0]];
                this.notifyChange();
            }
        } catch (error) {
            console.error("Failed to draw a card", error);
        }
        this.countHand();
    }

    // Change notifier for change listener
    private notifyChange() {
        this.onChange?.(this);
    }

    // Change listener - couldn't make state update work
    public setOnChangeListener(listener: ((player: this) => void) | null) {
        this.onChange = listener;
    }

    public reset() {
        this.hand = [];
        this.handValue = 0;
        this.handValueToString = '';
        this.notifyChange();
    }

    public getHand() {
        return this.hand;
    }

    public getHandValueToString() {
        return this.handValueToString;
    }

    public getHandValue() {
        return this.handValue;
    }
}