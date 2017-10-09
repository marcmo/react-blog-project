import { takeEvery, all } from 'redux-saga/effects';
import * as actions from '../actions';
import { handleFetchPosts, handleFetchCategories } from './post';

function *watchAll() {
  yield all([
    takeEvery(actions.UpdatePostListActionType.FETCH_POSTS, handleFetchPosts),
    takeEvery(actions.UpdatePostListActionType.FETCH_CATEGORIES, handleFetchCategories),
  ]);
}

export default watchAll;
