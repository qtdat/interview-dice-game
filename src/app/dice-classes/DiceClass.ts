export type DiceUnit = {
  value: number;
}

export type DiceList = Map<string, DiceUnit>;

export class DiceClass {
  // all dices value that used in the game
  protected dices: DiceList = new Map();

  constructor(protected length: number) {
    // call initial methods
    this.initDicesData();
  }

  public initDicesData(): DiceList {
    this.dices.clear();

    if (this.length < 1) {
      return this.dices;
    }

    do {
      this.dices.set(`d#${this.dices.size + 1}`, { value: this.randomInt() });
    } while (this.dices.size < this.length);

    return this.dices;
  }

  protected randomInt(minNum: number = 1, maxNum: number = 6): number {
    return minNum + Math.floor(Math.random() * (maxNum - minNum + 1));
  }

  public getDices(): DiceList {
    return this.dices;
  }

  public raiseRoll(): DiceList {
    this.dices.forEach((dice: DiceUnit, key: string) => {
      if (dice.value === 6) {
        return;
      }

      this.dices.set(key, { value: this.randomInt() });
    });

    return this.dices;
  }

  public diceKeys(): string[] {
    return Array.from(this.dices.keys());
  }

  public parseDiceValue(...keys: string[]): number[] {
    return keys.map((key) => this.dices.get(key)?.value || 0);
  }
}
