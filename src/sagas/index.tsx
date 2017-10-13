import { takeEvery, all } from 'redux-saga/effects';
import * as actions from '../actions';
import {
  handleFetchPosts,
  handleFetchCategories,
  handleUpvote,
  handleDownvote,
  handleDeletePost,
  handleCreatePost,
} from './post';

function *watchAll() {
  yield all([
    takeEvery(actions.UpdatePostListActionType.FETCH_POSTS, handleFetchPosts),
    takeEvery(actions.UpdatePostListActionType.FETCH_CATEGORIES, handleFetchCategories),
    takeEvery(actions.UpdatePostListActionType.INCREMENT_POPULARITY_REMOTE, handleUpvote),
    takeEvery(actions.UpdatePostListActionType.DECREMENT_POPULARITY_REMOTE, handleDownvote),
    takeEvery(actions.UpdatePostListActionType.REMOVE_POST_REMOTE, handleDeletePost),
    takeEvery(actions.UpdatePostListActionType.ADD_POST_REMOTE, handleCreatePost),
  ]);
}

export default watchAll;
