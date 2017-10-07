import { call, put } from 'redux-saga/effects';
import * as actions from '../actions';
import { Post } from '../types';
import { BlogPost } from '../types/BlogPost';
import { fetchPosts } from '../api/post';

function* handleFetchPosts(action: actions.FetchPosts) {
  const { query } = action;

  try {
    const result = yield call(fetchPosts, query);
    const posts: Array<Post> = result.map(
      (p: any) => BlogPost.fromJSON(p));
    yield put(actions.addRemotePosts(posts));
  } catch (error) {
    yield put(actions.fetchPostsError(error));
  }
}

export {
  handleFetchPosts,
};
