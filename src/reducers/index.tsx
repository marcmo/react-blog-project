import { combineReducers } from 'redux';
import * as Redux from 'redux';
import { schema, normalize } from 'normalizr';
import * as actions from '../actions';
import { v4 as uuid } from 'uuid';
import { Post, PostState, RootState, FilterState } from '../types';
// import { Map } from 'immutable';

// schemas

const postSchema = new schema.Entity('post');

// const createPost = (currentPosts: Map<string, Post>, t: string): Map<string, Post> => {
const createPost = (t: string, author: string): Post => {
  const newPost = {
    id: uuid(),
    timestamp: Date.now(),
    title: t,
    body: '',
    author,
    category: '',
    voteScore: 0,
    deleted: false,
    comments: []
  };
  return newPost;
  // return currentPosts.set(newPost.id, newPost);
};

const posts: Array<Post> = [
  createPost('Man request adapted spirits set pressed', 'Joey'),
  createPost('Up to denoting subjects sensible feelings it indulged directly', 'Joey'),
  createPost('We dwelling elegance do shutters appetite yourself diverted', 'Joey'),
  createPost('Our next drew much you with rank', 'Joey'),
  createPost('Tore many held age hold rose than our', 'Joey'),
  createPost('She literature sentiments any contrasted', 'Joey'),
  createPost('Set aware joy sense young now tears china shy', 'Joey'),
  createPost('Game of as rest time eyes with of this it', 'Joey'),
  createPost('Add was music merry any truth since going', 'Joey'),
  createPost('Happiness she ham but instantly put departure propriety', 'Joey'),
  createPost('She amiable all without say spirits shy clothes morning', 'Joey'),
  createPost('Frankness in extensive to belonging improving so certainty', 'Joey'),
  createPost('Explain ten man uncivil engaged conduct', 'Joey'),
  createPost('Am likewise betrayed as declared absolute do', 'Joey'),
  createPost('Taste oh spoke about no solid of hills up shade', 'Joey'),
];

const normalizedPosts = normalize(posts, [postSchema]);

const initialPostsState: PostState = {
  entities: normalizedPosts.entities.post,
  ids: normalizedPosts.result,
};
const initialFilterState: FilterState = {
  filter: 'SHOW_ALL',
};

function updatePost(state: number = 0, action: actions.PostUpdateAction): number {
  switch (action.type) {
    case actions.PostUpdateActionType.INCREMENT_POPULARITY:
      return state + 1;
    case actions.PostUpdateActionType.DECREMENT_POPULARITY:
      return state - 1;
    default:
      return state;
  }
}

// Connecting React and Redux
type PostReducer = Redux.Reducer<PostState>;
const postReducer: PostReducer = (state = initialPostsState, action) => {
  switch (action.type) {
    case actions.UpdatePostListActionType.ADD_POST:
      const newPost = createPost(action.title, action.author);
      const entities = { ...state.entities, [newPost.id]: newPost };
      const ids = [...state.ids, action.id];
      return { ...state, entities, ids };
    case actions.UpdatePostListActionType.REMOVE_POST:
      delete state[action.postId];
      return state;
    default:
      return state;
  }
};

function filterReducer(state: FilterState = initialFilterState, action: actions.FilterListAction) {
  switch (action.type) {
    case actions.FilterActionType.SHOW_CURRENT: {
      return applySetFilter(state, action);
    }
    default: return state;
  }
}
function applySetFilter(state: FilterState, action: actions.ApplyFilter) {
  return action.filter;
}
const rootReducer: Redux.Reducer<RootState> = combineReducers({
  postState: postReducer,
  filterState: filterReducer,
});
export default rootReducer;
// export default postReducer;
