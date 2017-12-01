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
import * as P from './post';

function* watchAll() {
  yield all([
    takeEvery(UpdatePostListActionType.FETCH_POSTS, handleFetchPosts),
    takeEvery(UpdatePostListActionType.FETCH_POST_COMMENTS, P.handleFetchPostComments),
    takeEvery(UpdatePostListActionType.FETCH_CATEGORIES, handleFetchCategories),
    takeEvery(UpdatePostListActionType.INCREMENT_POPULARITY, handleUpvote),
    takeEvery(UpdatePostListActionType.DECREMENT_POPULARITY, handleDownvote),
    takeEvery(UpdatePostListActionType.INCREMENT_POPULARITY_COMMENT, P.handleUpvoteComment),
    takeEvery(UpdatePostListActionType.DECREMENT_POPULARITY_COMMENT, P.handleDownvoteComment),
    takeEvery(UpdatePostListActionType.REMOVE_POST, handleDeletePost),
    takeEvery(UpdatePostListActionType.ADD_POST, handleCreatePost),
    takeEvery(UpdatePostListActionType.ADD_COMMENT, P.handleCreateComment),
    takeEvery(UpdatePostListActionType.EDIT_POST, handleEditPost),
  ]);
}

export default watchAll;
