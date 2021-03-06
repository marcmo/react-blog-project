import { Category } from '../types';

import {
  FilterActionType,
} from './types';

// filter list actions
export type FilterListAction =
  ApplyFilter |
  DeletedFilter |
  AddRemoteCategories;
export interface ApplyFilter {
  type: FilterActionType.APPLY_FILTER;
  filter: string;
}
export interface DeletedFilter {
  type: FilterActionType.SHOW_DELETED;
}
export interface AddRemoteCategories {
  type: FilterActionType.ADD_REMOTE_CATEGORIES;
  categories: Array<Category>;
}
export const applyFilter = (f: string): ApplyFilter => ({
  type: FilterActionType.APPLY_FILTER,
  filter: f,
});
export const deletedFilter = (): DeletedFilter => ({
  type: FilterActionType.SHOW_DELETED,
});
export const addRemoteCategories = (cats: Array<Category>): AddRemoteCategories => ({
  type: FilterActionType.ADD_REMOTE_CATEGORIES,
  categories: cats,
});
