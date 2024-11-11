import JsonViewer from '@/components/widgets/JsonViewer';
import { HistoryPayload } from './dice-reducer';

type HistoryRenderProps = {
  histories?: HistoryPayload[];
}

const normalizeHistoriesData = (histories: HistoryPayload[]) => {
  return histories.map(({ action, result }) => ({
    action,
    result: result.map((o) => {
      return `${o.playerName} (${o.point}): ${o.dicesValue.join(', ')}`;
    }),
  }));
};

export default function HistoryRender(props: HistoryRenderProps) {
  return <JsonViewer data={normalizeHistoriesData(props?.histories || [])} />
}
