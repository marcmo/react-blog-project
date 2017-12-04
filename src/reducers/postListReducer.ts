import * as Redux from 'redux';
import { schema, normalize } from 'normalizr';
import { UpdatePostListActionType } from '../actions/types';
import * as actions from '../actions';
import * as R from 'ramda';
import {
  PostType,
  PostState,
  CommentType,
} from '../types';

const postSchema = new schema.Entity('post');

const posts: Array<PostType> = [];
const normalizedPosts = normalize(posts, [postSchema]);

const initialPostsState: PostState = {
  entities: normalizedPosts.entities.post,
  comments: [],
  ids: normalizedPosts.result,
  selectedPostId: null,
};

const addUpdatedComment = (cs: Array<CommentType>, c: CommentType): Array<CommentType> => {
  const matchId = (cc: CommentType) => cc.id === c.id;
  return R.append(c, R.reject(matchId, cs));
};

export type PostListReducer = Redux.Reducer<PostState>;
export const postListReducer: PostListReducer = (state = initialPostsState, action: actions.PostListAction) => {
  switch (action.type) {
    case UpdatePostListActionType.ADD_COMMENT:
      return {
        ...state,
        comments: addUpdatedComment(state.comments, action.payload.comment),
      };
    case UpdatePostListActionType.UPDATE_LOCAL_COMMENTS:
      return {
        ...state,
        comments: R.reduce(addUpdatedComment, state.comments, action.payload.comments),
      };
    case UpdatePostListActionType.ADD_POST:
      {
        const entities = { ...state.entities, [action.post.id]: action.post };
        const ids = [...state.ids, action.post.id];
        return { ...state, entities, ids };
      }
    case UpdatePostListActionType.EDIT_POST:
      return updateTitleAndBody(
        state,
        action.payload.postId,
        action.payload.category,
        action.payload.newTitle,
        action.payload.newBody);
    case UpdatePostListActionType.EDIT_COMMENT:
      return updateComment(
        state,
        action.payload.commentId,
        action.payload.newBody);
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
    case UpdatePostListActionType.DELETE_COMMENT:
      return {
        ...state,
        comments: R.filter((c: CommentType) => c.id !== action.commentId, state.comments),
      };
    case UpdatePostListActionType.ADD_FETCHED_POSTS:
      return action.posts.reduce(
        (acc: PostState, newPost: PostType) => {
          if (state.ids.includes(newPost.id)) {
            return acc;
          }
          const entities = { ...acc.entities, [newPost.id]: newPost };
          const ids = [...acc.ids, newPost.id];
          const res = {
            ...acc,
            entities,
            ids,
          };
          return res;
        },
        state,
      );
    case UpdatePostListActionType.INCREMENT_POPULARITY:
      return changeVote((vote: number): number => vote + 1, state, action.id);
    case UpdatePostListActionType.DECREMENT_POPULARITY:
      return changeVote((vote: number): number => vote - 1, state, action.id);
    case UpdatePostListActionType.INCREMENT_POPULARITY_COMMENT:
      return changeVoteComment((vote: number): number => vote + 1, state, action.payload.comment.id);
    case UpdatePostListActionType.DECREMENT_POPULARITY_COMMENT:
      return changeVoteComment((vote: number): number => vote - 1, state, action.payload.comment.id);
    default:
      return state;
  }
};

const deletePost = (
  state: PostState,
  postId: string): PostState => {
  const post: PostType = state.entities[postId];
  const updatedPost: PostType = {
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
  const post: PostType = state.entities[id];
  const updatedPost: PostType = {
    ...post,
    voteScore: changer(post.voteScore),
  };
  const entities = { ...state.entities, [post.id]: updatedPost };
  return { ...state, entities };
};
const changeVoteComment = (
  changer: (n: number) => number,
  state: PostState,
  commentId: string): PostState => {
  const matchId = (c: CommentType) => c.id === commentId;
  const comment: CommentType | undefined = R.head(R.filter(matchId, state.comments));
  if (comment == null) {
    return state;
  }
  const updatedComment: CommentType = {
    ...comment,
    voteScore: changer(comment.voteScore),
  };
  const comments = R.uniq(R.append(updatedComment, R.reject(matchId, state.comments)));
  return {
    ...state,
    comments,
  };
};
const updateTitleAndBody = (
  state: PostState,
  postId: string,
  category: string,
  newTitle: string,
  newBody: string): PostState => {
  const post: PostType = state.entities[postId];
  const updatedPost: PostType = {
    ...post,
    category,
    body: newBody,
    title: newTitle,
  };
  const entities = { ...state.entities, [post.id]: updatedPost };
  return { ...state, entities };
};
const updateComment = (
  state: PostState,
  commentId: string,
  newBody: string): PostState => {
  const matchId = (c: CommentType) => c.id === commentId;
  const comment: CommentType | undefined = R.head(R.filter(matchId, state.comments));
  if (comment == null) {
    return state;
  }
  const updatedComment: CommentType = {
    ...comment,
    body: newBody,
  };
  const comments = R.uniq(R.append(updatedComment, R.reject(matchId, state.comments)));
  return {
    ...state,
    comments,
  };
};
const updatePostContent = (
  state: PostState,
  postId: string,
  info: actions.UpdatePostInfo,
): PostState => {
  const post: PostType = state.entities[postId];
  const updatedPost: PostType = {
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
