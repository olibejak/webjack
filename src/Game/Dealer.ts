import {AbstractPlayer} from "./AbstractPlayer";

export class Dealer extends AbstractPlayer {
    private static instance: Dealer;

    private constructor() {
        super();
    }

    public async finishDrawing(): Promise<void> {
        while (this.getHandValue() < 17) {
            // Drawing delay
            await new Promise(resolve => setTimeout(resolve, 400));
            await this.drawCard();
            this.parseHandValueToString();
        }
    }

    // Singleton
    public static getInstance(): Dealer {
        if (!Dealer.instance) {
            Dealer.instance = new Dealer();
        }
        return Dealer.instance;
    }
}