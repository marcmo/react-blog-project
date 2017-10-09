import { combineReducers } from 'redux';
import * as Redux from 'redux';
import { schema, normalize } from 'normalizr';
import * as actions from '../actions';
import { v4 as uuid } from 'uuid';
import { Post, PostState, RootState, FilterState } from '../types';

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
];

const normalizedPosts = normalize(posts, [postSchema]);

const initialPostsState: PostState = {
  entities: normalizedPosts.entities.post,
  ids: normalizedPosts.result,
};
const initialFilterState: FilterState = {
  filter: 'SHOW_ALL',
};

// Connecting React and Redux
type PostListReducer = Redux.Reducer<PostState>;
const postListReducer: PostListReducer = (state = initialPostsState, action: actions.PostListAction) => {
  switch (action.type) {
    case actions.UpdatePostListActionType.ADD_POST:
      {
        const newPost = createPost(action.title, action.author);
        const entities = { ...state.entities, [newPost.id]: newPost };
        const ids = [...state.ids, newPost.id];
        return { ...state, entities, ids };
      }
    case actions.UpdatePostListActionType.REMOVE_POST:
      delete state[action.postId];
      return state;
    case actions.UpdatePostListActionType.ADD_REMOTE_POSTS:
      return action.posts.reduce(
        (acc: PostState, newPost: Post) => {
          if (state.ids.includes(newPost.id)) {
            return acc;
          }
          const entities = { ...acc.entities, [newPost.id]: newPost };
          const ids = [...acc.ids, newPost.id];
          const res = {
            ...acc,
            entities,
            ids
          };
          return res;
        },
        state
      );
    case actions.UpdatePostListActionType.INCREMENT_POPULARITY:
      return changeVote((vote: number): number => vote + 1, state, action.id);
    case actions.UpdatePostListActionType.DECREMENT_POPULARITY:
      return changeVote((vote: number): number => vote - 1, state, action.id);
    default:
      console.warn(`unhandled action ${action.type}`);
      return state;
  }
};

const changeVote = (
  changer: (n: number) => number,
  state: PostState,
  id: string): PostState => {
  const post: Post = state.entities[id];
  const updatedPost: Post = {
    ...post,
    voteScore: changer(post.voteScore)
  };
  const entities = { ...state.entities, [post.id]: updatedPost };
  return { ...state, entities };
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
  postState: postListReducer,
  filterState: filterReducer,
});
export default rootReducer;
