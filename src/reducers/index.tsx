import { combineReducers } from 'redux';
import { postListReducer } from './postListReducer';
import { categoryReducer } from './categoryReducer';
import * as Redux from 'redux';
import {
  RootState,
} from '../types';

const rootReducer: Redux.Reducer<RootState> = combineReducers({
  postState: postListReducer,
  categoryState: categoryReducer,
});
export default rootReducer;
