import { combineReducers } from 'redux';
import { postListReducer } from './postList';
import { categoryReducer } from './category';
import * as Redux from 'redux';
import {
  RootState,
} from '../types';

const rootReducer: Redux.Reducer<RootState> = combineReducers({
  postState: postListReducer,
  categoryState: categoryReducer,
});
export default rootReducer;
