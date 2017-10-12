import { combineReducers } from 'redux';
import * as Redux from 'redux';
import { schema, normalize } from 'normalizr';
import * as actions from '../actions';
import { v4 as uuid } from 'uuid';
import {
  Post,
  PostState,
  RootState,
  CategoryState,
  Category,
  Entity,
  createCategory,
} from '../types';

const postSchema = new schema.Entity('post');

const createPost = (t: string, author: string, category: string): Post => {
  const newPost = {
    id: uuid(),
    timestamp: Date.now(),
    title: t,
    body: '',
    author,
    category,
    voteScore: 0,
    deleted: false,
    comments: []
  };
  return newPost;
};

const posts: Array<Post> = [
  createPost('Man request adapted spirits set pressed', 'Joey', 'myStuff'),
  createPost('Up to denoting subjects sensible feelings it indulged directly', 'Joey', 'tech'),
  createPost('We dwelling elegance do shutters appetite yourself diverted', 'Joey', 'myStuff'),
];

const normalizedPosts = normalize(posts, [postSchema]);

const initialPostsState: PostState = {
  entities: normalizedPosts.entities.post,
  ids: normalizedPosts.result,
  selectedPostId: null,
};
const initialFilterState: CategoryState = {
  filter: 'SHOW_ALL',
  categories: ['myStuff', 'tech', 'SHOW_ALL'].map(createCategory),
  onlyDeleted: false,
};

// Connecting React and Redux
type PostListReducer = Redux.Reducer<PostState>;
const postListReducer: PostListReducer = (state = initialPostsState, action: actions.PostListAction) => {
  switch (action.type) {
    case actions.UpdatePostListActionType.ADD_POST:
      {
        const newPost = createPost(action.title, action.author, '');
        const entities = { ...state.entities, [newPost.id]: newPost };
        const ids = [...state.ids, newPost.id];
        return { ...state, entities, ids };
      }
    case actions.UpdatePostListActionType.EDIT_POST:
      return updatePostContent(state, action.postId, action.newContent);
    case actions.UpdatePostListActionType.POST_SELECTED:
      return {
        ...state,
        selectedPostId: action.selectedId,
      };
    case actions.UpdatePostListActionType.POST_DESELECTED:
      return {
        ...state,
        selectedPostId: null,
      };
    case actions.UpdatePostListActionType.REMOVE_POST:
      return deletePost(state, action.postId);
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
      return state;
  }
};

const deletePost = (
  state: PostState,
  postId: string): PostState => {
  const post: Post = state.entities[postId];
  const updatedPost: Post = {
    ...post,
    deleted: true,
  };
  const entities = { ...state.entities, [post.id]: updatedPost };
  return { ...state, entities };
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
const updatePostContent = (
  state: PostState,
  postId: string,
  newContent: actions.UpdatedPostContent): PostState => {
  const post: Post = state.entities[postId];
  const updatedPost: Post = {
    ...post,
    body: newContent.body ? newContent.body : post.body,
    category: newContent.category ? newContent.category : post.category,
    title: newContent.title ? newContent.title : post.title,
  };
  const entities = { ...state.entities, [post.id]: updatedPost };
  return { ...state, entities };
};

function categoryReducer(state: CategoryState = initialFilterState, action: actions.FilterListAction) {
  switch (action.type) {
    case actions.FilterActionType.APPLY_FILTER: {
      return applySetFilter(state, action.filter);
    }
    case actions.FilterActionType.SHOW_DELETED: {
      return applyDeletedFilter(state, true);
    }
    case actions.FilterActionType.SHOW_ALL: {
      return applySetFilter(state, 'SHOW_ALL');
    }
    case actions.FilterActionType.ADD_REMOTE_CATEGORIES: {
      return applyNewCategories(state, action);
    }
    default: return state;
  }
}
const applyDeletedFilter = (state: CategoryState, deleted: boolean) => (
  {
    ...state,
    onlyDeleted: deleted,
  }
);
const applySetFilter = (state: CategoryState, filter: string) => (
  {
    ...state,
    filter,
    onlyDeleted: false,
  }
);

const applyNewCategories = (state: CategoryState, action: actions.AddRemoteCategories) => ({
  ...state,
  categories: state.categories.concat(action.categories)
    .filter((elem, index, self) => (index === self.indexOf(elem)))
});

const rootReducer: Redux.Reducer<RootState> = combineReducers({
  postState: postListReducer,
  categoryState: categoryReducer,
});
export default rootReducer;
