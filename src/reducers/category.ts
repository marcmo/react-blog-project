import * as Redux from 'redux';
import { FilterActionType } from '../actions/types';
import * as actions from '../actions';
import {
  CategoryState,
  createCategory,
} from '../types';

const initialFilterState: CategoryState = {
  filter: 'SHOW_ALL',
  categories: ['myStuff', 'tech', 'SHOW_ALL'].map(createCategory),
  onlyDeleted: false,
};

export type CategoryReducer = Redux.Reducer<CategoryState>;
export const categoryReducer: CategoryReducer = (
  state: CategoryState = initialFilterState,
  action: actions.FilterListAction) => {
  switch (action.type) {
    case FilterActionType.APPLY_FILTER: {
      return applySetFilter(state, action.filter);
    }
    case FilterActionType.SHOW_DELETED: {
      return applyDeletedFilter(state, true);
    }
    case FilterActionType.SHOW_ALL: {
      return applySetFilter(state, 'SHOW_ALL');
    }
    case FilterActionType.ADD_REMOTE_CATEGORIES: {
      return applyNewCategories(state, action);
    }
    default: return state;
  }
};
const applyDeletedFilter = (state: CategoryState, deleted: boolean) => (
  {
    ...state,
    onlyDeleted: deleted,
  }
);
const applySetFilter = (state: CategoryState, filter: string) => (
  {
    ...state,
    filter,
    onlyDeleted: false,
  }
);

const applyNewCategories = (state: CategoryState, action: actions.AddRemoteCategories) => ({
  ...state,
  categories: state.categories.concat(action.categories)
    .filter((elem, index, self) => (index === self.indexOf(elem)))
});
