import { call, put } from 'redux-saga/effects';
import * as actions from '../actions';
import { Post, Category } from '../types';
import { BlogPost } from '../types/BlogPost';
import * as Api from '../api';

function* handleFetchPosts(action: actions.FetchPosts) {
  try {
    const result = yield call(Api.fetchPosts);
    const posts: Array<Post> = result.map(BlogPost.fromJSON);
    yield put(actions.addRemotePosts(posts));
  } catch (error) {
    yield put(actions.fetchError(error));
  }
}
function* handleDeletePost(action: actions.RemovePostRemote) {
  try {
    yield call(Api.deletePost, action.postId);
    yield put(actions.removePost(action.postId));
  } catch (error) {
    yield put(actions.fetchError(error));
  }
}
function* handleCreatePost(action: actions.AddPostToRemote) {
  try {
    yield call(Api.createPost, action.post);
    yield put(actions.createLocalPost(action.post));
  } catch (error) {
    yield put(actions.fetchError(error));
  }
}
function* handleFetchPostDetails(action: actions.FetchPostDetails) {
  try {
    const result = yield call(Api.fetchPostDetails, action.postId);
    const post: Post = BlogPost.fromJSON(result);
    yield put(actions.updatePost(
      post.id,
      post.timestamp,
      post.title,
      post.body,
      post.author,
      post.category,
      post.voteScore,
      post.deleted,
    ));
  } catch (error) {
    yield put(actions.fetchError(error));
  }
}
function* handleFetchPostComments(action: actions.FetchPostDetails) {
  try {
    const result = yield call(Api.fetchPostDetails, action.postId);
    const post: Post = BlogPost.fromJSON(result);
    yield put(actions.updatePost(
      post.id,
      post.timestamp,
      post.title,
      post.body,
      post.author,
      post.category,
      post.voteScore,
      post.deleted,
    ));
  } catch (error) {
    yield put(actions.fetchError(error));
  }
}
function* handleEditPost(action: actions.EditRemotePost) {
  try {
    yield call(Api.editPost, action.postId, action.newTitle, action.newBody);
    yield put(actions.editPost(
      action.postId,
      action.newTitle,
      action.newBody,
    ));
  } catch (error) {
    yield put(actions.fetchError(error));
  }
}
function* handleFetchCategories(action: actions.FetchPosts) {
  try {
    const result = yield call(Api.fetchCategories);
    const cats: Array<Category> = result.categories;
    yield put(actions.addRemoteCategories(cats));
  } catch (error) {
    yield put(actions.fetchError(error));
  }
}
function* handleUpvote(action: actions.IncrementPopularityRemote) {
  try {
    yield call(Api.upvote, action.id);
    yield put(actions.incrementPopularity(action.id));
  } catch (error) {
    yield put(actions.fetchError(error));
  }
}
function* handleDownvote(action: actions.IncrementPopularityRemote) {
  try {
    yield call(Api.downvote, action.id);
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
  handleCreatePost,
  handleFetchPostDetails,
  handleEditPost,
};
