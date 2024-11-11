import { useReducer } from 'react';

import DiceForm from './dice-components/DiceForm';
import HistoryRender from './dice-components/HistoryRender';
import RoundResult from './dice-components/RoundResult';
import { reducer, DiceActionKind } from './dice-components/dice-reducer';

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, { start: false });

  return (
    <div className='container mx-auto'>
      <div className='mt-16'>
        <DiceForm
          start={state.start}
          finished={!!state.finished}
          onCallback={(action, params) => {
            switch (action) {
              case 'start':
                dispatch({ type: DiceActionKind.INITIALIZE, payload: { inputs: params }});
                break;
              case 'restart':
                dispatch({ type: DiceActionKind.RESTART });
                break;
              case 'roll':
                dispatch({ type: DiceActionKind.RAISE_ROLL});
                break;
              case 'auto':
                dispatch({ type: DiceActionKind.AUTO_ROLL });
                break;
            }
          }}
        />
      </div>

      <div className='grid grid-cols-3'>
        <div>
          <RoundResult winners={state.winners} releasedPlayers={state.releasedPlayers} />
        </div>

        <div className='col-span-2 pt-16'>
          <HistoryRender histories={state.histories} />
        </div>
      </div>
    </div>
  );
}
