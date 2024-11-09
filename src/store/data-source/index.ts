import { createSlice, EntityId, PayloadAction, createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import _ from 'lodash';
import { PAGE_SIZE } from '@/configs/app';

const defSourceId = 'default';

const defOption = {
  wheres: [],
  isLoading: false,
  isLoadingSet: {},
  rowSelected: {},
  fields: [],
  errors: {},
  total: 0,
  page: 1,
  limit: PAGE_SIZE,
};

export interface RowType {
  id: EntityId;
  [index: string]: unknown;
}

export type EntityType = EntityState<RowType, EntityId>;

export interface DataSourceInterface {
  [index: string]: EntityType;
}

export type OptionType = [string, unknown];

type PayloadType = {
  sourceId?: string;
  isReset?: boolean;
  rows?: RowType[];
  paths?: string | string[];
  options?: OptionType[];
  [index: string]: unknown;
};

const entityAdapter = createEntityAdapter<RowType>({
  sortComparer: (a: RowType, b: RowType) => {
    if (typeof a.id === 'number' && typeof b.id === 'number') {
      return a.id - b.id;
    }

    // convert into string
    const aId = typeof a.id === 'number' ? a.id.toString() : a.id,
      bId = typeof b.id === 'number' ? b.id.toString() : b.id;

    return aId.localeCompare(bId);
  },
});
const initialState: DataSourceInterface = {
  [defSourceId]: entityAdapter.getInitialState(defOption, {}),
};

const slice = createSlice({
  name: 'dataSource',
  initialState,
  reducers: {
    initSource: (state, { payload }: PayloadAction<PayloadType>) => {
      const { sourceId = defSourceId, rows = [], ...rest } = payload;

      [sourceId].flat().forEach((id) => {
        state[id] = entityAdapter.getInitialState({ ...defOption, ...rest }, rows);
      });
    },
    destroySource: (state, { payload }: PayloadAction<PayloadType>) => {
      const { sourceId = defSourceId } = payload;

      [sourceId].flat().forEach((id) => {
        if (id in state) {
          delete state[id];
        }
      });
    },
    pushData(state, { payload }: PayloadAction<PayloadType>) {
      const { sourceId = defSourceId, rows, isReset = false } = payload;

      if (!(sourceId in state) || !Array.isArray(rows)) {
        return;
      }

      if (isReset) {
        entityAdapter.setAll(state[sourceId], rows);
        return;
      }

      if (rows.length === 1) {
        entityAdapter.addOne(state[sourceId], rows[0]);
      } else {
        entityAdapter.addMany(state[sourceId], rows);
      }
    },
    updateData(state, { payload }: PayloadAction<PayloadType>) {
      const { sourceId = defSourceId, rows } = payload;

      if (!(sourceId in state) || !Array.isArray(rows)) {
        return;
      }

      const normalizeRows = rows.map(({ id, ...changes }) => ({ id, changes }));

      if (rows.length === 1) {
        entityAdapter.updateOne(state[sourceId], normalizeRows[0]);
      } else {
        entityAdapter.updateMany(state[sourceId], normalizeRows);
      }
    },
    removeData(state, { payload }: PayloadAction<PayloadType>) {
      const { sourceId = defSourceId, rows } = payload;

      if (!(sourceId in state) || !Array.isArray(rows)) {
        return;
      }

      const ids = rows.map(({ id }) => id);

      if (ids.length === 1) {
        entityAdapter.removeOne(state[sourceId], ids[0]);
      } else {
        entityAdapter.removeMany(state[sourceId], ids);
      }
    },
    setOptions(state, { payload }: PayloadAction<PayloadType>) {
      const { sourceId = defSourceId, options = [] } = payload;

      if (!(sourceId in state) || !Array.isArray(options)) {
        return;
      }

      options.forEach(([dotKey, values]) => {
        // deny changing properties of entityAdapter
        if (dotKey.startsWith('ids') || dotKey.startsWith('entities') || typeof dotKey !== 'string') {
          return;
        }

        _.set(state[sourceId], dotKey, values);
      });
    },
  },
  selectors: {
    selectStore: (state, payload: PayloadType): EntityType | undefined => {
      const { sourceId = defSourceId } = payload;

      return state[sourceId];
    },
    selectEntity: (state, payload: PayloadType): RowType[] | undefined => {
      const { sourceId = defSourceId } = payload;

      if (!(sourceId in state)) {
        return undefined;
      }

      return entityAdapter.getSelectors().selectAll(state[sourceId]);
    },
    selectPaths: (state, payload: PayloadType) => {
      const { sourceId = defSourceId, paths = [] } = payload;

      if (!(sourceId in state)) {
        return [];
      }

      return [paths].flat().map((path) => _.get(state[sourceId]!, path));
    },
    selectOptions: (state, payload: PayloadType): object | undefined => {
      const { sourceId = defSourceId, paths = [] } = payload;

      if (!(sourceId in state)) {
        return {};
      }

      return _.omit(state[sourceId], ['ids', 'entities', ...[paths].flat()]);
    },
  },
});

export const {
  initSource,
  destroySource,
  pushData,
  updateData,
  removeData,
  setOptions,
} = slice.actions;

export const {
  selectEntity,
  selectStore,
  selectPaths,
  selectOptions,
} = slice.selectors;

export default slice.reducer;