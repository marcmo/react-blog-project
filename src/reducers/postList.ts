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
      return updateTitleAndBody(state, action.postId, action.newTitle, action.newBody);
    case UpdatePostListActionType.UPDATE_POST:
      return updatePostContent(state, action.id, action.info);
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
const updateTitleAndBody = (
  state: PostState,
  postId: string,
  newTitle: string,
  newBody: string): PostState => {
  const post: Post = state.entities[postId];
  const updatedPost: Post = {
    ...post,
    body: newBody,
    title: newTitle,
  };
  const entities = { ...state.entities, [post.id]: updatedPost };
  return { ...state, entities };
};
const updatePostContent = (
  state: PostState,
  postId: string,
  info: actions.UpdatePostInfo
  ): PostState => {
  const post: Post = state.entities[postId];
  const updatedPost: Post = {
    ...post,
    timestamp: info.timestamp ? info.timestamp : post.timestamp,
    title: info.title ? info.title : post.title,
    body: info.body ? info.body : post.body,
    author: info.author ? info.author : post.author,
    category: info.category ? info.category : post.category,
    voteScore: info.voteScore ? info.voteScore : post.voteScore,
    deleted: info.deleted ? info.deleted : post.deleted,
  };
  const entities = { ...state.entities, [post.id]: updatedPost };
  return { ...state, entities };
};
