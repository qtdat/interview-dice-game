import { HistoryRow, RoundClass } from '../dice-classes/RoundClass';
import { PlayerUnit } from '../dice-classes/PlayerClass';

export enum DiceActionKind {
  INITIALIZE = 'initialize',
  RESTART = 'restart',
  RAISE_ROLL = 'raise-roll',
  AUTO_ROLL = 'auto-roll',
}

export type HistoryPayload = { action: string, result: HistoryRow };

type FormInput = {
  players: number;
  dices: number;
};

export type DiceState = {
  start: boolean;
  finished?: boolean;
  histories?: HistoryPayload[];
  releasedPlayers?: PlayerUnit[];
  winners?: PlayerUnit[];
}

export type DiceAction = {
  type: DiceActionKind;
  payload?: Record<string, unknown>;
}

let objRound = new RoundClass(0, 0);

export function reducer(state: DiceState, action: DiceAction) {
  const { type, payload } = action;

  switch (type) {
    case DiceActionKind.INITIALIZE: {
      if (!payload || (typeof payload.inputs !== 'object' && payload.inputs === null)) {
        return state;
      }

      const inputs = payload.inputs as FormInput;

      if (inputs.players < 2 || inputs.dices < 1) {
        return state;
      }

      objRound = new RoundClass(inputs.players, inputs.dices);
      objRound.startGame();

      return {
        start: true,
        histories: [{ action: 'Started Game', result: objRound.getState()}],
      };
    }
    case DiceActionKind.RESTART:
      return {
        start: false,
        finished: false,
        histories: [],
      };
    case DiceActionKind.RAISE_ROLL: {
      const histories = [
        {
          action: 'raise roll',
          result: objRound.raiseRoll(),
        },
        {
          action: 'evaluate',
          result: objRound.evaluate(),
        },
      ];
      const finished = objRound.isFinished();

      return {
        ...state,
        finished,
        histories: [...state.histories ?? [], ...histories],
        releasedPlayers: objRound.objPlayer.releasedPlayers(),
        winners: finished ? objRound.objPlayer.getWinners() : [],
      };
    }
    case DiceActionKind.AUTO_ROLL: {
      let roundCounter = 0;
      const histories = [];

      while (!objRound.isFinished() && roundCounter < objRound.MAX_AUTO_ROLL_STEP) {
        histories.push({ action: 'raise roll', result: objRound.raiseRoll() });
        histories.push({ action: 'evaluate', result: objRound.evaluate() });
        roundCounter++;
      }

      const finished = objRound.isFinished();

      return {
        ...state,
        finished,
        histories: [...state.histories ?? [], ...histories],
        releasedPlayers: objRound.objPlayer.releasedPlayers(),
        winners: finished ? objRound.objPlayer.getWinners() : [],
      }
    }
    default:
        return state;
  }
}
