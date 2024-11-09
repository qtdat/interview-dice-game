import { useEffect } from 'react';
import JsonView from '@/components/widgets/JsonViewer';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { initSource, destroySource, selectOptions, RowType, OptionType, pushData, updateData, removeData, setOptions } from '@/store/data-source';
import ButtonsComp from '@/components/buttons-comp';
import { products } from '@/stories/sample.json';
import { intRandByMax } from '@/libs/utils/helpers';

type DataSourceProps = {
  initValues: RowType[],
};
const sourceId = 'demo';

export default function DataSource({ initValues }: DataSourceProps) {
  const options = useAppSelector((state) => selectOptions(state, { sourceId }));
  const dispatch = useAppDispatch();

  // on mount, unmount
  useEffect(() => {
    dispatch(initSource({ sourceId, rows: initValues }));

    return () => {
      dispatch(destroySource({ sourceId }));
    }
  }, [dispatch]);

  return (
    <>
      <ButtonsComp
        size='small'
        align='start'
        items={[
          {
            name: 'remove-all',
            label: 'Remove all',
          },
          {
            name: 'push-one-element',
            label: 'Push One Element',
          },
          {
            name: 'update-two-element',
            label: 'Update 2 rows',
            params: [
              { id: 1, title: 'ledat 1' },
              { id: 2, title: 'ledat 2' },
            ],
          },
          {
            name: 'remove-elements',
            label: 'Remove elements',
            params: [
              { id: 1 },
              { id: 2 },
            ],
          },
          {
            name: 'set-loading',
            label: 'set loading',
            params: [
              ['isLoading', true],
              ['isLoadingSet', { isLoading: true }],
            ],
          }
        ]}
        onCallback={(action, params) => {
          switch (action) {
            case 'remove-all':
              dispatch(pushData({ sourceId, rows: [], isReset: true }))
              break;
            case 'push-one-element': {
              const index = intRandByMax(products.length);
              dispatch(pushData({ sourceId, rows: products.slice(index, index + 1) as RowType[] }))
              break;
            }
            case 'update-two-element':
              dispatch(updateData({ sourceId, rows: params as RowType[] }));
              break;
            case 'remove-elements':
              dispatch(removeData({ sourceId, rows: params as RowType[] }));
              break;
            case 'set-loading':
              dispatch(setOptions({ sourceId, options: params as OptionType[] }));
              break;
          }
        }}
      />
      <JsonView data={options} />
    </>
  );
}