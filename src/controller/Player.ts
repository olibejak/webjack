import {PlayerJson} from "./Types";
import {AbstractPlayer} from "./AbstractPlayer";

export class Player extends AbstractPlayer {

    private readonly id: string;
    private readonly name: string;
    private chipBalance: number;
    private isStanding: boolean;
    private bet: number;
    private lastGameHandValue: string;
    private blackJack: boolean;
    private betOutcome: string;

    public constructor(public player: PlayerJson) {
        super();
        this.id = player.id;
        this.name = player.name;
        this.chipBalance = player.chipBalance;
        this.isStanding = false;
        this.bet = Math.floor(player.chipBalance / 3) || 1;
        this.lastGameHandValue = '';    // Showed after the end under player rectangle
        this.blackJack = false;
        this.betOutcome = "+ 0";
    }

    public async drawCard(): Promise<void> {
        await super.drawCard();
        if (this.handValue >= 21)
            this.setIsStanding(true);
    }

    public reset() {
        this.lastGameHandValue = this.handValueToString;
        super.reset();
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
        if (win) {
            this.chipBalance += this.bet
            this.betOutcome = `+ ${this.bet}`;
        } else {
            this.chipBalance -= this.bet
            this.betOutcome = `- ${this.bet}`;
        }
    }

    public getChipBalance() {
        return this.chipBalance;
    }

    public getIsStanding(){
        return this.isStanding;
    }

    public getLastGameHandValue() {
        return this.lastGameHandValue;
    }

    public setIsStanding(isStanding: boolean) {
        this.isStanding = isStanding;
        this.parseHandValueToString();
    }

    public getId(){
        return this.id;
    }

    public setBlackJack(blackJack: boolean) {
        this.blackJack = blackJack;
    }

    public getBlackJack() {
        return this.blackJack;
    }

    public getBetOutcome() {
        return this.betOutcome;
    }

    public resetBetIncome() {
        this.betOutcome = '+ 0';
    }
}