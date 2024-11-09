import { PlayerClass, PlayerUnit } from './PlayerClass';
import { DiceClass } from './DiceClass';

type HistoryUnit = {
  playerName: string,
  point: number,
  dicesValue: number[],
};

type HistoryRow = HistoryUnit[];

export class RoundClass {
  public objDice: DiceClass;
  public objPlayer: PlayerClass;

  constructor(
    protected players: number,
    protected dices: number,
  ) {
    // init necessary properties
    this.objDice = new DiceClass(this.players * this.dices);
    this.objPlayer = new PlayerClass(this.players);
  }

  /**
   * init dice values
   */
  public startGame(): void {
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

    // scan available players list
    this.objPlayer.availablePlayers().forEach((player, playerIdx) => {
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

      // check and release previous player
      if (playerIdx > 0 && this.objPlayer.canRelease(player.prevPlayerId as string)) {
        this.objPlayer.releaseThePlayer(player.prevPlayerId as string);
      }

      if (playerIdx === 0) {
        firstPlayerId = player.key;
      }
    });

    // re-check first player that can release?
    if (firstPlayerId && this.objPlayer.canRelease(firstPlayerId)) {
      this.objPlayer.releaseThePlayer(firstPlayerId);
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

  /**
   *
   */
  public runUtilHavingWinners(): PlayerUnit | PlayerUnit[] {
    let roundCounter = 0;
    const maxRound = 100;

    while (!this.objPlayer.hadWinner()) {
      roundCounter++;
      this.raiseRoll();
      this.evaluate();

      if (roundCounter > maxRound) {
        break;
      }
    }

    return this.objPlayer.hadWinner() ? this.objPlayer.getWinners() : [];
  }
}
