import { Post } from '../types';
import {
  UpdatePostListActionType,
} from './types';

// post list actions
export type PostListAction =
  CreatePost |
  AddRemotePosts |
  AddPostToRemote |
  EditRemotePost |
  EditPost |
  UpdatePost |
  RemovePost |
  RemovePostRemote |
  FetchPosts |
  FetchPostDetails |
  FetchCategories |
  FetchError |
  PostSelected |
  PostDeselected |
  IncrementPopularity |
  IncrementPopularityRemote |
  DecrementPopularityRemote |
  DecrementPopularity;
export interface AddRemotePosts {
  type: UpdatePostListActionType.ADD_REMOTE_POSTS;
  posts: Array<Post>;
}
export interface CreatePost {
  type: UpdatePostListActionType.CREATE_POST;
  post: Post;
}
export interface AddPostToRemote {
  type: UpdatePostListActionType.ADD_POST_REMOTE;
  post: Post;
}
export interface EditPost {
  type: UpdatePostListActionType.EDIT_POST;
  postId: string;
  newTitle: string;
  newBody: string;
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
export interface EditRemotePost {
  type: UpdatePostListActionType.EDIT_REMOTE_POST;
  postId: string;
  newTitle: string;
  newBody: string;
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
export interface RemovePostRemote {
  type: UpdatePostListActionType.REMOVE_POST_REMOTE;
  postId: string;
}
export interface FetchPosts {
  type: UpdatePostListActionType.FETCH_POSTS;
}
export interface FetchPostDetails {
  type: UpdatePostListActionType.FETCH_POST_DETAILS;
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
export interface IncrementPopularityRemote {
  type: UpdatePostListActionType.INCREMENT_POPULARITY_REMOTE;
  id: string;
}
export interface DecrementPopularity {
  type: UpdatePostListActionType.DECREMENT_POPULARITY;
  id: string;
}
export interface DecrementPopularityRemote {
  type: UpdatePostListActionType.DECREMENT_POPULARITY_REMOTE;
  id: string;
}
export const decrementPopularityRemote = (id: string): DecrementPopularityRemote => ({
  type: UpdatePostListActionType.DECREMENT_POPULARITY_REMOTE,
  id
});
export const decrementPopularity = (id: string): DecrementPopularity => ({
  type: UpdatePostListActionType.DECREMENT_POPULARITY,
  id
});
export const incrementPopularity = (id: string): IncrementPopularity => ({
  type: UpdatePostListActionType.INCREMENT_POPULARITY,
  id
});
export const incrementPopularityRemote = (id: string): IncrementPopularityRemote => ({
  type: UpdatePostListActionType.INCREMENT_POPULARITY_REMOTE,
  id
});
export interface NewPostArgs {
  title: string;
  author: string;
}
export const createLocalPost = (post: Post): CreatePost => ({
  type: UpdatePostListActionType.CREATE_POST,
  post,
});
export const editPost = (postId: string, newTitle: string, newBody: string): EditPost => ({
  type: UpdatePostListActionType.EDIT_POST,
  postId,
  newTitle,
  newBody,
});
export const updatePost = (
  postId: string,
  timestamp: number,
  title: string,
  body: string,
  author: string,
  category: string,
  voteScore: number,
  deleted: boolean
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
  }
});
export const editRemotePost = (postId: string, newTitle: string, newBody: string): EditRemotePost => ({
  type: UpdatePostListActionType.EDIT_REMOTE_POST,
  postId,
  newTitle,
  newBody,
});
export const selectedPost = (selectedId: string): PostSelected => ({
  type: UpdatePostListActionType.POST_SELECTED,
  selectedId,
});
export const deselectedPost = (): PostDeselected => ({
  type: UpdatePostListActionType.POST_DESELECTED,
});
export const addRemotePosts = (posts: Array<Post>): AddRemotePosts => ({
  type: UpdatePostListActionType.ADD_REMOTE_POSTS,
  posts
});
export const addPostToRemote = (post: Post): AddPostToRemote => ({
  type: UpdatePostListActionType.ADD_POST_REMOTE,
  post
});
export const fetchPosts = (): FetchPosts => ({
  type: UpdatePostListActionType.FETCH_POSTS
});
export const fetchPostDetails = (postId: string): FetchPostDetails => ({
  type: UpdatePostListActionType.FETCH_POST_DETAILS,
  postId,
});
export const fetchCategories = (): FetchCategories => ({
  type: UpdatePostListActionType.FETCH_CATEGORIES,
});
export const fetchError = (error: string): FetchError => ({
  type: UpdatePostListActionType.FETCH_ERROR,
  error
});
export const removePost = (id: string): RemovePost => ({
  type: UpdatePostListActionType.REMOVE_POST,
  postId: id,
});
export const removePostRemote = (id: string): RemovePostRemote => ({
  type: UpdatePostListActionType.REMOVE_POST_REMOTE,
  postId: id,
});
