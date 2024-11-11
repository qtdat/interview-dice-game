import { PlayerClass, PlayerUnit } from './PlayerClass';
import { DiceClass } from './DiceClass';

export type HistoryUnit = {
  playerName: string,
  point: number,
  dicesValue: number[],
};

export type HistoryRow = HistoryUnit[];

export class RoundClass {
  public objDice: DiceClass;
  public objPlayer: PlayerClass;
  public MAX_AUTO_ROLL_STEP = 1000;

  constructor(
    protected players: number,
    protected dices: number,
  ) {
    this.objPlayer = new PlayerClass(this.players);
    this.objDice = new DiceClass(this.players * this.dices);
  }

  /**
   * init dice values
   */
  public startGame(): void {
    if (this.players < 2 || this.dices < 1) {
      return;
    }

    this.objPlayer.initPlayersData(this.objDice.diceKeys());
  }

  /**
   * change all rolls with random
   */
  public raiseRoll(): HistoryRow {
    this.objDice.raiseRoll();

    return this.getState();
  }

  /**
   * Scan players to do below steps
   *  - plus point
   *  - remove or award dice
   *  - release players
   */
  public evaluate(): HistoryRow {
    // to keep awarded dices log
    const reservedDiceIds: string[] = [];

    let firstPlayerId: undefined | string = undefined;
    let lastPlayerId: undefined | string = undefined;

    // scan available players list
    this.objPlayer.availablePlayers().forEach((player, playerIdx) => {
      // scan dices
      player.keepingDices.forEach((diceId) => {
        const [diceValue] = this.objDice.parseDiceValue(diceId);

        // the player continue to keep dice
        if (diceValue > 1 && diceValue < 6) {
          return;
        }

        if (diceValue === 6) {
          this.objPlayer.increasePoint(player.key);
          this.objPlayer.removeDice(player.key, diceId);
        } else if (reservedDiceIds.indexOf(diceId) === -1) { // dice = 1
          this.objPlayer.awardDice(player.key, diceId);

          // track logs
          reservedDiceIds.push(diceId);
        }
      });
      // .scan dices

      // check and release previous player
      if (playerIdx > 0 && this.objPlayer.canRelease(player.prevPlayerId as string)) {
        this.objPlayer.releaseThePlayer(player.prevPlayerId as string);
      }

      if (playerIdx === 0) {
        firstPlayerId = player.key;
        lastPlayerId = player.prevPlayerId;
      }
    });

    // re-check first player that can release?
    if (firstPlayerId && this.objPlayer.canRelease(firstPlayerId)) {
      this.objPlayer.releaseThePlayer(firstPlayerId);
    }

    // re-check last player that can release?
    if (lastPlayerId && this.objPlayer.canRelease(lastPlayerId)) {
      this.objPlayer.releaseThePlayer(lastPlayerId);
    }

    return this.getState();
  }

  /**
   * return current players and dice values
   */
  public getState(): HistoryRow {
    return this.objPlayer.availablePlayers()
      .map(({ name, point, keepingDices }) => {
        return {
          playerName: name,
          point,
          dicesValue: this.objDice.parseDiceValue(...keepingDices),
        };
      })
  }

  public isFinished(): boolean {
    return this.objPlayer.hadWinner();
  }

  /**
   *
   */
  public runUtilHavingWinners(): PlayerUnit[] {
    let roundCounter = 0;

    while (!this.objPlayer.hadWinner() && roundCounter < this.MAX_AUTO_ROLL_STEP) {
      this.raiseRoll();
      this.evaluate();
      roundCounter++;
    }

    return this.objPlayer.hadWinner() ? this.objPlayer.getWinners() : [];
  }
}
