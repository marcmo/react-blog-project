import { Post, Comment } from '../types';
import {
  UpdatePostListActionType,
} from './types';

// post list actions
export type PostListAction =
  AddPost |
  AddFetchedPosts |
  AddComment |
  EditPost |
  UpdatePost |
  RemovePost |
  FetchPosts |
  FetchPostDetails |
  FetchPostComments |
  FetchCategories |
  FetchError |
  PostSelected |
  PostDeselected |
  IncrementPopularityComment |
  DecrementPopularityComment |
  IncrementPopularity |
  DecrementPopularity;
export interface AddFetchedPosts {
  type: UpdatePostListActionType.ADD_FETCHED_POSTS;
  posts: Array<Post>;
}
export interface AddPost {
  type: UpdatePostListActionType.ADD_POST;
  post: Post;
}
export interface AddComment {
  type: UpdatePostListActionType.ADD_COMMENT;
  payload: {
    comment: Comment;
  };
}
export interface UpdatePostInfo {
  timestamp?: number;
  title?: string;
  body?: string;
  author?: string;
  category?: string;
  voteScore?: number;
  deleted?: boolean;
}
export interface UpdatePost {
  type: UpdatePostListActionType.UPDATE_POST;
  id: string;
  info: UpdatePostInfo;
}
export interface EditPost {
  type: UpdatePostListActionType.EDIT_POST;
  payload: {
    postId: string;
    category: string;
    newTitle: string;
    newBody: string;
  };
}
export interface PostSelected {
  type: UpdatePostListActionType.POST_SELECTED;
  selectedId: string;
}
export interface PostDeselected {
  type: UpdatePostListActionType.POST_DESELECTED;
}
export interface RemovePost {
  type: UpdatePostListActionType.REMOVE_POST;
  postId: string;
}
export interface FetchPosts {
  type: UpdatePostListActionType.FETCH_POSTS;
}
export interface FetchPostDetails {
  type: UpdatePostListActionType.FETCH_POST_DETAILS;
  postId: string;
}
export interface FetchPostComments {
  type: UpdatePostListActionType.FETCH_POST_COMMENTS;
  postId: string;
}
export interface FetchCategories {
  type: UpdatePostListActionType.FETCH_CATEGORIES;
}
export interface FetchError {
  type: UpdatePostListActionType.FETCH_ERROR;
  error: string;
}
export interface IncrementPopularity {
  type: UpdatePostListActionType.INCREMENT_POPULARITY;
  id: string;
}
export interface IncrementPopularityComment {
  type: UpdatePostListActionType.INCREMENT_POPULARITY_COMMENT;
  id: string;
}
export interface DecrementPopularityComment {
  type: UpdatePostListActionType.DECREMENT_POPULARITY_COMMENT;
  id: string;
}
export interface DecrementPopularity {
  type: UpdatePostListActionType.DECREMENT_POPULARITY;
  id: string;
}
export const decrementPopularity = (id: string): DecrementPopularity => ({
  type: UpdatePostListActionType.DECREMENT_POPULARITY,
  id,
});
export const incrementPopularity = (id: string): IncrementPopularity => ({
  type: UpdatePostListActionType.INCREMENT_POPULARITY,
  id,
});
export interface NewPostArgs {
  title: string;
  author: string;
}
export interface NewCommentArgs {
  author: string;
}
export const updatePost = (
  postId: string,
  timestamp: number,
  title: string,
  body: string,
  author: string,
  category: string,
  voteScore: number,
  deleted: boolean,
): UpdatePost => ({
  type: UpdatePostListActionType.UPDATE_POST,
  id: postId,
  info: {
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted,
  },
});
export const editPost = (postId: string, newCategory: string, newTitle: string, newBody: string): EditPost => ({
  type: UpdatePostListActionType.EDIT_POST,
  payload: {
    postId,
    category: newCategory,
    newTitle,
    newBody,
  },
});
export const selectedPost = (selectedId: string): PostSelected => ({
  type: UpdatePostListActionType.POST_SELECTED,
  selectedId,
});
export const createDeselectedPostAction = (): PostDeselected => ({
  type: UpdatePostListActionType.POST_DESELECTED,
});
export const addFetchedPosts = (posts: Array<Post>): AddFetchedPosts => ({
  type: UpdatePostListActionType.ADD_FETCHED_POSTS,
  posts,
});
export const addPost = (post: Post): AddPost => ({
  type: UpdatePostListActionType.ADD_POST,
  post,
});
export const createAddCommentAction = (comment: Comment): AddComment => ({
  type: UpdatePostListActionType.ADD_COMMENT,
  payload: {
    comment,
  },
});
export const createFetchPostsAction = (): FetchPosts => ({
  type: UpdatePostListActionType.FETCH_POSTS,
});
export const fetchCommentsAction = (postId: string): FetchPostComments => ({
  type: UpdatePostListActionType.FETCH_POST_COMMENTS,
  postId,
});
export const fetchDetailsAction = (postId: string): FetchPostDetails => ({
  type: UpdatePostListActionType.FETCH_POST_DETAILS,
  postId,
});
export const createFetchCategoriesAction = (): FetchCategories => ({
  type: UpdatePostListActionType.FETCH_CATEGORIES,
});
export const fetchError = (error: string): FetchError => ({
  type: UpdatePostListActionType.FETCH_ERROR,
  error,
});
export const removePost = (id: string): RemovePost => ({
  type: UpdatePostListActionType.REMOVE_POST,
  postId: id,
});
