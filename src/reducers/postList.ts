import * as Redux from 'redux';
import { schema, normalize } from 'normalizr';
import { UpdatePostListActionType } from '../actions/types';
import * as actions from '../actions';
import {
  Post,
  PostState,
} from '../types';

const postSchema = new schema.Entity('post');

const posts: Array<Post> = [];
const normalizedPosts = normalize(posts, [postSchema]);

const initialPostsState: PostState = {
  entities: normalizedPosts.entities.post,
  ids: normalizedPosts.result,
  selectedPostId: null,
};

export type PostListReducer = Redux.Reducer<PostState>;
export const postListReducer: PostListReducer = (state = initialPostsState, action: actions.PostListAction) => {
  switch (action.type) {
    case UpdatePostListActionType.CREATE_POST:
      {
        const entities = { ...state.entities, [action.post.id]: action.post };
        const ids = [...state.ids, action.post.id];
        return { ...state, entities, ids };
      }
    case UpdatePostListActionType.EDIT_POST:
      return updatePostContent(state, action.postId, action.newContent);
    case UpdatePostListActionType.POST_SELECTED:
      return {
        ...state,
        selectedPostId: action.selectedId,
      };
    case UpdatePostListActionType.POST_DESELECTED:
      return {
        ...state,
        selectedPostId: null,
      };
    case UpdatePostListActionType.REMOVE_POST:
      return deletePost(state, action.postId);
    case UpdatePostListActionType.ADD_REMOTE_POSTS:
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
    case UpdatePostListActionType.INCREMENT_POPULARITY:
      return changeVote((vote: number): number => vote + 1, state, action.id);
    case UpdatePostListActionType.DECREMENT_POPULARITY:
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
