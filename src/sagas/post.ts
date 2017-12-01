import { call, put } from 'redux-saga/effects';
import * as actions from '../actions';
import { PostType, Category, CommentType } from '../types';
import { BlogPost } from '../types/BlogPost';
import * as Api from '../api';
import { log } from '../lib/Logging';

function* handleFetchPosts(action: actions.FetchPosts) {
  try {
    const result = yield call(Api.fetchPosts);
    const posts: Array<PostType> = result.map(BlogPost.fromJSON);
    yield put(actions.addFetchedPosts(posts));
  } catch (error) {
    yield put(actions.fetchError(error));
  }
}
export function* handleFetchPostComments(action: actions.FetchPostComments) {
  try {
    const result = yield call(Api.fetchPostComments, action.postId);
    log.d('result for comments:', result);
    const comments: Array<CommentType> = result.map(BlogPost.fromJSON);
    yield put(actions.createUpdateLocalCommentsAction(comments));
  } catch (error) {
    yield put(actions.fetchError(error));
  }
}
function* handleDeletePost(action: actions.RemovePost) {
  try {
    yield call(Api.deletePost, action.postId);
  } catch (error) {
    yield put(actions.fetchError(error));
  }
}
function* handleCreatePost(action: actions.AddPost) {
  try {
    yield call(Api.createPost, action.post);
  } catch (error) {
    yield put(actions.fetchError(error));
  }
}
export function* handleCreateComment(action: actions.AddComment) {
  try {
    yield call(Api.createComment, action.payload.comment);
  } catch (error) {
    yield put(actions.fetchError(error));
  }
}
function* handleFetchPostDetails(action: actions.FetchPostDetails) {
  try {
    const result = yield call(Api.fetchPostDetails, action.postId);
    const post: PostType = BlogPost.fromJSON(result);
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
function* handleEditPost(action: actions.EditPost) {
  try {
    yield call(Api.editPost,
      action.payload.postId,
      action.payload.category,
      action.payload.newTitle,
      action.payload.newBody);
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
function* handleUpvote(action: actions.IncrementPopularity) {
  try {
    yield call(Api.upvote, action.id);
  } catch (error) {
    yield put(actions.fetchError(error));
  }
}
export function* handleUpvoteComment(action: actions.IncrementPopularityComment) {
  try {
    yield call(Api.upvoteComment, action.payload.comment.id);
  } catch (error) {
    yield put(actions.fetchError(error));
  }
}
export function* handleDownvoteComment(action: actions.IncrementPopularityComment) {
  try {
    yield call(Api.downvoteComment, action.payload.comment.id);
  } catch (error) {
    yield put(actions.fetchError(error));
  }
}
function* handleDownvote(action: actions.IncrementPopularity) {
  try {
    yield call(Api.downvote, action.id);
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
