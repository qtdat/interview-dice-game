import clsx from 'clsx';

import EmptyValue from '@/components/widgets/EmptyValue';
import { PlayerUnit } from '../dice-classes/PlayerClass';

type RoundResultProps = {
  releasedPlayers?: PlayerUnit[];
  winners?: PlayerUnit[];
};

const PlayerRender = (props: { data: PlayerUnit, isWinner?: boolean }) => {
  const { data, isWinner } = props;

  return <p><span className={clsx(isWinner && 'text-red-900')}>{data.name}</span> ({data.point})</p>
};

export default function RoundResult(props: RoundResultProps) {
  const { releasedPlayers = [], winners = [] } = props;

  return (
    <div>
      <div>
        <h3>The winner(s):</h3>

        {winners.map((o) => <PlayerRender key={o.name} data={o} isWinner={true}/>)}
        {winners.length === 0 && <EmptyValue isP={true} />}
      </div>

      <div>
        <h3>Released Players:</h3>

        {releasedPlayers.map((o) => <PlayerRender key={o.key} data={o}/>)}
        {releasedPlayers.length === 0 && <EmptyValue isP={true} />}
      </div>
    </div>
  );
}
