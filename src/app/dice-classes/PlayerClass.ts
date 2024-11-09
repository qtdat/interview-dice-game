export type PlayerUnit = {
  key?: string,
  name: string,
  point: number,
  keepingDices: string[],
  prevPlayerId: null | string,
  nextPlayerId: null | string,
}

export type LayerList = Map<string, PlayerUnit>;

export class PlayerClass {
  protected players: LayerList = new Map();

  constructor(protected length: number) {
  }

  public initPlayersData(diceKeys: string[]): LayerList {
    // do not process if having one player
    if (this.length < 2) {
      return this.players;
    }

    // dices that assigned to every players at the beginning of game
    const diceNum = diceKeys.length / this.length;

    do {
      this.players.set(`p#${this.players.size + 1}`, {
        ...this.layerTemplate(),
        prevPlayerId: this.players.size !== 0 ? `p#${this.players.size}` : `p#${this.length}`,
        nextPlayerId: this.players.size + 1 !== this.length ? `p#${this.players.size + 2}` : 'p#1',
        keepingDices: diceKeys.slice(this.players.size * diceNum, this.players.size * diceNum + diceNum),
      });
    } while (this.players.size < this.length);

    return this.players;
  }

  protected layerTemplate(): PlayerUnit {
    return {
      name: `Player #${this.players.size + 1}`,
      point: 0,
      keepingDices: [],
      prevPlayerId: null,
      nextPlayerId: null,
    }
  }

  public getLayers(): LayerList {
    return this.players;
  }

  public releaseThePlayer(playerId: string): void {
    const thePlayer = this.players.get(playerId);

    if (!thePlayer || thePlayer.prevPlayerId === null || thePlayer.nextPlayerId === null) {
      return;
    }

    // change the previous player data
    const prevLayer = this.players.get(thePlayer.prevPlayerId);

    if (prevLayer) {
      prevLayer.nextPlayerId = thePlayer.nextPlayerId;
    }

    // change the next player data
    const nextPlayer = this.players.get(thePlayer.nextPlayerId);

    if (nextPlayer) {
      nextPlayer.prevPlayerId = thePlayer.prevPlayerId;
    }

    // change the current player
    thePlayer.prevPlayerId = null;
    thePlayer.nextPlayerId = null;
    thePlayer.keepingDices = [];
  }

  public availablePlayers(): Required<PlayerUnit>[] {
    return Array.from(this.players.entries())
      .filter(([, o]) => o.nextPlayerId !== null)
      .map(([key, o]) => ({ ...o, key }))
    ;
  }

  public increasePoint(playerId: string): void {
    const thePlayer = this.players.get(playerId) as PlayerUnit;
    thePlayer.point++;
  }

  public removeDice(playerId: string, diceId: string): void {
    const thePlayer = this.players.get(playerId) as PlayerUnit;
    thePlayer.keepingDices = thePlayer.keepingDices.filter((v) => v !== diceId);
  }

  public awardDice(fromPlayerId: string, diceId: string): void {
    const thePlayer = this.players.get(fromPlayerId) as PlayerUnit;

    if (!thePlayer.nextPlayerId) {
      return;
    }

    // remove dice from fromPlayerId
    this.removeDice(fromPlayerId, diceId);

    // move dice into next player
    const nextPlayer = this.players.get(thePlayer.nextPlayerId) as PlayerUnit;
    nextPlayer.keepingDices.push(diceId);
  }

  public canRelease(playerId: string): boolean {
    const thePlayer = this.players.get(playerId) as PlayerUnit;

    return thePlayer.keepingDices.length === 0;
  }

  public hadWinner(): boolean {
    return this.availablePlayers().length < 2;
  }

  public getWinners(): PlayerUnit | PlayerUnit[] {
    const maxPoint = Math.max(
      ...Array.from(this.players.values()).map((o) => o.point)
    );

    return Array.from(this.players.values())
      .filter(({ point }) => point === maxPoint)
    ;
  }
}
