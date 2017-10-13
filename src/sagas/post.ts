import { call, put } from 'redux-saga/effects';
import * as actions from '../actions';
import { Post, Category } from '../types';
import { BlogPost } from '../types/BlogPost';
import {
  fetchPosts,
  fetchCategories,
  fetchPostDetails,
  upvote,
  downvote,
  deletePost,
} from '../api/post';

function* handleFetchPosts(action: actions.FetchPosts) {
  try {
    const result = yield call(fetchPosts);
    const posts: Array<Post> = result.map(BlogPost.fromJSON);
    yield put(actions.addRemotePosts(posts));
  } catch (error) {
    yield put(actions.fetchError(error));
  }
}
function* handleDeletePost(action: actions.RemovePostRemote) {
  try {
    const result = yield call(deletePost, action.postId);
    yield put(actions.removePost(action.postId));
  } catch (error) {
    yield put(actions.fetchError(error));
  }
}
function* handleFetchPostDetails(action: actions.FetchPostDetails) {
  try {
    const result = yield call(fetchPostDetails, action.postId);
    const post: Post = BlogPost.fromJSON(result);
    const updated: actions.UpdatedPostContent = {
      votes: post.voteScore,
    };
    yield put(actions.editPost(
      post.id,
      {
        votes: post.voteScore,
      }
    ));
  } catch (error) {
    yield put(actions.fetchError(error));
  }
}
function* handleFetchCategories(action: actions.FetchPosts) {
  try {
    const result = yield call(fetchCategories);
    const cats: Array<Category> = result.categories;
    yield put(actions.addRemoteCategories(cats));
  } catch (error) {
    yield put(actions.fetchError(error));
  }
}
function* handleUpvote(action: actions.IncrementPopularityRemote) {
  try {
    yield call(upvote, action.id);
    yield put(actions.incrementPopularity(action.id));
  } catch (error) {
    yield put(actions.fetchError(error));
  }
}
function* handleDownvote(action: actions.IncrementPopularityRemote) {
  try {
    yield call(downvote, action.id);
    yield put(actions.decrementPopularity(action.id));
  } catch (error) {
    yield put(actions.fetchError(error));
  }
}

export {
  handleFetchPosts,
  handleFetchCategories,
  handleUpvote,
  handleDownvote,
  handleDeletePost,
};
