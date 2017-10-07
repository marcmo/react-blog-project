import { takeEvery, all } from 'redux-saga/effects';
import * as actions from '../actions';
import { handleFetchPosts } from './post';

function *watchAll() {
  yield all([
    takeEvery(actions.UpdatePostListActionType.FETCH_POSTS, handleFetchPosts),
  ]);
}

export default watchAll;
