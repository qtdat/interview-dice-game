import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { onCallbackType } from '@/libs/core-types';

type DiceFormProps = {
  start: boolean,
  finished: boolean,
  onCallback: onCallbackType;
}

export default function DiceForm(props: DiceFormProps) {
  const [players, setPlayers] = useState(5);
  const [dices, setDices] = useState(3);
  const { start, finished, onCallback } = props;

  return (
    <div className='grid grid-cols-6 gap-8'>
      <div>
        <TextField
          id='player-number'
          value={players}
          onChange={(e) => setPlayers(parseInt(e.target.value))}
          label='Playes number'
          variant='outlined'
          color='secondary'
          type='number'
          className='w-full'
        />
      </div>
      <div>
        <TextField
          id='dice-number'
          value={dices}
          onChange={(e) => setDices(parseInt(e.target.value))}
          label='Dices number'
          variant='outlined'
          color='secondary'
          type='number'
          className='w-full'
        />
      </div>

      <div className='col-span-4'>
        <Button
          variant='contained'
          color='secondary'
          className='h-full'
          sx={{ px: 4 }}
          onClick={() => {
            const action = start ? 'restart' : 'start';

            if (action === 'restart') {
              setPlayers(0);
              setDices(0);
            }

            onCallback(action, { players, dices });
          }}
        >
          {start ? 'Restart' : 'Start'}
        </Button>
        <Button
          variant='contained'
          color='secondary'
          className='h-full ml-8'
          disabled={finished || !start}
          sx={{ px: 4 }}
          onClick={() => onCallback('roll')}
        >
          Roll
        </Button>
        <Button
          variant='contained'
          color='secondary'
          className='h-full ml-8'
          disabled={finished || !start}
          sx={{ px: 4 }}
          onClick={() => onCallback('auto')}
        >
          Auto Roll
        </Button>
      </div>
    </div>
  );
}
