import { call, put } from 'redux-saga/effects';
import * as actions from '../actions';
import { Post, Category } from '../types';
import { BlogPost } from '../types/BlogPost';
import { fetchPosts, fetchCategories } from '../api/post';

function* handleFetchPosts(action: actions.FetchPosts) {
  try {
    const result = yield call(fetchPosts);
    const posts: Array<Post> = result.map(BlogPost.fromJSON);
    yield put(actions.addRemotePosts(posts));
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

export {
  handleFetchPosts,
  handleFetchCategories,
};
