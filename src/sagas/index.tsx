import { takeEvery, all } from 'redux-saga/effects';
import { UpdatePostListActionType } from '../actions/types';
import {
  handleFetchPosts,
  handleFetchCategories,
  handleUpvote,
  handleDownvote,
  handleDeletePost,
  handleCreatePost,
  handleEditPost,
} from './post';

function *watchAll() {
  yield all([
    takeEvery(UpdatePostListActionType.FETCH_POSTS, handleFetchPosts),
    takeEvery(UpdatePostListActionType.FETCH_CATEGORIES, handleFetchCategories),
    takeEvery(UpdatePostListActionType.INCREMENT_POPULARITY_REMOTE, handleUpvote),
    takeEvery(UpdatePostListActionType.DECREMENT_POPULARITY_REMOTE, handleDownvote),
    takeEvery(UpdatePostListActionType.REMOVE_POST_REMOTE, handleDeletePost),
    takeEvery(UpdatePostListActionType.ADD_POST_REMOTE, handleCreatePost),
    takeEvery(UpdatePostListActionType.EDIT_REMOTE_POST, handleEditPost),
  ]);
}

export default watchAll;
